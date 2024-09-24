import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { SectorService } from 'src/organization/application';

@Injectable()
export class UniqueSectorNamePipe implements PipeTransform {
  constructor(private readonly sectorService: SectorService) {}

  async transform(value: any) {
    const { name, departamentId } = value;

    if (!name || !departamentId) {
      return value;
    }

    const existingSector =
      await this.sectorService.getSectorByDepartamentId(departamentId);

    const isNameTaken = existingSector.some(
      (sector) => sector.name.toLowerCase() === name.toLowerCase(),
    );

    if (isNameTaken) {
      throw new BadRequestException(
        `Сектор с названием ${name} уже существует в этом отделе `,
      );
    }
    return value;
  }
}
