class Node {
  #id: string;

  #node: string;

  #address: string;

  #datacenter: string;

  #taggedAddresses: { [key: string]: string };

  #meta: { [key: string]: string };

  #createIndex: number;

  #modifyIndex: number;

  /**
   * Creates an instance of node.
   * @param source
   */
  constructor(source: Record<string, any>) {
    this.#id = source.ID;
    this.#node = source.Node;
    this.#address = source.Address;
    this.#datacenter = source.Datacenter;
    this.#taggedAddresses = source.TaggedAddresses;
    this.#meta = source.Meta;
    this.#createIndex = source.CreateIndex;
    this.#modifyIndex = source.ModifyIndex;
  }

  /**
   * Getter id
   * @return {string} the node id
   */
  public get id(): string {
    return this.#id;
  }

  /**
   * Getter address
   * @return {string} the node address
   */
  public get address(): string {
    return this.#address;
  }

  /**
   * Getter name
   * @return {string} the node name
   */
  public get nodeName(): string {
    return this.#node;
  }
}
export default Node;
