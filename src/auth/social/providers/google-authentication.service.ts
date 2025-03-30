import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import jwtConfig from 'src/auth/config/jwt.config';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokenProvider } from 'src/auth/providers/generate-token.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    private readonly generateTokenProvider: GenerateTokenProvider,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });

      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload()!;

      const user = await this.usersService.findOneByGoogleId(googleId);

      if (user) return this.generateTokenProvider.generateTokens(user);

      const googleUser = await this.usersService.createGoogleUser({
        email: email!,
        firstName: firstName!,
        lastName: lastName!,
        googleId,
      });

      return await this.generateTokenProvider.generateTokens(googleUser);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
