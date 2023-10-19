import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { User, UserRoles } from '@prisma/client';

import { AuthService } from './auth.service';

import { VerifyUserDto } from './dto/verify-user.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Public } from 'src/common/decorators/public-api.decorator';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/nonce')
  @Public()
  @ApiQuery({ name: 'platform', enum: ['sui', 'evm'] })
  @ApiQuery({ name: 'address' })
  @ApiQuery({ name: 'role', enum: UserRoles, required: false })
  @ApiResponse({
    status: 200,
    description: 'Returns json with challenge and token',
    schema: {
      example: {
        challenge:
          'You are signing with sui network with the\taddress 1231231 at 1697544277288',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybSI6InN1aSIsImFkZHJlc3MiOiIxMjMxMjMxIiwidGltZXN0YW1wIjoxNjk3NTQ0Mjc3Mjg4LCJpYXQiOjE2OTc1NDQyNzcsImV4cCI6MTY5NzU0NTE334330.1jKY23_9vWb6hn-gJdnL-yilk77DZKW3GEpmLodCWAI',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  async getNonce(
    @Query('platform') platform: string,
    @Query('address') address: string,
    @Query('role') role?: UserRoles,
  ) {
    return this.authService.getUserNonce(platform, address, role);
  }

  @Post('/verify')
  @Public()
  @ApiBody({
    description: 'Verify the user after signing the challenge',
    schema: {
      example: {
        signature:
          'ADXB2p/6Vy7y6um+Do/94MP+TWbcSS6l/T4BcrAtN92ddRxgIEDyjzskGzqrpXGYZsFw31I6kHXDrZ+eZY2eoA98ovXHM8PpgUIa0KwiXCJpyhs1anQes3a3BmUXtkwKsA==',
        token:
          'eyJwbGF0Zm9ybSI6InN1aSIsImFkZHJlc3MiOiIxMjMxMjMxIiwidGltZXN0YW1wIjoxNjk3NTQ0Mjc3Mjg4LCJpYXQiOjE2OTc',
      },
    },
  })
  @ApiOkResponse({
    description: 'Returns json with user object and token',
    schema: {
      example: {
        user: {} as User,
        token:
          'eyJwbGF0Zm9ybSI6InN1aSIsImFkZHJlc3MiOiIxMjMxMjMxIiwidGltZXN0YW1wIjoxNjk3NTQ0Mjc3Mjg4LCJpYXQiOjE2OTc',
      },
    },
  })
  async verifyToken(@Body() body: VerifyUserDto) {
    return this.authService.verifyToken(body);
  }

  @Get('check')
  @ApiBearerAuth()
  async checkAuth(@Req() req) {
    return req.user;
  }

  @Get('current-user')
  @ApiBearerAuth()
  async getCurrentUser(@CurrentUser() user: User) {
    return user;
  }
}
