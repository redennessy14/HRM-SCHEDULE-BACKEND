import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamEntity } from './team.entity';
import { MemberRole } from 'src/organization/domain/member/enum';
import { DepartamentEntity } from './departament.entity';
import { SectorEntity } from './sector.entity';
import { ProjectEntity } from './project.entity';
import { MemberScheduleEntity } from './member-schedule.entity';

@Entity({ name: 'member' })
export class MemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'profile_id' })
  profileId: string;

  @Column({
    type: 'enum',
    enum: MemberRole,
    default: MemberRole.EMPLOYEE,
  })
  role: MemberRole;

  @ManyToOne(() => ProjectEntity, (project) => project.members)
  @JoinColumn({ name: 'project_id' })
  project?: ProjectEntity;

  @ManyToOne(() => DepartamentEntity, (departament) => departament.members)
  @JoinColumn({ name: 'departament_id' })
  departament?: DepartamentEntity;

  @ManyToOne(() => SectorEntity, (sector) => sector.members)
  @JoinColumn({ name: 'sector_id' })
  sector?: SectorEntity;

  @ManyToOne(() => TeamEntity, (team) => team.members)
  @JoinColumn({ name: 'team_id' })
  team?: TeamEntity;

  @OneToMany(
    () => MemberScheduleEntity,
    (memberSchedule) => memberSchedule.member,
  )
  schedules: MemberScheduleEntity[];
}
