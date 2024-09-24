import { DayScheduleService } from 'src/schedule/application/day-schedule.service';
import { DaySchedule } from './decorator/day-schedule';

@DaySchedule()
export class DayScheduleResource {
  constructor(private application: DayScheduleService) {}

  //   @CreateDayScheduleDecorator()
  //   async createDaySchedule() {
  //     return await this.application.createDaySchedule();
  //   }
}
