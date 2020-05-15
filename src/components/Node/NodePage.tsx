import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import ServiceCard from '../Service/ServiceCard';
import NodeCard from './NodeCard';

import useStyles from '../styles/CardStyle';
import CatalogEndpoint from '../../api/CatalogEndpoint';
import { useInterval } from '../Utils/UseInterval';
import synctime from '../../constants/Config';
import '../../App.css';
import Node from '../../api/ConsulNode';
import CatalogService from '../../api/ConsulService';

export const NameSection = styled.div`
  display: flex;
  text-align: left;
`;
export const Address = styled.div`
  display: flex;
  align-items: center;
`;

interface RouteParams {
  id: string;
}

export const NodePage: React.FunctionComponent<RouteComponentProps<
  RouteParams
>> = (props: RouteComponentProps<RouteParams>) => {
  const { match } = props;
  const nodeId = match.params.id;

  const [node, setNode] = useState<Node>();
  const [services, setServices] = useState<CatalogService[]>([]);
  const [catalogEndpoint] = useState<CatalogEndpoint>(new CatalogEndpoint());
  const [count, setCount] = useState(0);

  useEffect(() => {
    catalogEndpoint.getNode(nodeId).then((results) => {
      setNode(results[0]);
      setServices(results[1]);
    });
  }, [catalogEndpoint]);

  useInterval(() => {
    catalogEndpoint.getNode(nodeId).then((results) => {
      setNode(results[0]);
      setServices(results[1]);
    });
    setCount(count + 1);
  }, synctime());

  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        {typeof node !== 'undefined' && <NodeCard node={node} />}
        {services &&
          services.map((service: CatalogService) => {
            return <ServiceCard service={service} />;
          })}
      </header>
    </div>
  );
};
export default NodePage;
