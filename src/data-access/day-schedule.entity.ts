import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MemberScheduleEntity } from './member-schedule.entity';
import { ShiftEntity } from './shift.entity';
import { DayScheduleType } from 'src/schedule/domain/day-schedule/enum';

@Entity({ name: 'day_schedule' })
export class DayScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @Column({
    type: 'enum',
    enum: DayScheduleType,
  })
  type: DayScheduleType;

  @ManyToOne(
    () => MemberScheduleEntity,
    (memberSchedule) => memberSchedule.daySchedules,
  )
  @JoinColumn({ name: 'day_schedule_id' })
  memberSchedule: MemberScheduleEntity;

  @OneToMany(() => ShiftEntity, (shift) => shift.daySchedule)
  shifts: ShiftEntity[];
}
