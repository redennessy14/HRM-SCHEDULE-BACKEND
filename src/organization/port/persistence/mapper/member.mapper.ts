import { MemberEntity } from 'src/data-access';
import { Member } from 'src/organization/domain/member';

export class MemberMapper {
  static toPersistence(member: Member): MemberEntity {
    const memberEntity = new MemberEntity();
    memberEntity.profileId = member.profileId;
    memberEntity.role = member.role;
    memberEntity.project = member.project;
    memberEntity.departament = member.departament;
    memberEntity.sector = member.sector;
    memberEntity.team = member.team;
    return memberEntity;
  }
}
