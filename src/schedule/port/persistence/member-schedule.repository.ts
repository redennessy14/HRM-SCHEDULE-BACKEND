import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MemberEntity,
  MemberScheduleEntity,
  TeamScheduleEntity,
} from 'src/data-access';
import { Repository } from 'typeorm';

@Injectable()
export class MemberScheduleRepository {
  constructor(
    @InjectRepository(MemberScheduleEntity)
    private memberScheduleRepo: Repository<MemberScheduleEntity>,
  ) {}

  async findAll() {
    return await this.memberScheduleRepo.find({
      relations: ['member', 'teamSchedule', 'daySchedules.shifts'],
    });
  }

  async findById(id: string) {
    return await this.memberScheduleRepo.findOne({ where: { id: id } });
  }

  async create(member: MemberEntity, teamSchedule: TeamScheduleEntity) {
    return this.memberScheduleRepo.create({ member, teamSchedule });
  }

  async save(memberSchedule: MemberScheduleEntity) {
    return await this.memberScheduleRepo.save(memberSchedule);
  }
}
