import { MemberScheduleService } from 'src/schedule/application/member-schedule.service';
import {
  CreateMemberScheduleDecorator,
  GetAllMemberSchedulesDecorator,
  MemberSchedule,
} from './decorator/member-schedule';
import { Body } from '@nestjs/common';
import { CreateMemberScheduleDTO } from './dto/member-schedule';

@MemberSchedule()
export class MemberScheduleResource {
  constructor(private application: MemberScheduleService) {}

  @GetAllMemberSchedulesDecorator()
  async getAllMemberSchedules() {
    return await this.application.getAllMemberSchedules();
  }

  @CreateMemberScheduleDecorator()
  async createMemberSchedule(
    @Body() { memberId, teamScheduleId }: CreateMemberScheduleDTO,
  ) {
    return await this.application.createMemberSchedule(
      memberId,
      teamScheduleId,
    );
  }
}
