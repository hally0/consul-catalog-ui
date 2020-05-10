import HealthCheck from './HealthCheck';
import ServiceAddress from './ServiceAddress';
import Weights from './Weights';

/**
 * Catalog service
 */
class CatalogService {
  #id: string;

  #node: string;

  #address: string;

  #datacenter: string;

  #taggedAddresses: { [key: string]: string };

  #nodeMeta: { [key: string]: string };

  #serviceId: string | undefined;

  #serviceName: string;

  #serviceAddress: string;

  #serviceTaggedAddresses: { [key: string]: ServiceAddress } | undefined;

  #serviceTags: string[];

  #serviceMeta: { [key: string]: string };

  #servicePort: number;

  #serviceWeights: Weights;

  #serviceEnableTagOverride: boolean;

  #createIndex: number | undefined;

  #checks: HealthCheck[] = [];

  #modifyIndex: number | undefined;

  constructor(source: Record<string, any>) {
    this.#id = source.ID;
    this.#node = source.Node;
    this.#address = source.Address;
    this.#datacenter = source.Datacenter;
    this.#taggedAddresses = source.TaggedAddresses;
    this.#nodeMeta = source.NodeMeta;
    this.#serviceId = source.ServiceID;
    this.#serviceName = source.ServiceName;
    this.#serviceAddress = source.ServiceAddress;
    this.#serviceTaggedAddresses = source.ServiceTaggedAddresses;
    this.#serviceTags = source.ServiceTags;
    this.#serviceMeta = source.ServiceMeta;
    this.#servicePort = source.ServicePort;
    this.#serviceWeights = new Weights(source.ServiceWeights);
    this.#serviceEnableTagOverride = source.ServiceEnableTagOverride;
    this.#createIndex = source.CreateIndex;
    this.#modifyIndex = source.ModifyIndex;
  }

  /**
   * Getter id
   * @return {string} the id
   */
  public get id(): string {
    return this.#id;
  }

  /**
   * Getter node
   * @return {string} the node name
   */
  public get nodeName(): string {
    return this.#node;
  }

  /**
   * Getter address
   * @return {string} the service address
   */
  public get nodeAddress(): string {
    return this.#address;
  }

  /**
   * Getter serviceId
   * @return {string} the service id
   */
  public get serviceId(): string | undefined {
    return this.#serviceId;
  }

  /**
   * Getter serviceName
   * @return {string} the service name
   */
  public get serviceName(): string {
    return this.#serviceName;
  }

  /**
   * Getter address
   * @return {string} the service address
   */
  public get serviceAddress(): string {
    return this.#serviceAddress;
  }

  /**
   * Getter servicePort
   * @return {number} the service port
   */
  public get servicePort(): number {
    return this.#servicePort;
  }

  /**
   * Gets protocoll
   * @returns https if secure is enabled, http if not
   */
  public get protocoll(): string {
    if (this.#serviceTags) {
      for (let index = 0; index < this.#serviceTags.length; index += 1) {
        if (this.#serviceTags[index] === 'secure=true') {
          return 'https';
        }
      }
    }
    return 'http';
  }

  /**
   * Gets service checks
   * @returns the service checks of the service
   */
  public get serviceChecks(): HealthCheck[] {
    return this.#checks;
  }

  /**
   * Sets service checks
   * @param healthChecks the health checks to set
   */
  public setServiceChecks(healthChecks: HealthCheck[]) {
    this.#checks = healthChecks;
  }

  /**
   * Gets service check passing
   * @returns true if service has service checks that are passing, false if not
   */
  public get serviceCheckPassing(): boolean {
    let passing = false;
    this.#checks.forEach((check) => {
      if (check.status === 'passing') {
        passing = true;
      }
    });

    return passing;
  }

  /**
   * Check if the service have health checks
   * @returns true if the service have service checks, false if not
   */
  public get hasServiceChecks(): boolean {
    if (this.#checks.length > 0) {
      return true;
    }
    return false;
  }

  /**
   * Gets amount checks passing and failing
   * @returns amount passing, amount failing
   */
  public get amountChecksPassingAndFailing(): string {
    let passing = 0;
    let failing = 0;
    this.#checks.forEach((check) => {
      if (check.status === 'passing') {
        passing += 1;
      } else if (check.status === 'failing') {
        failing += 1;
      }
    });

    return `passing: ${passing}, failing: ${failing}`;
  }

  /**
   * Gets secure
   * @returns true if service needs https, false if not
   */
  public get secure(): boolean {
    return this.iterateTags('secure=true');
  }

  /**
   * Gets enabled
   * @returns true if service is enabled, false if not
   */
  public get enabled(): boolean {
    return this.iterateTags('homepage=true');
  }

  /**
   * Gets url
   * @returns the formatted url
   */
  public get url(): string {
    return `${this.protocoll}://${this.nodeAddress}:${this.#servicePort}`;
  }

  /**
   * Iterate through the tags to find key
   * @param key key to find
   * @returns true if service has tag, false if not
   */
  private iterateTags(key: string): boolean {
    if (this.#serviceTags) {
      for (let index = 0; index < this.#serviceTags.length; index += 1) {
        if (this.#serviceTags[index] === key) {
          return true;
        }
      }
    }
    return false;
  }
}
export default CatalogService;
