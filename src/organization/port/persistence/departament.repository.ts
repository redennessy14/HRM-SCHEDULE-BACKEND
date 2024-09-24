import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentEntity, ProjectEntity } from 'src/data-access';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentRepository {
  constructor(
    @InjectRepository(DepartamentEntity)
    private departamentRepo: Repository<DepartamentEntity>,
  ) {}

  async findAll() {
    return await this.departamentRepo.find({
      relations: ['project', 'teams'],
    });
  }

  async findOne(id: string) {
    return await this.departamentRepo.findOne({
      where: { id },
      relations: ['teams', 'members', 'sectors', 'project'],
    });
  }

  async findByProjectId(projectId: string) {
    return await this.departamentRepo.find({
      where: { project: { id: projectId } },
    });
  }

  async create(name: string, project: ProjectEntity) {
    return this.departamentRepo.create({ name, project });
  }

  async save(departament: DepartamentEntity) {
    return await this.departamentRepo.save(departament);
  }

  async update(id: string, departament: DepartamentEntity) {
    await this.departamentRepo.update(id, departament);
    return this.findOne(id);
  }

  async delete(id: string) {
    await this.departamentRepo.delete(id);
    return true;
  }
}
