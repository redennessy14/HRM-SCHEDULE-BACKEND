import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DayScheduleEntity, ShiftEntity } from 'src/data-access';
import { Shift } from 'src/schedule/domain/shift';
import { Repository } from 'typeorm';
import { ShiftMapper } from './mappper';

@Injectable()
export class ShiftRepository {
  constructor(
    @InjectRepository(ShiftEntity)
    private shiftRepo: Repository<ShiftEntity>,
  ) {}

  async save(daySchedule: DayScheduleEntity, shift: Shift) {
    const shiftEntity = ShiftMapper.toPersistence(daySchedule, shift);
    return await this.shiftRepo.save(shiftEntity);
  }
}
