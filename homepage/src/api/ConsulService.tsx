import HealthCheck from './HealthCheck';
import ServiceAddress from './ServiceAddress';
import Weights from './Weights';

class CatalogService {
  private id: string;

  private node: string;

  private address: string;

  private datacenter: string;

  private taggedAddresses: { [key: string]: string };

  private nodeMeta: { [key: string]: string };

  private serviceId: string | undefined;

  private serviceName: string;

  private serviceAddress: string;

  private serviceTaggedAddresses: { [key: string]: ServiceAddress } | undefined;

  private serviceTags: string[];

  private serviceMeta: { [key: string]: string };

  private servicePort: number;

  private serviceWeights: Weights;

  private serviceEnableTagOverride: boolean;

  private createIndex: number | undefined;

  private checks: HealthCheck[] = [];

  private modifyIndex: number | undefined;

  constructor(source: any) {
    if (typeof source === 'string') source = JSON.parse(source);
    source = source[0];
    this.id = source.ID;
    this.node = source.Node;
    this.address = source.Address;
    this.datacenter = source.Datacenter;
    this.taggedAddresses = source.TaggedAddresses;
    this.nodeMeta = source.NodeMeta;
    this.serviceId = source.ServiceId;
    this.serviceName = source.ServiceName;
    this.serviceAddress = source.ServiceAddress;
    this.serviceTaggedAddresses = source.ServiceTaggedAddresses;
    this.serviceTags = source.ServiceTags;
    this.serviceMeta = source.ServiceMeta;
    this.servicePort = source.ServicePort;
    this.serviceWeights = new Weights(source.ServiceWeights);
    this.serviceEnableTagOverride = source.ServiceEnableTagOverride;
    this.createIndex = source.CreateIndex;
    this.modifyIndex = source.ModifyIndex;
  }

  /**
   * Getter id
   * @return {string}
   */
  public get $id(): string {
    return this.id;
  }

  /**
   * Getter node
   * @return {string}
   */
  public get $node(): string {
    return this.node;
  }

  /**
   * Getter address
   * @return {string}
   */
  public get $address(): string {
    return this.address;
  }

  /**
   * Getter serviceId
   * @return {string}
   */
  public get $serviceId(): string | undefined {
    return this.serviceId;
  }

  /**
   * Getter serviceName
   * @return {string}
   */
  public get $serviceName(): string {
    return this.serviceName;
  }

  /**
   * Getter address
   * @return {string}
   */
  public get $serviceAddress(): string {
    return this.serviceAddress;
  }

  /**
   * Getter servicePort
   * @return {number}
   */
  public get $servicePort(): number {
    return this.servicePort;
  }

  public get protocoll(): string {
    if (this.serviceTags) {
      for (let index = 0; index < this.serviceTags.length; index += 1) {
        if (this.serviceTags[index] === 'secure=true') {
          return 'https';
        }
      }
    }
    return 'http';
  }

  public setServiceChecks(healthChecks: HealthCheck[]) {
    this.checks = healthChecks;
  }

  public get serviceChecks(): HealthCheck[] {
    return this.checks;
  }

  public get serviceCheckPassing(): boolean {
    let passing = false;
    this.checks.forEach((check) => {
      if (check.$status === 'passing') {
        passing = true;
      }
    });

    return passing;
  }

  public get hasServiceChecks(): boolean {
    if (this.checks.length > 0) {
      return true;
    }
    return false;
  }

  public get amountChecksPassingAndFailing(): string {
    let passing = 0;
    let failing = 0;
    this.checks.forEach((check) => {
      if (check.$status === 'passing') {
        passing += 1;
      } else if (check.$status === 'failing') {
        failing += 1;
      }
    });

    return `passing: ${passing}, failing: ${failing}`;
  }

  private iterateTags(tag: string): boolean {
    if (this.serviceTags) {
      for (let index = 0; index < this.serviceTags.length; index += 1) {
        if (this.serviceTags[index] === tag) {
          return true;
        }
      }
    }
    return false;
  }

  public get secure(): boolean {
    return this.iterateTags('secure=true');
  }

  public get enabled(): boolean {
    return this.iterateTags('homepage=true');
  }

  public get url(): string {
    return `${this.protocoll}://${this.address}:${this.servicePort}`;
  }
}
export default ConsulService;
