import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentEntity, SectorEntity, TeamEntity } from 'src/data-access';
import { Repository } from 'typeorm';

@Injectable()
export class TeamRepository {
  constructor(
    @InjectRepository(TeamEntity)
    private teamRepo: Repository<TeamEntity>,
  ) {}

  async findAll() {}

  async findOne(id: string) {
    return await this.teamRepo.findOne({
      where: { id: id },
      relations: [
        'members',
        'sector.departament.project',
        'departament.project',
        'teamSchedules',
      ],
    });
  }

  async findByDepartamentId(departamentId: string) {
    return await this.teamRepo.find({
      where: { departament: { id: departamentId } },
      relations: ['members'],
    });
  }

  async findBySectorId(sectorId: string) {
    return await this.teamRepo.find({
      where: { sector: { id: sectorId } },
    });
  }

  async create(
    name: string,
    departament?: DepartamentEntity,
    sector?: SectorEntity,
  ) {
    const team = new TeamEntity();
    team.name = name;
    if (departament) {
      team.departament = departament;
    }
    if (sector) {
      team.sector = sector;
    }
    return team;
  }

  async save(team: TeamEntity) {
    return await this.teamRepo.save(team);
  }

  async update(id: string, team: TeamEntity) {
    await this.teamRepo.update(id, team);
    return this.findOne(id);
  }

  async delete(id: string) {
    await this.teamRepo.delete(id);
    return true;
  }
}
