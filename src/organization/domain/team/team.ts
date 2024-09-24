import { AggregateRoot } from '@nestjs/cqrs';
import { Member } from '../member';

export class Team extends AggregateRoot {
  readonly id: string;
  readonly name: string;
  readonly members: Member[];

  constructor() {
    super();
  }

  static New = () => {};
}
