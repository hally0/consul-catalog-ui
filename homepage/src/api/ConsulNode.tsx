class Node {
  private id: string;

  private node: string;

  private address: string;

  private datacenter: string;

  private taggedAddresses: { [key: string]: string };

  private meta: { [key: string]: string };

  private createIndex: number;

  private modifyIndex: number;

  /**
   * Creates an instance of node.
   * @param source
   */
  constructor(source: any) {
    if (typeof source === 'string') source = JSON.parse(source);
    this.id = source.ID;
    this.node = source.Node;
    this.address = source.Address;
    this.datacenter = source.Datacenter;
    this.taggedAddresses = source.TaggedAddresses;
    this.meta = source.Meta;
    this.createIndex = source.CreateIndex;
    this.modifyIndex = source.ModifyIndex;
  }

  /**
   * Getter id
   * @return {string}
   */
  public get nodeID(): string {
    return this.id;
  }

  /**
   * Getter address
   * @return {string}
   */
  public get nodeAddress(): string {
    return this.address;
  }

  /**
   * Getter name
   * @return {string}
   */
  public get nodeName(): string {
    return this.node;
  }
}
export default Node;
