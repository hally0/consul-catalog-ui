export class ServiceAddress {
  private address: string;

  private port: number;

  constructor(source: any) {
    if (typeof source === 'string') source = JSON.parse(source);
    this.address = source.Address;
    this.port = source.Port;
  }
}
export default ServiceAddress;
