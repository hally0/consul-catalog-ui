import LaunchIcon from '@material-ui/icons/Launch';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import HttpsIcon from '@material-ui/icons/Https';
import Link from '@material-ui/core/Link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { green, grey, red } from '@material-ui/core/colors';
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import useStyles from './styles/CardStyle';
import CatalogEndpoint from '../api/CatalogEndpoint';
import CatalogService from '../api/ConsulService';
import HealthEndpoint from '../api/HealthEndpoint';
import { useInterval } from './UseInterval';
import '../App.css';
import Node from '../api/ConsulNode';

export const NameSection = styled.div`
  display: flex;
  text-align: left;
`;
export const Address = styled.div`
  display: flex;
  align-items: center;
`;

const removeDisabledServices = (services: CatalogService[]) => {
  return services.filter((service) => service.enabled);
};

export const Portal: React.FunctionComponent = () => {
  const [services, setServices] = useState<CatalogService[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [catalogEndpoint] = useState<CatalogEndpoint>(new CatalogEndpoint());
  const [healthEndpoint] = useState<HealthEndpoint>(new HealthEndpoint());
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

  useEffect(() => {
    catalogEndpoint.getServices(healthEndpoint).then((consulServices) => {
      setServices(removeDisabledServices(consulServices));
    });
  }, [catalogEndpoint, healthEndpoint]);

  useInterval(() => {
    catalogEndpoint.getServices(healthEndpoint).then((consulServices) => {
      if (!catalogEndpoint.compareServicesOrNodes(services, consulServices)) {
        setServices(removeDisabledServices(consulServices));
      }
    });

    setCount(count + 1);
  }, 60000);

  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        <CardContent className={classes.cardBox}>
          {services &&
            services.map((service: CatalogService) => {
              return (
                <React.Fragment key={service.serviceName}>
                  <Card className={`${classes.cardRoot} ${classes.cardRoot}`}>
                    <CardContent className={classes.contentLeft}>
                      <NameSection>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.title}
                        >
                          {service.serviceName}
                          <Divider />
                        </Typography>
                        <Typography className={classes.status}>
                          {service.hasServiceChecks &&
                            service.serviceCheckPassing && (
                              <CheckIcon
                                style={{ fontSize: 20, color: green[500] }}
                              />
                            )}
                          {service.hasServiceChecks &&
                            !service.serviceCheckPassing && (
                              <ErrorIcon
                                style={{ fontSize: 20, color: red[500] }}
                              />
                            )}
                        </Typography>
                      </NameSection>
                      <Address>
                        <HttpsIcon
                          style={{
                            fontSize: 20,
                            color: service.secure ? green[500] : grey[500],
                          }}
                          role="img"
                          titleAccess="test"
                        />

                        <Typography
                          className={classes.address}
                          variant="body2"
                          component="p"
                        >
                          {service.nodeAddress}
                        </Typography>
                      </Address>
                    </CardContent>

                    <CardContent className={classes.contentRight}>
                      <Link href={service.url}>
                        <LaunchIcon
                          style={{ fontSize: 30, color: grey[500] }}
                        />
                      </Link>
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
export default Portal;
