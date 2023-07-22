import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { User } from '@prisma/client';
import * as dotenv from 'dotenv';
import type { Profile } from 'passport-google-oauth20';
import { Strategy } from 'passport-google-oauth20';
import { UserService } from 'src/user/user.service';
dotenv.config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    // https://developers.google.com/identity/protocols/oauth2?hl=ko
    // https://hudi.blog/oauth-2.0/
    // I will not save or use provided accessToken and refreshToken in this function
    // because it is used for acessing google service from backend not for accessing backend from client
    // I need to make own accessToken and refreshToken to give it to client, so I don't need to use provided accessToken and refreshToken

    // Only this file has dependency on google-oauth20, thus I can copy this file and easily change it to use other provider
    // Only I need is using other provider and make UserService.findByProviderId function to convert providerId to id in my database
    let user: User | null = await this.userService.findByGoogleId(profile.id);
    if (!user) {
      user = await this.userService.create({
        name: profile.displayName,
        googleId: profile.id,
        photo: profile.photos ? profile.photos[0].value : undefined,
      });
    }
    // save into req.user
    return user;
  }
}
