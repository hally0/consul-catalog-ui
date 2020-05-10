export class Weights {
  #passing: number;

  #warning: number;

  constructor(source: Record<string, any>) {
    this.#passing = source.Passing;
    this.#warning = source.Warning;
  }
}
export default Weights;
