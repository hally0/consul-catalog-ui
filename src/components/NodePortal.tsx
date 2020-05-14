import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import useStyles from './styles/CardStyle';
import CatalogEndpoint from '../api/CatalogEndpoint';
import { useInterval } from './UseInterval';
import synctime from '../constants/Config';
import '../App.css';
import Node from '../api/ConsulNode';
import PortalNavBar from './PortalNavbar';

export const NameSection = styled.div`
  display: flex;
  text-align: left;
`;
export const Address = styled.div`
  display: flex;
  align-items: center;
`;

export const NodePortal: React.FunctionComponent = () => {
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
  }, synctime());

  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        <PortalNavBar />
        <CardContent className={classes.cardBox}>
          {nodes &&
            nodes.map((node: Node) => {
              return (
                <React.Fragment key={node.id}>
                  <Card className={`${classes.cardRoot} ${classes.cardRoot}`}>
                    <CardContent className={classes.contentLeft}>
                      <NameSection>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.title}
                        >
                          {node.nodeName}
                          <Divider />
                        </Typography>
                      </NameSection>
                      <Address>
                        <Typography
                          className={classes.address}
                          variant="body2"
                          component="p"
                        >
                          {node.address}
                        </Typography>
                      </Address>
                    </CardContent>
                  </Card>
                </React.Fragment>
              );
            })}
        </CardContent>
      </header>
    </div>
  );
};
export default NodePortal;
