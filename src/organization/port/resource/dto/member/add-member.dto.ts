import { IsUUID, IsEnum, ValidateIf } from 'class-validator';
import { AddMemberDTO as DTO } from 'src/organization/application/dto/member';
import { MemberRole, RelationType } from 'src/organization/domain/member/enum';

export class AddMemberDTO implements DTO {
  @IsUUID()
  profileId: string;

  @IsEnum(MemberRole)
  role: MemberRole;

  @IsEnum(RelationType)
  relation: RelationType;

  @ValidateIf((o) => o.relation === RelationType.PROJECT)
  @IsUUID()
  projectId?: string;

  @ValidateIf((o) => o.relation === RelationType.DEPARTAMENT)
  @IsUUID()
  departamentId?: string;

  @ValidateIf((o) => o.relation === RelationType.SECTOR)
  @IsUUID()
  sectorId?: string;

  @ValidateIf((o) => o.relation === RelationType.TEAM)
  @IsUUID()
  teamId?: string;
}
