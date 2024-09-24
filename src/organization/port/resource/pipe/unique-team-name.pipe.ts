import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TeamService } from 'src/organization/application/team.service';

@Injectable()
export class UniqueTeamNamePipe implements PipeTransform {
  constructor(private readonly teamService: TeamService) {}

  async transform(value: any) {
    const { name, departamentId, sectorId } = value;

    if (!name) {
      return value;
    }

    if (departamentId) {
      const existingTeam =
        await this.teamService.getTeamsByDepartamentId(departamentId);

      const isNameTaken = existingTeam.some(
        (team) => team.name.toLowerCase() === name.toLowerCase(),
      );

      if (isNameTaken) {
        throw new BadRequestException(
          `Команда с названием ${name} уже существует в этом отделе `,
        );
      }
    }

    if (sectorId) {
      const existingTeam = await this.teamService.getTeamsBySectorId(sectorId);

      const isNameTaken = existingTeam.some(
        (team) => team.name.toLowerCase() === name.toLowerCase(),
      );

      if (isNameTaken) {
        throw new BadRequestException(
          `Команда с названием ${name} уже существует в этом секторе `,
        );
      }
    }

    return value;
  }
}
