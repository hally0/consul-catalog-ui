import ConsulConnection from './ConsulConnection';
import HealthCheck from './HealthCheck';

class HealthEndpoint {
  #endpointUrl = '/v1/health';

  #consulConnection: ConsulConnection;

  constructor() {
    this.#consulConnection = new ConsulConnection();
  }

  /**
   * Gets service check
   * @param serviceName the service name to fetch checks for
   * @returns the service checks
   */
  async getServiceCheck(serviceName: string): Promise<HealthCheck[]> {
    const checks: HealthCheck[] = [];
    const response = await this.#consulConnection
      .getConnection()
      .get(`${this.#endpointUrl}/checks/${serviceName}`);
    for (let i = 0; i < response.data.length; i += 1) {
      checks.push(new HealthCheck(response.data[i]));
    }
    return checks;
  }

  /**
   * Gets service checks. Not implemented
   * @param serviceName
   * @returns service checks
   */
  getServiceChecks(serviceName: string): HealthCheck[] {
    const serviceChecks: HealthCheck[] = [];
    const results = this.getServiceCheck(serviceName);
    // TODO
    return serviceChecks;
  }
}

export default HealthEndpoint;
