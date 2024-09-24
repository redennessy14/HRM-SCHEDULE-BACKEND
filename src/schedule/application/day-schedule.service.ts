import { Injectable } from '@nestjs/common';
import { DayScheduleRepository } from '../port/persistence/day-schedule.repository';
import { MemberScheduleRepository } from '../port/persistence/member-schedule.repository';
import { DayScheduleType } from '../domain/day-schedule/enum';

@Injectable()
export class DayScheduleService {
  constructor(
    private dayScheduleRepo: DayScheduleRepository,
    private memberScheduleRepo: MemberScheduleRepository,
  ) {}

  async createDaySchedule(
    memberScheduleId: string,
    date: string,
    type: DayScheduleType,
  ) {
    const memberSchedule =
      await this.memberScheduleRepo.findById(memberScheduleId);

    const daySchedule = await this.dayScheduleRepo.create(
      memberSchedule,
      date,
      type,
    );
    return await this.dayScheduleRepo.save(daySchedule);
  }
}
