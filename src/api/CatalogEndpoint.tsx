import CatalogService from './ConsulService';
import ConsulConnection from './ConsulConnection';
import HealthEndpoint from './HealthEndpoint';
import Node from './ConsulNode';

class CatalogEndpoint {
  #endpointUrl = '/v1/catalog';

  #consulConnection: ConsulConnection;

  constructor() {
    this.#consulConnection = new ConsulConnection();
  }

  /**
   * Gets nodes
   * @returns axios data response for all nodes
   */
  async getNodes(): Promise<Record<string, any>> {
    const response = await this.#consulConnection.getConnection().request({
      method: 'get',
      url: `${this.#endpointUrl}/nodes`,
    });
    return response.data;
  }

  /**
   * Gets all nodes
   * @returns a list of all the nodes
   */
  async getAllNodes() {
    const results = await this.getNodes();
    const consulNodes: Node[] = [];
    for (let i = 0; i < results.length; i += 1) {
      consulNodes.push(new Node(results[i]));
    }
    consulNodes.sort();
    return consulNodes;
  }

  /**
   * Gets service names
   * @returns axios data response for the service
   */
  async getServiceNames() {
    const response = await this.#consulConnection
      .getConnection()
      .get(`${this.#endpointUrl}/services`);
    return response.data;
  }

  /**
   * Gets service by name
   * @param serviceName the service name to fetch data for
   * @returns service by name
   */
  async getServiceByName(serviceName: string): Promise<CatalogService> {
    const response = await this.#consulConnection
      .getConnection()
      .get(`${this.#endpointUrl}/service/${serviceName}`);
    return new CatalogService(response.data[0]);
  }

  /**
   * Gets all services from the catalog
   * @param healthEndpoint the health endpoint
   * @returns services with service checks
   */
  async getServices(healthEndpoint: HealthEndpoint): Promise<CatalogService[]> {
    const results = await this.getServiceNames();
    const promiseServices: Promise<CatalogService>[] = [];
    Object.entries(results).forEach((value) => {
      promiseServices.push(
        // Fetch service
        this.getServiceByName(value[0]).then((service) =>
          // Fetch related checks for the services
          healthEndpoint.getServiceCheck(value[0]).then((checks) => {
            service.setServiceChecks(checks);
            return service;
          })
        )
      );
    });
    // Wait to resolve all the promises
    return Promise.all(promiseServices).then((services) => {
      services.sort();
      return services;
    });
  }

  compareServicesOrNodes = (
    oldservices: CatalogService[] | Node[],
    newServices: CatalogService[] | Node[]
  ) => {
    if (oldservices === newServices) return true;
    if (newServices == null) return false;
    if (oldservices.length !== newServices.length) return false;
    for (let i = 0; i < newServices.length; i += 1) {
      if (oldservices[i].id !== newServices[i].id) return false;
    }
    return true;
  };
}
export default CatalogEndpoint;
