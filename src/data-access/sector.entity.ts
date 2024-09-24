import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DepartamentEntity } from './departament.entity';
import { TeamEntity } from './team.entity';
import { MemberEntity } from './member.entity';

@Entity({ name: 'sector' })
export class SectorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => DepartamentEntity, (departament) => departament.sectors)
  @JoinColumn({ name: 'departament_id' })
  departament: DepartamentEntity;

  @OneToMany(() => TeamEntity, (team) => team.sector)
  teams: TeamEntity;

  @OneToMany(() => MemberEntity, (member) => member.sector)
  members: MemberEntity[];
}
