import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service.js';
import { SigninDto } from './dto/signin.dto.js';
import { UserRole } from '../common/enum/user.enum.js';

interface JwtPayload {
  _id: string;
  fullName: string;
  userName: string;
  role: UserRole;
  studentCode?: string;
  classId?: string;
}

interface TokenUser {
  _id: { toString(): string };
  fullName: string;
  userName: string;
  role: UserRole;
  studentCode?: string;
  classId?: { toString(): string } | null;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!accessSecret || !refreshSecret) {
      throw new Error('Thiếu JWT_ACCESS_SECRET hoặc JWT_REFRESH_SECRET');
    }

    this.accessSecret = accessSecret;
    this.refreshSecret = refreshSecret;
  }

  async signIn(dto: SigninDto) {
    const user = await this.usersService.findUserByUserNameWithPassword( dto.userName);

    if (!user) {
      throw new UnauthorizedException('Tài khoản hoặc mật khẩu không đúng');
    }

    const isPasswordValid = await this.usersService.checkPassword_RefreshToken(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Tài khoản hoặc mật khẩu không đúng');
    }

    const tokens = await this.generateTokens(user);

    return {
      statusCode: 200,
      message: 'Đăng nhập thành công',
      token: tokens,
    };
  }

  async generateTokens(user: TokenUser): Promise<TokenResponse> {
    const payload: JwtPayload = {
      _id: user._id.toString(),
      fullName: user.fullName,
      userName: user.userName,
      role: user.role,
    };

    if (user.studentCode) {
      payload.studentCode = user.studentCode;
    }

    if (user.classId) {
      payload.classId = user.classId.toString();
    }

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.accessSecret,
      expiresIn: '1h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.refreshSecret,
      expiresIn: '7d',
      // Giúp mỗi refresh token có giá trị riêng.
      jwtid: crypto.randomUUID(),
    });

    await this.usersService.updateRefreshToken(
      user._id.toString(),
      refreshToken,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string): Promise<TokenResponse> {
    let payload: JwtPayload;

    // Kiểm tra chữ ký và hạn dùng.
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.refreshSecret,
      });
    } catch {
      throw new UnauthorizedException(
        'Refresh token không hợp lệ hoặc đã hết hạn',
      );
    }

    if (
      typeof payload._id !== 'string' ||
      typeof payload.userName !== 'string'
    ) {
      throw new UnauthorizedException('Refresh token không hợp lệ');
    }

    const user = await this.usersService.finUserByUserNameWithRefreshToken(
      payload.userName,
    );

    if (!user || !user.refreshToken || user._id.toString() !== payload._id) {
      throw new UnauthorizedException('Phiên đăng nhập không hợp lệ');
    }

    // Kiểm tra token có khớp với hash đang lưu trong database.
    const isValid = await this.usersService.checkPassword_RefreshToken(
      refreshToken,
      user.refreshToken,
    );

    if (!isValid) {
      throw new UnauthorizedException(
        'Refresh token không hợp lệ hoặc đã bị thu hồi',
      );
    }

    // Cấp cặp token mới và thay hash refresh token trong database.
    return this.generateTokens(user);
  }
}
