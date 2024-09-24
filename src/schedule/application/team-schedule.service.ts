import { Inject, Injectable } from '@nestjs/common';
import { TeamScheduleRepository } from '../port/persistence/team-schedule.repository';
import { TeamRepository } from 'src/organization/port/persistence/team.repository';
import { MemberService } from 'src/organization/application';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TeamScheduleService {
  constructor(
    private teamScheduleRepo: TeamScheduleRepository,
    private teamRepo: TeamRepository,
    @Inject('TCP_PROFILE') private readonly client: ClientProxy,
  ) {}

  async getTeamSchedule(id: string) {
    const teamSchedule = await this.teamScheduleRepo.findById(id);
    const membersWithProfile = await Promise.all(
      teamSchedule.memberSchedules.map(async (memberSchedule) => {
        const data = await this.getProfile(memberSchedule.member.profileId);
        return {
          ...memberSchedule,
          profile: data,
        };
      }),
    );

    teamSchedule.memberSchedules = membersWithProfile;
    return teamSchedule;
  }

  async getProfile(profileId: string) {
    return await lastValueFrom(
      this.client.send('profile:get_profile', { profileId }),
    );
  }

  async createTeamSchedule(period: string, teamId: string) {
    const team = await this.teamRepo.findOne(teamId);
    const schedule = await this.teamScheduleRepo.create(period, team);
    return await this.teamScheduleRepo.save(schedule);
  }
}
