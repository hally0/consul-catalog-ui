import { AxiosResponse } from 'axios';
import { promises } from 'fs';
import ConsulConnection from './ConsulConnection';
import HealthCheck from './HealthCheck';

class HealthEndpoint {
  endpointUrl = '/v1/health';

  consulConnection: ConsulConnection;

  constructor() {
    this.consulConnection = new ConsulConnection();
  }

  async getServiceCheck(serviceName: string | null): Promise<AxiosResponse> {
    const response = await this.consulConnection
      .getConnection()
      .get(`${this.endpointUrl}/checks/${serviceName}`);
    return response.data;
  }

  getServiceChecks(serviceName: string): HealthCheck[] {
    const serviceChecks: HealthCheck[] = [];
    const results = this.getServiceCheck(serviceName);
    for (let i = 0; i < results.length; i += 1) {
      const serviceCheck = new HealthCheck(results[i]);
      serviceChecks.push(serviceCheck);
    }
    return serviceChecks;
  }
}

export default HealthEndpoint;
