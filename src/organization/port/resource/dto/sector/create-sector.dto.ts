import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateSectorDTO {
  @ApiProperty({
    description: 'Название сектора',
    example: 'Веб разработка',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsUUID()
  departamentId: string;
}
