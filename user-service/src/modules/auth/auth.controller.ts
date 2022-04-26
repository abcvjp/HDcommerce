import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req, @Body(new ValidationPipe()) dto: LoginDto) { // eslint-disable-line
    return this.authService.login(req.user);
  }

  @Post('logout')
  async logout(@UserId() userId, @Request() req) {
    return this.authService.logout(userId, req.jwtId);
  }
}
