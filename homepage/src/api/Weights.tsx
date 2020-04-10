export class Weights {
  private passing: number;

  private warning: number;

  constructor(source: any) {
    this.passing = source.Passing;
    this.warning = source.Warning;
  }
}
export default Weights;
