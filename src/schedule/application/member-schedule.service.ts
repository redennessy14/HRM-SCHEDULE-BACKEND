import { Injectable } from '@nestjs/common';
import { MemberScheduleRepository } from '../port/persistence/member-schedule.repository';
import { MemberRepository } from 'src/organization/port/persistence/member.repository';
import { TeamScheduleRepository } from '../port/persistence/team-schedule.repository';
import { TeamScheduleService } from './team-schedule.service';

@Injectable()
export class MemberScheduleService {
  constructor(
    private memberScheduleRepo: MemberScheduleRepository,
    private memberRepo: MemberRepository,
    private teamScheduleService: TeamScheduleService,
  ) {}

  async getAllMemberSchedules() {
    return await this.memberScheduleRepo.findAll();
  }

  async createMemberSchedule(memberId: string, teamScheduleId: string) {
    const member = await this.memberRepo.findById(memberId);
    const teamSchedule =
      await this.teamScheduleService.getTeamSchedule(teamScheduleId);

    const memberSchedule = await this.memberScheduleRepo.create(
      member,
      teamSchedule,
    );
    const memberScheduleEntity =
      await this.memberScheduleRepo.save(memberSchedule);

    const profile = await this.teamScheduleService.getProfile(
      memberScheduleEntity.member.profileId,
    );

    return {
      ...memberScheduleEntity,
      profile,
    };
  }
}
