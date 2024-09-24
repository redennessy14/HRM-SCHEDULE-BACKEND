import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Matches } from 'class-validator';

export class CreateTeamScheduleDTO {
  @ApiProperty({
    description: 'Период в формате YYYY-MM',
    example: '2024-09',
  })
  @IsString()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, {
    message: 'Период должен быть в формате YYYY-MM',
  })
  period: string;

  @IsUUID()
  teamId: string;
}
