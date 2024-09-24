import { Body, Param } from '@nestjs/common';
import {
  CreateSectorDecorator,
  GetAllSectorsDecorator,
  GetSectorDecorator,
  Sector,
} from './decorator/sector';
import { CreateSectorDTO } from './dto/sector';
import { SectorService } from 'src/organization/application';

@Sector()
export class SectorResource {
  constructor(private application: SectorService) {}

  @GetAllSectorsDecorator()
  async getAllSectors() {
    return await this.application.getAllSectors();
  }

  @GetSectorDecorator()
  async getSector(@Param('id') id: string) {
    return await this.application.getSector(id);
  }

  @CreateSectorDecorator()
  async createSector(@Body() { name, departamentId }: CreateSectorDTO) {
    return await this.application.createSector(name, departamentId);
  }
}
