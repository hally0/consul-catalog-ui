import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import CatalogEndpoint from '../api/CatalogEndpoint';
import CatalogService from '../api/ConsulService';
import HealthEndpoint from '../api/HealthEndpoint';
import useInterval from './UseInterval';
import '../App.css';

import useStyles from './styles/TableStyle';

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
      setServices(consulServices);
    });

    setCount(count + 1);
  }, 20000);

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
            title="Services"
            columns={[
              { title: 'Service', field: 'serviceName' },
              { title: 'Address', field: 'address' },
              {
                title: 'Health Status',
                field: 'amountChecksPassingAndFailing',
              },
            ]}
            data={services}
            detailPanel={(rowData) => {
              return (
                <div
                  style={{
                    fontSize: 100,
                    textAlign: 'center',
                    color: 'black',
                  }}
                >
                  TODO
                </div>
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
