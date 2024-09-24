export class MemberSchedule {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
  static New(id: string) {
    return new MemberSchedule(id);
  }
}
