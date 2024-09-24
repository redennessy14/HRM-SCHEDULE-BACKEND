import { AggregateRoot } from '@nestjs/cqrs';
import { DayScheduleType } from './enum';
import { MemberSchedule } from '../member-schedule/member-schedule';

export class DaySchedule extends AggregateRoot {
  readonly id?: string;
  readonly memberSchedule: MemberSchedule;
  readonly date: string;
  readonly type: DayScheduleType;
  constructor(
    memberSchedule: MemberSchedule,
    date: string,
    type: DayScheduleType,
    id?: string,
  ) {
    super();
    this.id = id;
    this.memberSchedule = memberSchedule;
    this.date = date;
    this.type = type;
  }

  static New(
    memberSchedule: MemberSchedule,
    date: string,
    type: DayScheduleType,
    id?: string,
  ) {
    return new DaySchedule(memberSchedule, date, type, id);
  }
}
