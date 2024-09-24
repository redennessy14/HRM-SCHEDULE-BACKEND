import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity, TeamScheduleEntity } from 'src/data-access';
import { Repository } from 'typeorm';

@Injectable()
export class TeamScheduleRepository {
  constructor(
    @InjectRepository(TeamScheduleEntity)
    private teamScheduleRepo: Repository<TeamScheduleEntity>,
  ) {}

  async findByTeamId(teamId: string) {
    return await this.teamScheduleRepo.find({
      where: {
        team: {
          id: teamId,
        },
      },
      relations: ['memberSchedules.daySchedules.shifts'],
    });
  }

  async findById(id: string) {
    return await this.teamScheduleRepo.findOne({
      where: { id: id },
      relations: [
        'memberSchedules.daySchedules.shifts',
        'team',
        'memberSchedules.member',
      ],
    });
  }

  async create(period: string, team: TeamEntity) {
    return this.teamScheduleRepo.create({ period, team });
  }

  async save(schedule: TeamScheduleEntity) {
    return await this.teamScheduleRepo.save(schedule);
  }
}
