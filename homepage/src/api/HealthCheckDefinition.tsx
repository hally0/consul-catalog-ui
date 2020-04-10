class HealthCheckDefinition {
  private http: string;

  private header: { [key: string]: string };

  private method: string;

  private body: string;

  private tlsSkipVerify: boolean;

  private tcp: string;

  constructor(source: any) {
    if (typeof source === 'string') source = JSON.parse(source);
    this.http = source.http;
    this.header = source.header;
    this.method = source.method;
    this.body = source.body;
    this.tlsSkipVerify = source.tlsSkipVerify;
    this.tcp = source.tcp;
  }
}
export default HealthCheckDefinition;