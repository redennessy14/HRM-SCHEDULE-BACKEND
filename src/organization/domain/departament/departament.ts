import { AggregateRoot } from '@nestjs/cqrs';
import { Team } from '../team';
import { Project } from '../project';
import { Member } from '../member';

export class Departament extends AggregateRoot {
  readonly id: string;
  readonly project: Project;
  readonly teams: Team[];
  readonly members: Member[];
  constructor() {
    super();
  }
}
