import { AggregateRoot } from '@nestjs/cqrs';
import { MemberRole } from './enum';

import {
  DepartamentEntity,
  ProjectEntity,
  SectorEntity,
  TeamEntity,
} from 'src/data-access';

export class Member extends AggregateRoot {
  readonly profileId: string;
  readonly role: MemberRole;
  readonly project?: ProjectEntity;
  readonly departament?: DepartamentEntity;
  readonly sector?: SectorEntity;
  readonly team?: TeamEntity;
  constructor(
    profileId: string,
    role: MemberRole,
    project?: ProjectEntity,
    departament?: DepartamentEntity,
    sector?: SectorEntity,
    team?: TeamEntity,
  ) {
    super();
    this.profileId = profileId;
    this.role = role;
    this.project = project;
    this.departament = departament;
    this.sector = sector;
    this.team = team;
  }

  static New(
    profileId: string,
    role: MemberRole,
    project?: ProjectEntity,
    departament?: DepartamentEntity,
    sector?: SectorEntity,
    team?: TeamEntity,
  ) {
    return new Member(profileId, role, project, departament, sector, team);
  }
}
