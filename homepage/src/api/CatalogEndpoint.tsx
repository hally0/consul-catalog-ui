import { AxiosResponse } from 'axios';
import CatalogService from './ConsulService';
import ConsulConnection from './ConsulConnection';
import HealthEndpoint from './HealthEndpoint';
import Node from './ConsulNode';
import HealthCheck from './HealthCheck';

class CatalogEndpoint {
  endpointUrl = '/v1/catalog';

  consulConnection: ConsulConnection;

  constructor() {
    this.consulConnection = new ConsulConnection();
  }

  async getNodes() {
    const repsonse = await this.consulConnection
      .getConnection()
      .get(`${this.endpointUrl}/nodes`);
    return repsonse.data;
  }

  async getAllNodes() {
    const results = await this.getNodes();
    const consulNodes: Node[] = [];
    for (let i = 0; i < results.length; i += 1) {
      consulNodes.push(new Node(results[i]));
    }
    return consulNodes;
  }

  async getServiceNames() {
    const response = await this.consulConnection
      .getConnection()
      .get(`${this.endpointUrl}/services`);
    return response.data;
  }

  async getServiceByName(serviceName: string): Promise<AxiosResponse> {
    const response = await this.consulConnection
      .getConnection()
      .get(`${this.endpointUrl}/service/${serviceName}`);
    return response.data;
  }

  private async getServicesData(healthEndpoint: HealthEndpoint) {
    const results = await this.getServiceNames();
    const consulServices: CatalogService[] = [];
    for (let i = 0; i < results.length; i += 1) {
      const serviceData = this.getServiceByName(results[i].toString());
      consulServices.push(new CatalogService(serviceData));
    }
    await Promise.all(consulServices);
    const healthChecks: HealthCheck[][] = [];
    for (let i = 0; i < results.length; i += 1) {
      if (consulServices[i].enabled) {
        healthChecks.push(
          healthEndpoint.getServiceChecks(consulServices[i].serviceName)
        );
      }
    }
    await Promise.all(healthChecks);
    for (let i = 0; i < healthChecks.length; i += 1) {
      const name = healthChecks[i][0].$serviceName;
      for (let j = 0; j < consulServices.length; j += 1) {
        consulServices[j];
      }
    }
  }
}
export default CatalogEndpoint;
