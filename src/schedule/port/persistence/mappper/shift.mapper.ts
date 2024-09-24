import { DayScheduleEntity, ShiftEntity } from 'src/data-access';
import { Shift } from 'src/schedule/domain/shift';

export class ShiftMapper {
  static toPersistence(
    daySchedule: DayScheduleEntity,
    shift: Shift,
  ): ShiftEntity {
    const shiftEntity = new ShiftEntity();
    shiftEntity.daySchedule = daySchedule;
    shiftEntity.startTime = shift.period.start;
    shiftEntity.endTime = shift.period.end;
    shiftEntity.breakTime = shift.period.break;
    shiftEntity.totalHours = shift.period.totalHours;
    shiftEntity.color = shift.color;
    shiftEntity.rate = shift.rate;
    return shiftEntity;
  }
}
