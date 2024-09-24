import { Body, Param } from '@nestjs/common';
import {
  CreateTeamDecorator,
  DeleteTeamDecorator,
  GetTeamByIdDecorator,
  Team,
  UpdateTeamDecorator,
} from './decorator/team';
import { TeamService } from 'src/organization/application/team.service';
import { CreateTeamDTO, UpdateTeamDTO } from './dto/team';

@Team()
export class TeamResource {
  constructor(private application: TeamService) {}

  @GetTeamByIdDecorator()
  async getTeamById(@Param('id') id: string) {
    return await this.application.getTeam(id);
  }

  @CreateTeamDecorator()
  async createProject(
    @Body() { name, departamentId, sectorId }: CreateTeamDTO,
  ) {
    return await this.application.createTeam(name, departamentId, sectorId);
  }

  @UpdateTeamDecorator()
  async updateTeam(@Param('id') id: string, @Body() { name }: UpdateTeamDTO) {
    return await this.application.updateTeam(id, name);
  }

  @DeleteTeamDecorator()
  async delete(@Param('id') id: string) {
    return await this.application.deleteTeam(id);
  }
}
