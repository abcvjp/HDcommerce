import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GatewayService } from 'src/clients/gateway/gateway.service';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { UserService } from 'src/modules/user/user.service';
import { comparePassword } from 'src/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly gatewayService: GatewayService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.userService.findByEmail(email);
    if (await comparePassword(password, user.passwordHash)) {
      return user;
    }
    return null;
  }

  async login(user: IUser) {
    const { _id, email, role } = user;
    const { key } = await this.gatewayService.createConsumerJWT(_id);
    console.log(key);
    const payload = { _id, email, role, iss: key };
    return {
      accessToken: this.jwtService.sign(payload, {
        privateKey: key,
      }),
    };
  }
}
