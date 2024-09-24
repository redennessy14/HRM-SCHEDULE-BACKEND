import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProjectDTO {
  @ApiProperty({
    description: 'Название проекта',
    example: 'DCB 360',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}
