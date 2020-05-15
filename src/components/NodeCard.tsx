import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import '../App.css';
import Link from '@material-ui/core/Link';
import useStyles from './styles/CardStyle';
import Node from '../api/ConsulNode';

export const NameSection = styled.div`
  display: flex;
  text-align: left;
`;
export const Address = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  node: Node;
}
export const NodeCard: React.FunctionComponent<Props> = (props: Props) => {
  const classes = useStyles();
  const { node } = props;
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
              <Link href={`#/Node/${node.id}`}>{node.nodeName}</Link>
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
};
export default NodeCard;
