import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '@app/contracts/providers/entities/provider.entity';
import { ProvidersDao } from './providers.dao';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provider])
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService, ProvidersDao],
})
export class ProvidersModule {}
