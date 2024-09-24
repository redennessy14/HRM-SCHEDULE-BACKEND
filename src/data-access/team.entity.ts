import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  DepartamentEntity,
  MemberEntity,
  SectorEntity,
  TeamScheduleEntity,
} from '.';

@Entity({ name: 'team' })
export class TeamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => DepartamentEntity, (departament) => departament.teams)
  @JoinColumn({ name: 'departament_id' })
  departament: DepartamentEntity;

  @ManyToOne(() => SectorEntity, (sector) => sector.teams)
  @JoinColumn({ name: 'sector_id' })
  sector: SectorEntity;

  @OneToMany(() => MemberEntity, (member) => member.team)
  members: MemberEntity[];

  @OneToMany(() => TeamScheduleEntity, (teamSchedule) => teamSchedule.team)
  teamSchedules: TeamScheduleEntity[];
}
