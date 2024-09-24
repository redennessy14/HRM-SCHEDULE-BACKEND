import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DayScheduleEntity } from './day-schedule.entity';

@Entity({ name: 'shift' })
export class ShiftEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'start_time' })
  startTime: string;

  @Column({ name: 'end_time' })
  endTime: string;

  @Column({ name: 'break_time' })
  breakTime: string;

  @Column({ name: 'total_hours' })
  totalHours: number;

  @Column()
  color: string;

  @Column()
  rate: string;

  @ManyToOne(() => DayScheduleEntity, (daySchedule) => daySchedule.shifts)
  @JoinColumn({ name: 'day_schedule_id' })
  daySchedule: DayScheduleEntity;
}
