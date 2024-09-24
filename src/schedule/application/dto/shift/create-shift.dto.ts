import { DayScheduleType } from 'src/schedule/domain/day-schedule/enum';

export class CreateShiftDTO {
  startTime: string;

  endTime: string;

  breakTime: string;

  rate: string;

  type: DayScheduleType;

  color: string;

  dates: string[];

  memberScheduleId: string;
}
