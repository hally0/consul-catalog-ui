import React from 'react';
import styled from 'styled-components';
import { green, grey, red } from '@material-ui/core/colors';
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import '../../App.css';
import LaunchIcon from '@material-ui/icons/Launch';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import HttpsIcon from '@material-ui/icons/Https';
import Link from '@material-ui/core/Link';
import CatalogService from '../../api/ConsulService';
import useStyles from '../styles/CardStyle';

export const NameSection = styled.div`
  display: flex;
  text-align: left;
`;
export const Address = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  service: CatalogService;
}
export const ServiceCard: React.FunctionComponent<Props> = (props: Props) => {
  const classes = useStyles();
  const { service } = props;
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
              {service.hasServiceChecks && service.serviceCheckPassing && (
                <CheckIcon style={{ fontSize: 20, color: green[500] }} />
              )}
              {service.hasServiceChecks && !service.serviceCheckPassing && (
                <ErrorIcon style={{ fontSize: 20, color: red[500] }} />
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
            <LaunchIcon style={{ fontSize: 30, color: grey[500] }} />
          </Link>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};
export default ServiceCard;
