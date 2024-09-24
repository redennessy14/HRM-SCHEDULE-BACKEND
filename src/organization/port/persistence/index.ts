import { ProjectRepository } from './project.repository';
import { DepartamentRepository } from './departament.repository';
import { SectorRepository } from './sector.repository';
import { TeamRepository } from './team.repository';
import { MemberRepository } from './member.repository';

export const Persistence = [
  ProjectRepository,
  DepartamentRepository,
  SectorRepository,
  TeamRepository,
  MemberRepository,
];
