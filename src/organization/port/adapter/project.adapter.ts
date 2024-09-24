import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectAdapter {
  request(): string {
    return 'request finished';
  }
}
