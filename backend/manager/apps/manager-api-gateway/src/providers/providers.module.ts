import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { SharedClientModule } from '../shared-client/shared-client.module';
import { PROVIDERS_QUEUE_NAME, PROVIDERS_SERVICE_NAME } from '@app/contracts/providers/providers.constants';

@Module({
  imports: [
    SharedClientModule.register(PROVIDERS_SERVICE_NAME, PROVIDERS_QUEUE_NAME),
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService]
})
export class ProvidersModule {}
