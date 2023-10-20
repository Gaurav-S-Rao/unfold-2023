import { Controller, Body, Get, Patch, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientSdkService } from './client-sdk.service';
import { UpdateClientSdkDto } from './dto/update-client-sdk.dto';
import { Public } from 'src/common/decorators/public-api.decorator';

@Controller('client-sdk')
@ApiTags('client-sdk')
export class ClientSdkController {
  constructor(private readonly clientSdkService: ClientSdkService) {}

  @Get(':id')
  @Public()
  get(@Param('id') id: string) {
    return this.clientSdkService.findOne(id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() body: UpdateClientSdkDto) {
    return this.clientSdkService.update(id, body);
  }
}
