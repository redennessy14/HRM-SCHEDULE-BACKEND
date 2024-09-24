import { Body, Param } from '@nestjs/common';

import { ProjectService } from 'src/organization/application';
import {
  Project,
  CreateProjectDecorator,
  GetAllProjectDecorator,
  GetProjectDecorator,
  UpdateProjectDecorator,
  DeleteProjectDecorator,
} from './decorator/project';
import { CreateProjectDTO, UpdateProjectDTO } from './dto/project';

@Project()
export class ProjectResource {
  constructor(private application: ProjectService) {}

  @GetAllProjectDecorator()
  async getAllProjects() {
    return await this.application.getAllProjects();
  }

  @GetProjectDecorator()
  async getProject(@Param('id') id: string) {
    return await this.application.getProject(id);
  }

  @CreateProjectDecorator()
  async createProject(@Body() { name }: CreateProjectDTO) {
    return await this.application.createProject(name);
  }

  @UpdateProjectDecorator()
  async updateProject(
    @Param('id') id: string,
    @Body() { name }: UpdateProjectDTO,
  ) {
    return await this.application.updateProject(id, name);
  }

  @DeleteProjectDecorator()
  async deleteProject(@Param('id') id: string) {
    return await this.application.deleteProject(id);
  }
}
