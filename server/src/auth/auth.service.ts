import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User, UserRoles } from '@prisma/client';

import { verifyPersonalMessage } from '@mysten/sui.js/verify';

import { VerifyUserDto } from './dto/verify-user.dto';
import { UsersService } from 'src/users/users.service';

type VerifyTokenPayload = {
  platform: string;
  address: string;
  timestamp: number;
  role: UserRoles;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  generateChallenge(platform: string, address: string, timestamp: number) {
    return `You are signing with ${platform} network with the\taddress ${address} at ${timestamp}`;
  }

  async generateAccessToken(user: User) {
    return await this.jwtService.signAsync({
      id: user.id,
      sui_address: user.sui_address,
      evm_address: user.evm_address,
    });
  }

  async getUserNonce(platform: string, address: string, role?: string) {
    const timestamp = Date.now();
    const challenge = this.generateChallenge(platform, address, timestamp);

    const token = await this.jwtService.signAsync(
      {
        platform,
        address,
        role: role ?? undefined,
        timestamp,
      },
      {
        expiresIn: '15m',
      },
    );

    return { challenge, token };
  }

  async verifyToken({ signature, token }: VerifyUserDto) {
    const { address, platform, timestamp, role } =
      await this.jwtService.verifyAsync<VerifyTokenPayload>(token);

    const challenge = new TextEncoder().encode(
      this.generateChallenge(platform, address, timestamp),
    );

    const signedAddress = await verifyPersonalMessage(challenge, signature);

    if (signedAddress.toSuiAddress().toLowerCase() !== address.toLowerCase()) {
      throw new HttpException('Invalid signature', 400);
    }

    let user = await this.userService.findOneByAddress(platform, address);
    if (!user) {
      user = await this.userService.create({
        sui_address: address,
        role,
      });
    }

    const access_token = await this.generateAccessToken(user);

    return {
      user,
      access_token,
    };
  }
}
