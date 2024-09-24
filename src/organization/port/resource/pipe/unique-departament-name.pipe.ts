import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { DepartamentService } from 'src/organization/application';

@Injectable()
export class UniqueDepartamentNamePipe implements PipeTransform {
  constructor(private readonly departamentSerive: DepartamentService) {}
  async transform(value: any) {
    const { name, projectId } = value;

    if (!name || !projectId) {
      return value;
    }

    const existingDepartaments =
      await this.departamentSerive.getDepartamentByProjectId(projectId);

    const isNameTaken = existingDepartaments.some(
      (departament) => departament.name.toLowerCase() === name.toLowerCase(),
    );

    if (isNameTaken) {
      throw new BadRequestException(
        `Отдел с названием ${name} уже существует в этом проекте `,
      );
    }
    return value;
  }
}
