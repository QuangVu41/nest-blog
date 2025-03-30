import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokenProvider } from './refresh-token.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly signInProvider: SignInProvider,
    private readonly refreshTokenProvider: RefreshTokenProvider,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokenProvider.refreshToken(refreshTokenDto);
  }
}
