class HealthCheckDefinition {
  #http: string;

  #header: { [key: string]: string };

  #method: string;

  #body: string;

  #tlsSkipVerify: boolean;

  #tcp: string;

  constructor(source: Record<string, any>) {
    this.#http = source.http;
    this.#header = source.header;
    this.#method = source.method;
    this.#body = source.body;
    this.#tlsSkipVerify = source.tlsSkipVerify;
    this.#tcp = source.tcp;
  }
}
export default HealthCheckDefinition;
