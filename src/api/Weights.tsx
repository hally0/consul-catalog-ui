export class Weights {
  private passing: number;

  private warning: number;

  constructor(source: Record<string, any>) {
    this.passing = source.Passing;
    this.warning = source.Warning;
  }
}
export default Weights;
