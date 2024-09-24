import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateTeamDTO {
  @ApiProperty({
    description: 'Название команды',
    example: 'Node Js Backend',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @ValidateIf((o) => !o.sectorId)
  @IsUUID()
  @IsOptional()
  departamentId?: string;

  @ValidateIf((o) => !o.departamentId)
  @IsUUID()
  @IsOptional()
  sectorId?: string;
}
