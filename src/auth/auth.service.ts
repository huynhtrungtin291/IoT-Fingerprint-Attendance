import { Injectable, Delete } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service.js';
import { SigninDto } from '../auth/dto/signin.dto.js'
import { UserRole } from '../common/enum/user.enum.js';
import { Types } from 'mongoose';

interface JwtPayload {
  _id: string;
  fullName: string;
  userName: string;
  role: UserRole;
  studentCode?: string;
  classId?: Types.ObjectId;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signinDto: SigninDto) {
    console.log('userDto' + signinDto.userName);
    const user: any = await this.usersService.findUserByUserNameWithPassword(
      signinDto.userName,
    );
    console.log('User: '+ user)
    if (!user) {
      return {
        statusCode: '409',
        message: 'Người dùng không tồn tại',
      };
    }

    const isPasswordValid = await this.usersService.checkPassword_RefreshToken(
      signinDto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      return {
        statusCode: '400',
        message: 'Mật khẩu không chính xác',
      };
    }
    delete user.passwordHash;

    const token: TokenResponse = await this.generateTokens(user);
    return {
      statusCode: '200',
      message: 'Đăng nhập thành công',
      token: token,
    };
  }

  async generateTokens(user: any): Promise<TokenResponse> {
    const payload: JwtPayload = {
      _id: user._id.toString(),
      fullName: user.fullName,
      role: user.role,
      userName: user.userName,
      
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '1h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    await this.usersService.updateRefreshToken(
      user._id.toString(),
      refreshToken,
    );

    return { accessToken, refreshToken };
  }

  async refreshTokens(userName: string, refreshToken: string): Promise<object> {
    const user: any = await this.usersService.finUserByUserNameWithRefreshToken(userName);
    
    if (!user || !user.refreshToken ) {
      return {
        statusCode: '404',
        message: 'Người dùng không tồn tại hoặc chưa có refresh token',
      };
    }

    const isValid: boolean = await this.usersService.checkPassword_RefreshToken(
      refreshToken,
      user.refreshToken
    );
    if (!isValid) {
      return {
        statusCode: '401',
        message: 'RefreshToken không hợp lệ hoặc không đúng',
      };
    }

    const { refreshToken: _refreshToken, ...userWithoutRefreshToken } = user.toObject();


    return await this.generateTokens(userWithoutRefreshToken);
  }
}
