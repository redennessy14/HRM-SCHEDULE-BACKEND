import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/data-access';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepo: Repository<ProjectEntity>,
  ) {}

  async findAll() {
    return await this.projectRepo.find({
      relations: [
        'members',
        'departaments.members',
        'departaments.teams.members',
        'departaments.sectors.members',
        'departaments.sectors.teams.members',
        'departaments.sectors.teams.teamSchedules.memberSchedules.member',
        'departaments.sectors.teams.teamSchedules.memberSchedules.daySchedules.shifts',
      ],
    });
  }

  async findOne(id: string) {
    return await this.projectRepo.findOne({
      where: { id },
      relations: [
        'members',
        'departaments.members',
        'departaments.teams.members',
        'departaments.sectors.members',
        'departaments.sectors.teams.members',
      ],
    });
  }

  async save(name: string) {
    const project = new ProjectEntity();
    project.name = name;
    return await this.projectRepo.save(project);
  }

  async update(id: string, name: string) {
    const project = new ProjectEntity();
    project.name = name;
    await this.projectRepo.update(id, project);
    return this.findOne(id);
  }

  async delete(id: string) {
    await this.projectRepo.delete(id);
    return true;
  }
}
