import { Body, Controller, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SigninDto } from './dto/signin.dto.js';
import { Public } from '@nestjs/authentication';
import { HttpAdapterHost } from '@nestjs/core';
import type { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}
  @Public()
  @Post('signin')
  async signIn(
    @Body() signinDto: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.signIn(signinDto);

    if (!data.token) {
      return {
        statusCode: data.statusCode,
        message: data.message,
      };
    }

    this.httpAdapterHost.httpAdapter.setCookie(
      res,
      'refreshToken',
      data.token.refreshToken,
      {
        signed: true,
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
    );

    return {
      statusCode: data.statusCode,
      message: data.message,
      accessToken: data.token.accessToken,
    };
  }

  @Post('refresh')
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {

    const refreshToken = req.signedCookies?.refreshToken;
    const userName = req.user.userName;
    console.log('refreshToken: ' + refreshToken);
    console.log('user:', userName);
    const token = await this.authService.refreshTokens(userName, refreshToken);

    this.httpAdapterHost.httpAdapter.setCookie(
       res,
       'refreshToken',
       token.refreshToken,
       {
         signed: true,
         httpOnly: true,
         secure: true,
         maxAge: 7 * 24 * 60 * 60 * 1000,
       },
     );

    return {
      statusCode: "201",
      message: "Cap nhap thanh cong",
      accessToken: token.accessToken,
    };
  }
}
