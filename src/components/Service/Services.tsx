import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { green, grey } from '@material-ui/core/colors';
import HttpsIcon from '@material-ui/icons/Https';
import CatalogEndpoint from '../../api/CatalogEndpoint';
import CatalogService from '../../api/ConsulService';
import HealthEndpoint from '../../api/HealthEndpoint';
import useInterval from '../Utils/UseInterval';
import synctime from '../../constants/Config';
import '../../App.css';
import useStyles from '../styles/TableStyle';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

export const Services: React.FunctionComponent = () => {
  const [services, setServices] = useState<CatalogService[]>([]);
  const [catalogEndpoint] = useState<CatalogEndpoint>(new CatalogEndpoint());
  const [healthEndpoint] = useState<HealthEndpoint>(new HealthEndpoint());
  const [count, setCount] = useState(0);

  useEffect(() => {
    catalogEndpoint.getServices(healthEndpoint).then((consulServices) => {
      setServices(consulServices);
    });
  }, [catalogEndpoint, healthEndpoint]);

  useInterval(() => {
    catalogEndpoint.getServices(healthEndpoint).then((consulServices) => {
      if (!catalogEndpoint.compareServicesOrNodes(services, consulServices)) {
        setServices(consulServices);
      }
    });

    setCount(count + 1);
  }, synctime());

  const classes = useStyles();
  const options = {
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
  };

  return (
    <div className="App">
      <header className="App-header">
        <Helmet>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Helmet>
        <div className={classes.table}>
          <MaterialTable
            title="Services"
            columns={[
              { title: 'Service', field: 'serviceName' },
              { title: 'Address', field: 'address' },
              {
                title: 'Health Status',
                field: 'amountChecksPassingAndFailing',
              },
            ]}
            options={options}
            data={services}
            detailPanel={(service) => {
              return (
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Service Name</StyledTableCell>
                        <StyledTableCell align="right">
                          Node Name
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Node Address
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Service Port
                        </StyledTableCell>
                        <StyledTableCell align="right">HTTPS</StyledTableCell>
                        <StyledTableCell align="right">
                          Service Health Checks
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow key={service.serviceId}>
                        <StyledTableCell component="th" scope="row">
                          {service.serviceName}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {service.nodeName}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {service.nodeAddress}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {service.servicePort}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <HttpsIcon
                            style={{
                              fontSize: 20,
                              color: service.secure ? green[500] : grey[500],
                            }}
                            role="img"
                            titleAccess="test"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {service.amountChecksPassingAndFailing}
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              );
            }}
            onRowClick={(event, rowData, togglePanel) => {
              if (typeof togglePanel !== 'undefined') {
                togglePanel();
              }
            }}
          />
        </div>
      </header>
    </div>
  );
};
export default Services;
