import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User, UserRoles } from '@prisma/client';

import { verifyPersonalMessage } from '@mysten/sui.js/verify';
import { verifyMessage } from 'viem';

import { VerifyUserDto } from './dto/verify-user.dto';
import { UsersService } from 'src/users/users.service';
import { PublicKey } from '@mysten/sui.js/dist/cjs/cryptography';

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
    return `You are signing on ${platform} network with the\taddress ${address} at ${timestamp}`;
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

    const message = this.generateChallenge(platform, address, timestamp);

    let signedAddress: string | PublicKey;

    if (platform === 'evm') {
      if (
        !verifyMessage({
          address: address as `0x${string}`,
          message,
          signature: signature as `0x${string}`,
        })
      )
        throw new HttpException('Invalid signature', 400);
      signedAddress = address;
    } else if (platform === 'sui') {
      const challenge = new TextEncoder().encode(message);
      signedAddress = await verifyPersonalMessage(challenge, signature);
      if (
        signedAddress.toSuiAddress().toLowerCase() !== address.toLowerCase()
      ) {
        throw new HttpException('Invalid signature', 400);
      }
    }

    let user = await this.userService.findOneByAddress(platform, address);
    if (!user) {
      user = await this.userService.create({
        sui_address: address,
        evm_address: address,
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
