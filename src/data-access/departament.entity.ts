import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from './project.entity';
import { TeamEntity } from './team.entity';
import { MemberEntity } from './member.entity';
import { SectorEntity } from './sector.entity';

@Entity({ name: 'departament' })
export class DepartamentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ProjectEntity, (project) => project.departaments)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @OneToMany(() => TeamEntity, (team) => team.departament)
  teams: TeamEntity[];

  @OneToMany(() => SectorEntity, (sector) => sector.departament)
  sectors: SectorEntity[];

  @OneToMany(() => MemberEntity, (member) => member.departament)
  members: MemberEntity[];
}
