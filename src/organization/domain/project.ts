export class Project {
  private readonly prop: string;

  constructor(prop: string) {
    this.prop = prop;
  }

  toString() {
    return `Here is example entity with prop ${this.prop}`;
  }
}
