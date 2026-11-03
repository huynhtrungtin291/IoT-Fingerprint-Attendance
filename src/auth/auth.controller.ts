import { Body, Controller, HttpCode, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Public } from '@nestjs/authentication';
import type { CookieOptions, Request, Response } from 'express';

import { AuthService } from './auth.service.js';
import { SigninDto } from './dto/signin.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private getRefreshCookieOptions(): CookieOptions {
    return {
      signed: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
  }

  @Public()
  @Post('signin')
  async signIn(
    @Body() signinDto: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {

    const data = await this.authService.signIn(signinDto);
    res.cookie('refreshToken', data.token.refreshToken, this.getRefreshCookieOptions());

    return {
      statusCode: 200,
      message: 'Đăng nhập thành công',
      accessToken: data.token.accessToken,
    };
  }

  @Public()
  @Post('refresh-accessToken')
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.signedCookies?.refreshToken;

    if (typeof refreshToken !== 'string' || !refreshToken) {
      throw new UnauthorizedException(
        'Refresh token không tồn tại hoặc cookie không hợp lệ',
      );
    }

    const tokens = await this.authService.refreshTokens(refreshToken);

    res.cookie( 'refreshToken', tokens.refreshToken, this.getRefreshCookieOptions() );

    return {
      statusCode: 200,
      message: 'Cấp lại token thành công',
      accessToken: tokens.accessToken,
    };
  }
}
