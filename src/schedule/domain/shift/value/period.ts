import { differenceInMinutes, parse } from 'date-fns';

export class Period {
  private readonly startTime: string;
  private readonly endTime: string;
  private readonly breakTime: string;
  constructor(startTime: string, endTime: string, breakTime: string) {
    const start = parse(startTime, 'HH:mm', new Date());
    const end = parse(endTime, 'HH:mm', new Date());

    if (end < start) {
      throw new Error('Конец смены не может быть раньше начало смены');
    }

    this.startTime = startTime;
    this.endTime = endTime;
    this.breakTime = breakTime;
  }

  get start(): string {
    return this.startTime;
  }

  get end(): string {
    return this.endTime;
  }

  get break(): string {
    return this.breakTime;
  }

  get totalHours(): number {
    const start = parse(this.startTime, 'HH:mm', new Date());
    const end = parse(this.endTime, 'HH:mm', new Date());
    const breakDuration = parse(this.breakTime, 'HH:mm', new Date());

    const totalMinutes = differenceInMinutes(end, start);
    const breakInMinutes =
      breakDuration.getHours() * 60 + breakDuration.getMinutes();

    const effectiveMinutes = totalMinutes - breakInMinutes;
    return effectiveMinutes / 60;
  }
}
