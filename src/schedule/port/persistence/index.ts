import { TeamScheduleRepository } from './team-schedule.repository';
import { MemberScheduleRepository } from './member-schedule.repository';
import { DayScheduleRepository } from './day-schedule.repository';
import { ShiftRepository } from './shift.repository';

export const Persistence = [
  TeamScheduleRepository,
  MemberScheduleRepository,
  DayScheduleRepository,
  ShiftRepository,
];
