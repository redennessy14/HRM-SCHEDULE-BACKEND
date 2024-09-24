import { Injectable } from '@nestjs/common';
import { ShiftRepository } from '../port/persistence/shift.repository';
import { CreateShiftDTO } from './dto/shift';
import { DayScheduleService } from './day-schedule.service';
import { Period } from '../domain/shift/value';
import { Shift } from '../domain/shift';

@Injectable()
export class ShiftService {
  constructor(
    private shiftRepo: ShiftRepository,
    private dayScheduleService: DayScheduleService,
  ) {}

  async createShift(dto: CreateShiftDTO) {
    const {
      startTime,
      endTime,
      breakTime,
      rate,
      dates,
      type,
      color,
      memberScheduleId,
    } = dto;

    const period = new Period(startTime, endTime, breakTime);

    const shifts = await Promise.all(
      dates.map(async (date) => {
        const daySchedule = await this.dayScheduleService.createDaySchedule(
          memberScheduleId,
          date,
          type,
        );
        const shift = Shift.New(period, rate, color);
        return await this.shiftRepo.save(daySchedule, shift);
      }),
    );

    return shifts;
  }
}
