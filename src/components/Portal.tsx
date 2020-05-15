import React, { useEffect, useState } from 'react';
import { CardContent } from '@material-ui/core';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ComputerIcon from '@material-ui/icons/Computer';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

import useStyles from './styles/CardStyle';
import useStylesNav from './styles/NavStyle';
import CatalogEndpoint from '../api/CatalogEndpoint';
import CatalogService from '../api/ConsulService';
import Node from '../api/ConsulNode';
import HealthEndpoint from '../api/HealthEndpoint';
import { useInterval } from './Utils/UseInterval';
import { synctime } from '../constants/Config';
import ServiceCard from './Service/ServiceCard';
import NodeCard from './Node/NodeCard';
import '../App.css';

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
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [services, setServices] = React.useState<CatalogService[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [catalogEndpoint] = React.useState<CatalogEndpoint>(
    new CatalogEndpoint()
  );
  const [healthEndpoint] = React.useState<HealthEndpoint>(new HealthEndpoint());
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    catalogEndpoint.getServices(healthEndpoint).then((consulServices) => {
      setServices(removeDisabledServices(consulServices));
    });
    catalogEndpoint.getAllNodes().then((CatalogNodes) => {
      setNodes(CatalogNodes);
    });
  }, [catalogEndpoint, healthEndpoint]);

  useInterval(() => {
    catalogEndpoint.getServices(healthEndpoint).then((consulServices) => {
      if (!catalogEndpoint.compareServicesOrNodes(services, consulServices)) {
        setServices(removeDisabledServices(consulServices));
      }
    });

    catalogEndpoint.getAllNodes().then((CatalogNodes) => {
      if (!catalogEndpoint.compareServicesOrNodes(nodes, CatalogNodes)) {
        setNodes(CatalogNodes);
      }
    });
    setCount(count + 1);
  }, synctime());

  const classes = useStyles();
  const classesNav = useStylesNav();
  return (
    <div className="App">
      <header className={classes.header}>
        <Paper square className={classesNav.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            className={classesNav.background}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="inherit"
          >
            <Tab
              icon={<DeviceHubIcon />}
              label="Services"
              className={classesNav.styledLink}
            />
            <Tab
              icon={<ComputerIcon />}
              label="Nodes"
              className={classesNav.styledLink}
            />
          </Tabs>
        </Paper>
        <CardContent className={classes.cardBox}>
          {value === 0 &&
            services &&
            services.map((service: CatalogService) => {
              return <ServiceCard service={service} />;
            })}
          {value === 1 &&
            nodes &&
            nodes.map((node: Node) => {
              return <NodeCard node={node} />;
            })}
        </CardContent>
      </header>
    </div>
  );
};
export default Portal;
