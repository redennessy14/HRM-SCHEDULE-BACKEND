import { AggregateRoot } from '@nestjs/cqrs';
import { Departament } from '../departament';

export class Project extends AggregateRoot {
  readonly id: string;
  readonly name: string;
  readonly departaments: Departament[];
  constructor() {
    super();
  }
}
