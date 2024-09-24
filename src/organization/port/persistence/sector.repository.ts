import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentEntity, SectorEntity } from 'src/data-access';
import { Repository } from 'typeorm';

@Injectable()
export class SectorRepository {
  constructor(
    @InjectRepository(SectorEntity)
    private sectorRepo: Repository<SectorEntity>,
  ) {}

  async findAll() {
    return await this.sectorRepo.find();
  }

  async findByDepartamentId(departamentId: string) {
    return await this.sectorRepo.find({
      where: { departament: { id: departamentId } },
      relations: ['departament'],
    });
  }

  async findOne(id: string) {
    return await this.sectorRepo.findOne({
      where: { id },
      relations: ['teams.members', 'members', 'departament.project'],
    });
  }

  async create(name: string, departament: DepartamentEntity) {
    return this.sectorRepo.create({ name, departament });
  }

  async save(sector: SectorEntity) {
    return await this.sectorRepo.save(sector);
  }
}
