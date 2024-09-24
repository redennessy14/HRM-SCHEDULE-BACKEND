import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateTeamDTO {
  @ApiProperty({
    description: 'Название команды',
    example: 'Node Js Backend',
  })
  @IsString()
  name: string;
}
