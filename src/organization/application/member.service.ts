import { Inject, Injectable } from '@nestjs/common';
import { MemberRepository } from '../port/persistence/member.repository';
import { AddMemberDTO } from './dto/member';
import { TeamRepository } from '../port/persistence/team.repository';
import { DepartamentRepository } from '../port/persistence/departament.repository';
import { RelationType } from '../domain/member/enum';
import { SectorRepository } from '../port/persistence/sector.repository';
import { ProjectRepository } from '../port/persistence/project.repository';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Member } from '../domain/member';
import { randomUUID } from 'crypto';
import { ProjectService } from './project.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MemberService {
  constructor(
    private memberRepo: MemberRepository,
    private departamentRepo: DepartamentRepository,
    private sectorRepo: SectorRepository,
    private teamRepo: TeamRepository,
    private projectService: ProjectService,
  ) {}

  async getById(id: string) {
    const member = await this.memberRepo.findById(id);
    const data = await this.projectService.getProfile(member.profileId);
    return {
      ...member,
      profile: data,
    };
  }

  async getMembersByTeamId(teamId: string) {
    let members = await this.memberRepo.findByTeamId(teamId);
    const membersWithProfile = await Promise.all(
      members.map(async (member) => {
        const data = await this.projectService.getProfile(member.profileId);
        return {
          ...member,
          profile: data,
        };
      }),
    );
    members = membersWithProfile;

    return members;
  }

  async addMember(dto: AddMemberDTO) {
    const {
      profileId,
      role,
      relation,
      teamId,
      departamentId,
      sectorId,
      projectId,
    } = dto;

    const data = await this.projectService.getProfile(profileId);

    const project =
      relation == RelationType.PROJECT
        ? await this.projectService.getProject(projectId)
        : null;
    const departament =
      relation == RelationType.DEPARTAMENT
        ? await this.departamentRepo.findOne(departamentId)
        : null;
    const sector =
      relation == RelationType.SECTOR
        ? await this.sectorRepo.findOne(sectorId)
        : null;
    const team =
      relation == RelationType.TEAM
        ? await this.teamRepo.findOne(teamId)
        : null;

    const member = Member.New(
      profileId,
      role,
      project,
      departament,
      sector,
      team,
    );

    const memberEntity = await this.memberRepo.save(member);

    return { ...memberEntity, profile: data };
  }

  async deleteMember(id: string) {
    return await this.memberRepo.delete(id);
  }
}
