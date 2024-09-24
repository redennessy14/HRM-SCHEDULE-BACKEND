import { Injectable, Param } from '@nestjs/common';
import { DepartamentRepository } from '../port/persistence/departament.repository';

import { ProjectService } from './project.service';

@Injectable()
export class DepartamentService {
  constructor(
    private projectService: ProjectService,
    private departamentRepo: DepartamentRepository,
  ) {}

  async getDepartament(@Param('id') id: string) {
    const departament = await this.departamentRepo.findOne(id);

    const membersWithProfile = await Promise.all(
      departament.members.map(async (member) => {
        const data = await this.projectService.getProfile(member.profileId);
        return {
          ...member,
          profile: data,
        };
      }),
    );
    departament.members = membersWithProfile;
    return departament;
  }
  async getAllDepartament() {
    return await this.departamentRepo.findAll();
  }

  async getDepartamentByProjectId(projectId: string) {
    return await this.departamentRepo.findByProjectId(projectId);
  }

  async createDepartament(name: string, projectId: string) {
    const project = await this.projectService.getProject(projectId);

    const departament = await this.departamentRepo.create(name, project);

    return this.departamentRepo.save(departament);
  }

  async updateDepartament(id: string, name: string) {
    const departament = await this.departamentRepo.findOne(id);
    departament.name = name;
    return await this.departamentRepo.update(id, departament);
  }

  async deleteDepartament(id: string) {
    return await this.departamentRepo.delete(id);
  }
}
