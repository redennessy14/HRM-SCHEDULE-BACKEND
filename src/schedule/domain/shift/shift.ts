import { AggregateRoot } from '@nestjs/cqrs';
import { Period } from './value';

export class Shift extends AggregateRoot {
  readonly period: Period;
  readonly rate: string;
  readonly color: string;
  constructor(period: Period, rate: string, color: string) {
    super();
    this.period = period;
    this.rate = rate;
    this.color = color;
  }

  static New(period: Period, rate: string, color: string) {
    return new Shift(period, rate, color);
  }
}
