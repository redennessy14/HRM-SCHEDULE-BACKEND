import { ShiftService } from 'src/schedule/application/shift.service';
import { CreateShiftDecorator, Shift } from './decorator/shift';
import { Body } from '@nestjs/common';
import { CreateShiftDTO } from './dto/shift';

@Shift()
export class ShiftResource {
  constructor(private application: ShiftService) {}

  @CreateShiftDecorator()
  async createShift(@Body() dto: CreateShiftDTO) {
    return await this.application.createShift(dto);
  }
}
