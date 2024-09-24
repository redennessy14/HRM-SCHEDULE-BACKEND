import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from 'src/data-access';
import { Member } from 'src/organization/domain/member';
import { Repository } from 'typeorm';
import { MemberMapper } from './mapper';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(MemberEntity)
    private memberRepo: Repository<MemberEntity>,
  ) {}

  async findByTeamId(teamId: string) {
    return await this.memberRepo.find({
      where: {
        team: {
          id: teamId,
        },
      },
    });
  }

  async findById(id: string) {
    return await this.memberRepo.findOne({ where: { id: id } });
  }

  async save(member: Member) {
    const memberEntity = MemberMapper.toPersistence(member);
    return await this.memberRepo.save(memberEntity);
  }

  async delete(id: string) {
    return await this.memberRepo.delete(id);
  }
}
