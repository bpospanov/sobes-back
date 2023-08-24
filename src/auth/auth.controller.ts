import { Controller, Body, Post, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@ApiTags('Авторизация')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() userDto: CreateUserDto,
  ) {
    const { access_token } = await this.authService.login(userDto);
    res
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      })
      .send({ status: 'ok' });
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res
      .cookie('access_token', '', {
        expires: new Date(Date.now()),
      })
      .send({ status: 'ok' });
  }
}
