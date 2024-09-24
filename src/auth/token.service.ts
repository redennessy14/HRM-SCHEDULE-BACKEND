import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JWTTokenService {
  constructor(
    private http: HttpService,
    private baseURL: string,
  ) {}
  async verify(jwt: string) {
    const verifed = await this._verify(jwt);

    if (!verifed) {
      throw new UnauthorizedException();
    }

    return verifed.data;
  }

  private _verify = async (jwt: string) =>
    this.http.axiosRef.post(`${this.baseURL}/auth/verify`, { jwt });
}
