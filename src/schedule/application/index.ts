import { TeamScheduleService } from './team-schedule.service';
import { MemberScheduleService } from './member-schedule.service';
import { DayScheduleService } from './day-schedule.service';
import { ShiftService } from './shift.service';

export const Application = [
  TeamScheduleService,
  MemberScheduleService,
  DayScheduleService,
  ShiftService,
];
