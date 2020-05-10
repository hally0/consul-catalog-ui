import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import CatalogEndpoint from '../api/CatalogEndpoint';
import Node from '../api/ConsulNode';
import { useInterval } from './UseInterval';
import '../App.css';
import useStyles from './styles/TableStyle';

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
      setNodes(CatalogNodes);
    });
    setCount(count + 1);
  }, 5000);

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

export default Nodes;
