import { TeamScheduleService } from 'src/schedule/application/team-schedule.service';
import {
  CreateTeamScheduleDecorator,
  GetTeamSchdeduleDecorator,
  TeamSchedule,
} from './decorator/team-schedule';
import { Body, Param } from '@nestjs/common';
import { CreateTeamScheduleDTO } from './dto/team-schedule';

@TeamSchedule()
export class TeamScheduleResource {
  constructor(private application: TeamScheduleService) {}

  @GetTeamSchdeduleDecorator()
  async getTeamSchedule(@Param('id') id: string) {
    return await this.application.getTeamSchedule(id);
  }

  @CreateTeamScheduleDecorator()
  async createTeamSchedule(@Body() { period, teamId }: CreateTeamScheduleDTO) {
    return await this.application.createTeamSchedule(period, teamId);
  }
}
