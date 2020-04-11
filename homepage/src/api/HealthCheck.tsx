import HealthCheckDefinition from './HealthCheckDefinition';

class HealthCheck {
  private node: string;

  private checkId: string;

  private name: string;

  private status: string;

  private notes: string;

  private output: string;

  private serviceId: string;

  private serviceName: string;

  private serviceTags: string[];

  private type: string;

  private namespace: string;

  private definition: HealthCheckDefinition;

  private createIndex: number;

  private modifyIndex: number;

  constructor(source: Record<string, any>) {
    this.node = source.Node;
    this.checkId = source.CheckId;
    this.name = source.Name;
    this.status = source.Status;
    this.notes = source.Notes;
    this.output = source.Output;
    this.serviceId = source.ServiceId;
    this.serviceName = source.ServiceName;
    this.serviceTags = source.ServiceTags;
    this.type = source.Type;
    this.namespace = source.Namespace;
    this.definition = new HealthCheckDefinition(source.Definition);
    this.createIndex = source.CreateIndex;
    this.modifyIndex = source.ModifyIndex;
  }

  /**
   * Getter status
   * @return {string}
   */
  public get $status(): string {
    return this.status;
  }

  /**
   * Getter $serviceName
   * @return {string}
   */
  public get $serviceName(): string {
    return this.serviceName;
  }
}
export default HealthCheck;
