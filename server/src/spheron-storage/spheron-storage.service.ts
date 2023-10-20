import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SpheronClient, ProtocolEnum } from '@spheron/storage';

@Injectable()
export class SpheronStorageService {
  spheronClient: SpheronClient;

  constructor(private readonly configService: ConfigService) {
    this.spheronClient = new SpheronClient({
      token: this.configService.get<string>('SPHERON_TOKEN'),
    });
  }
  async getUploadToken() {
    const { uploadToken } = await this.spheronClient.createSingleUploadToken({
      name: this.configService.get('SPHERON_BUCKET_NAME'),
      protocol: ProtocolEnum.IPFS,
    });

    return {
      uploadToken,
    };
  }
}
