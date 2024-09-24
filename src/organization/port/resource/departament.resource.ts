import { DepartamentService } from 'src/organization/application';
import {
  CreateDepartamentDecorator,
  DeleteDepartamentDecorator,
  Departament,
  GetAllDepartamentsDecorator,
  GetDepartamentDecorator,
  UpdateDepartamentDecorator,
} from './decorator/departament';
import { Body, Param } from '@nestjs/common';
import { CreateDepartamentDTO, UpdateDepartamentDto } from './dto/departament';

@Departament()
export class DepartamentResource {
  constructor(private application: DepartamentService) {}

  @GetDepartamentDecorator()
  async getDepartament(@Param('id') id: string) {
    return await this.application.getDepartament(id);
  }

  @GetAllDepartamentsDecorator()
  async getAllDepartament() {
    return await this.application.getAllDepartament();
  }

  @CreateDepartamentDecorator()
  async createDepartament(@Body() { name, projectId }: CreateDepartamentDTO) {
    return await this.application.createDepartament(name, projectId);
  }

  @UpdateDepartamentDecorator()
  async updateDepartament(
    @Param('id') id: string,
    @Body() { name }: UpdateDepartamentDto,
  ) {
    return await this.application.updateDepartament(id, name);
  }

  @DeleteDepartamentDecorator()
  async deleteDepartament(@Param('id') id: string) {
    return await this.application.deleteDepartament(id);
  }
}
