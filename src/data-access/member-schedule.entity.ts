import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MemberEntity } from './member.entity';
import { TeamScheduleEntity } from './team-schedule.entity';
import { DayScheduleEntity } from './day-schedule.entity';

@Entity({ name: 'member_schedule' })
export class MemberScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MemberEntity, (member) => member.schedules)
  @JoinColumn({ name: 'member_id' })
  member: MemberEntity;

  @ManyToOne(
    () => TeamScheduleEntity,
    (teamSchedule) => teamSchedule.memberSchedules,
  )
  @JoinColumn({ name: 'team_schedule_id' })
  teamSchedule: TeamScheduleEntity;

  @OneToMany(() => DayScheduleEntity, (day) => day.memberSchedule)
  daySchedules: DayScheduleEntity[];
}
