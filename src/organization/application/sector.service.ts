import { Injectable } from '@nestjs/common';
import { SectorRepository } from '../port/persistence/sector.repository';
import { DepartamentRepository } from '../port/persistence/departament.repository';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ProjectService } from './project.service';

@Injectable()
export class SectorService {
  constructor(
    private sectorRepo: SectorRepository,
    private departamentRepo: DepartamentRepository,
    private projectService: ProjectService,
  ) {}

  async getAllSectors() {
    return await this.sectorRepo.findAll();
  }

  async getSectorByDepartamentId(departamentId: string) {
    return await this.sectorRepo.findByDepartamentId(departamentId);
  }

  async getSector(id: string) {
    const sector = await this.sectorRepo.findOne(id);

    const membersWithProfiles = await Promise.all(
      sector.members.map(async (member) => {
        const data = await this.projectService.getProfile(member.profileId);
        return {
          ...member,
          profile: data,
        };
      }),
    );
    sector.members = membersWithProfiles;
    return sector;
  }

  async createSector(name: string, departamentId: string) {
    const departament = await this.departamentRepo.findOne(departamentId);

    const sector = await this.sectorRepo.create(name, departament);

    return await this.sectorRepo.save(sector);
  }
}
