import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DayScheduleEntity, MemberScheduleEntity } from 'src/data-access';
import { DayScheduleType } from 'src/schedule/domain/day-schedule/enum';
import { Repository } from 'typeorm';

@Injectable()
export class DayScheduleRepository {
  constructor(
    @InjectRepository(DayScheduleEntity)
    private dayScheduleRepo: Repository<DayScheduleEntity>,
  ) {}

  async create(
    memberSchedule: MemberScheduleEntity,
    date: string,
    type: DayScheduleType,
  ) {
    return await this.dayScheduleRepo.create({
      memberSchedule,
      date,
      type,
    });
  }

  async save(daySchedule: DayScheduleEntity) {
    return await this.dayScheduleRepo.save(daySchedule);
  }
}
