import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DepartamentEntity } from './departament.entity';
import { MemberEntity } from './member.entity';

@Entity({
  name: 'project',
})
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => DepartamentEntity, (departament) => departament.project)
  departaments: DepartamentEntity[];

  @OneToMany(() => MemberEntity, (member) => member.project)
  members: MemberEntity[];
}
