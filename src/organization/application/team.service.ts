import { Injectable } from '@nestjs/common';
import { TeamRepository } from '../port/persistence/team.repository';
import { DepartamentRepository } from '../port/persistence/departament.repository';
import { SectorRepository } from '../port/persistence/sector.repository';
import { ProjectService } from './project.service';

@Injectable()
export class TeamService {
  constructor(
    private teamRepo: TeamRepository,
    private departamentRepo: DepartamentRepository,
    private sectorRepo: SectorRepository,
    private projectService: ProjectService,
  ) {}

  async getTeam(id: string) {
    const team = await this.teamRepo.findOne(id);

    const membersWithProfiles = await Promise.all(
      team.members.map(async (member) => {
        const data = await this.projectService.getProfile(member.profileId);
        return {
          ...member,
          profile: data,
        };
      }),
    );

    team.members = membersWithProfiles;

    return team;
  }

  async getTeamsByDepartamentId(departamentId: string) {
    return await this.teamRepo.findByDepartamentId(departamentId);
  }
  async getTeamsBySectorId(sectorId: string) {
    return await this.teamRepo.findBySectorId(sectorId);
  }

  async createTeam(name: string, departamentId?: string, sectorId?: string) {
    let sector = null;
    let departament = null;
    if (sectorId) {
      sector = await this.sectorRepo.findOne(sectorId);
    }
    if (departamentId) {
      departament = await this.departamentRepo.findOne(departamentId);
    }

    const team = await this.teamRepo.create(name, departament, sector);

    return await this.teamRepo.save(team);
  }

  async updateTeam(id: string, name: string) {
    const team = await this.teamRepo.findOne(id);
    team.name = name;
    return await this.teamRepo.update(id, team);
  }

  async deleteTeam(id: string) {
    return await this.teamRepo.delete(id);
  }
}
