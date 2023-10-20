import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { SpheronStorageService } from './spheron-storage.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Public } from 'src/common/decorators/public-api.decorator';

@Controller('spheron-storage')
@ApiTags('Spheron Storage')
export class SpheronStorageController {
  constructor(private readonly spheronStorageService: SpheronStorageService) {}
  @Get()
  // @Public()
  @ApiOkResponse({
    schema: {
      example: {
        uploadToken: 'string',
      },
    },
  })
  getUploadToken() {
    return this.spheronStorageService.getUploadToken();
  }
}
