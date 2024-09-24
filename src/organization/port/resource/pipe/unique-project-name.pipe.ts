import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ProjectService } from 'src/organization/application';

@Injectable()
export class UniqueProjectNamePipe implements PipeTransform {
  constructor(private readonly projectService: ProjectService) {}

  async transform(value: any) {
    const { name } = value;

    if (!name) {
      return value;
    }

    const allProjects = await this.projectService.getAllProjects();

    const isNameTaken = allProjects.some(
      (project) => project.name.toLowerCase() === name.toLowerCase(),
    );

    if (isNameTaken) {
      throw new BadRequestException(
        `Проект с названием ${name} уже существует .`,
      );
    }
    return value;
  }
}
