import { MemberRole, RelationType } from 'src/organization/domain/member/enum';

export class AddMemberDTO {
  profileId: string;
  role: MemberRole;
  relation: RelationType;
  departamentId?: string;
  sectorId?: string;
  teamId?: string;
  projectId?: string;
}
