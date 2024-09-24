import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import {
  DepartamentService,
  ProjectService,
  SectorService,
} from 'src/organization/application';
import { TeamService } from 'src/organization/application/team.service';
import { RelationType } from 'src/organization/domain/member/enum';

@Injectable()
export class UniqueMemberRolePipe implements PipeTransform {
  constructor(
    private readonly projectService: ProjectService,
    private readonly departamentService: DepartamentService,
    private readonly sectorService: SectorService,
    private readonly teamService: TeamService,
  ) {}
  async transform(value: any) {
    const { role, relation, projectId, departamentId, sectorId, teamId } =
      value;
    if (relation == RelationType.PROJECT) {
      const project = await this.projectService.getProject(projectId);
      const roleCount = project.members.filter(
        (member) => member.role == role,
      ).length;

      if (['head_of_project'].includes(role) && roleCount > 0) {
        throw new BadRequestException(
          `В проекте может быть только один ${role}`,
        );
      }
    }
    if (relation == RelationType.DEPARTAMENT) {
      const departament =
        await this.departamentService.getDepartament(departamentId);
      const roleCount = departament.members.filter(
        (member) => member.role == role,
      ).length;

      if (['head_of_departament'].includes(role) && roleCount > 0) {
        throw new BadRequestException(
          `В проекте может быть только один ${role}`,
        );
      }
    }

    if (relation == RelationType.SECTOR) {
      const sector = await this.sectorService.getSector(sectorId);
      const roleCount = sector.members.filter(
        (member) => member.role == role,
      ).length;

      if (['head_of_sector'].includes(role) && roleCount > 0) {
        throw new BadRequestException(
          `В проекте может быть только один ${role}`,
        );
      }
    }

    if (relation == RelationType.TEAM) {
      const team = await this.teamService.getTeam(teamId);
      const roleCount = team.members.filter(
        (member) => member.role == role,
      ).length;

      if (['manager'].includes(role) && roleCount > 0) {
        throw new BadRequestException(
          `В проекте может быть только один ${role}`,
        );
      }
    }

    return value;
  }
}
