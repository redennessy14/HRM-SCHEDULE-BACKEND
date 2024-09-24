import { MemberService } from 'src/organization/application';
import {
  AddMemberDecorator,
  DeleteMemberDecorator,
  GetMembersByTeamIdDecorator,
  Member,
} from './decorator/member';
import { Body, Param } from '@nestjs/common';
import { AddMemberDTO } from './dto/member';

@Member()
export class MemberResource {
  constructor(private application: MemberService) {}

  @GetMembersByTeamIdDecorator()
  async getMembersByTeamId(@Param('id') teamId: string) {
    return await this.application.getMembersByTeamId(teamId);
  }

  @AddMemberDecorator()
  async addMember(@Body() dto: AddMemberDTO) {
    return await this.application.addMember(dto);
  }

  @DeleteMemberDecorator()
  async deleteMember(@Param('id') id: string) {
    return await this.application.deleteMember(id);
  }
}
