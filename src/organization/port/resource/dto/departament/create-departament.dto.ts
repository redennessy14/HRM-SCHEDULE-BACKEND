import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateDepartamentDTO {
  @ApiProperty({
    description: 'Название департамента',
    example: 'IT',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsUUID()
  projectId: string;
}
