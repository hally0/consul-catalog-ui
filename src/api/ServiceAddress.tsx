export class ServiceAddress {
  #address: string;

  #port: number;

  constructor(source: Record<string, any>) {
    this.#address = source.Address;
    this.#port = source.Port;
  }
}
export default ServiceAddress;
