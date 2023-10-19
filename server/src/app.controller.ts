import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiBearerAuth()
  getHello(@Req() req) {
    console.log(req.user);
    return this.appService.getHello();
  }
}
