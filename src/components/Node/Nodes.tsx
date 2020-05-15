import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import '../../App.css';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CatalogEndpoint from '../../api/CatalogEndpoint';
import Node from '../../api/ConsulNode';
import { useInterval } from '../Utils/UseInterval';
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

const Nodes: React.FunctionComponent = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [catalogEndpoint] = useState<CatalogEndpoint>(new CatalogEndpoint());
  const [count, setCount] = useState(0);

  useEffect(() => {
    catalogEndpoint.getAllNodes().then((CatalogNodes) => {
      setNodes(CatalogNodes);
    });
  }, [catalogEndpoint]);

  useInterval(() => {
    catalogEndpoint.getAllNodes().then((CatalogNodes) => {
      if (!catalogEndpoint.compareServicesOrNodes(nodes, CatalogNodes)) {
        setNodes(CatalogNodes);
      }
    });
    setCount(count + 1);
  }, 60000);

  const classes = useStyles();

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
            title="Nodes"
            columns={[
              { title: 'Node', field: 'nodeName' },
              { title: 'Address', field: 'address' },
            ]}
            data={nodes}
            detailPanel={(row) => {
              return (
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Node Name</StyledTableCell>
                        <StyledTableCell align="right">
                          Node Address
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          {row.nodeName}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.address}
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              );
            }}
            onRowClick={(event, node, togglePanel) => {
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

export default Nodes;
