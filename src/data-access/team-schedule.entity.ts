import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MemberScheduleEntity } from './member-schedule.entity';
import { TeamScheduleStatus } from 'src/schedule/domain/team-schedule/enum';
import { TeamEntity } from './team.entity';

@Entity({ name: 'team_schedule' })
export class TeamScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TeamScheduleStatus,
    default: TeamScheduleStatus.EDITING,
  })
  status: TeamScheduleStatus;

  @Column()
  period: string;

  @ManyToOne(() => TeamEntity, (team) => team.teamSchedules)
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;

  @OneToMany(
    () => MemberScheduleEntity,
    (memberSchedule) => memberSchedule.teamSchedule,
  )
  memberSchedules: MemberScheduleEntity[];
}
