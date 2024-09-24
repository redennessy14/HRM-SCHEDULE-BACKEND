import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import {
  DepartamentService,
  ProjectService,
  SectorService,
} from 'src/organization/application';
import { TeamService } from 'src/organization/application/team.service';
import { RelationType } from 'src/organization/domain/member/enum';

@Injectable()
export class UniqueMemberPipe implements PipeTransform {
  constructor(
    private readonly projectService: ProjectService,
    private readonly departamentService: DepartamentService,
    private readonly sectorService: SectorService,
    private readonly teamService: TeamService,
  ) {}
  async transform(value: any) {
    const { profileId, relation, projectId, departamentId, sectorId, teamId } =
      value;

    if (relation == RelationType.PROJECT) {
      const project = await this.projectService.getProject(projectId);
      const exsitingMember = project.members.some(
        (member) => member.profileId == profileId,
      );
      if (exsitingMember) {
        throw new BadRequestException(
          `Сотрудник уже является участником проекта ${project.name}`,
        );
      }
    }
    if (relation == RelationType.DEPARTAMENT) {
      const departament =
        await this.departamentService.getDepartament(departamentId);
      const exsitingMember = departament.members.some(
        (member) => member.profileId == profileId,
      );
      if (exsitingMember) {
        throw new BadRequestException(
          `Сотрудник уже является участником отдела ${departament.name}`,
        );
      }
    }
    if (relation == RelationType.SECTOR) {
      const sector = await this.sectorService.getSector(sectorId);
      const exsitingMember = sector.members.some(
        (member) => member.profileId == profileId,
      );
      if (exsitingMember) {
        throw new BadRequestException(
          `Сотрудник уже является участником сектора ${sector.name}`,
        );
      }
    }
    if (relation == RelationType.TEAM) {
      const team = await this.teamService.getTeam(teamId);
      const exsitingMember = team.members.some(
        (member) => member.profileId == profileId,
      );
      if (exsitingMember) {
        throw new BadRequestException(
          `Сотрудник уже является участником команды ${team.name}`,
        );
      }
    }

    return value;
  }
}
