import { Inject, Injectable } from '@nestjs/common';
import { ProjectRepository } from '../port/persistence/project.repository';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepo: ProjectRepository,
    @Inject('TCP_PROFILE') private readonly client: ClientProxy,
  ) {}

  async getProject(id: string) {
    const project = await this.projectRepo.findOne(id);

    const membersWithProfiles = await Promise.all(
      project.members.map(async (member) => {
        const data = await this.getProfile(member.profileId);
        return {
          ...member,
          profile: data,
        };
      }),
    );

    project.members = membersWithProfiles;

    return project;
  }

  async getProfile(profileId: string) {
    return await lastValueFrom(
      this.client.send('profile:get_profile', { profileId }),
    );
  }

  async getAllProjects() {
    return await this.projectRepo.findAll();
  }

  async createProject(name: string) {
    return await this.projectRepo.save(name);
  }

  async updateProject(id: string, name: string) {
    return await this.projectRepo.update(id, name);
  }

  async deleteProject(id: string) {
    return await this.projectRepo.delete(id);
  }
}
