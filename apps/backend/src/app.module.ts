import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { ProvidersModule } from './providers/providers.module'
import { PatientsModule } from './patients/patients.module'
import { StatusesModule } from './statuses/statuses.module'
import { HealthModule } from './health/health.module'

@Module({
	imports: [PrismaModule, ProvidersModule, PatientsModule, StatusesModule, HealthModule]
})
export class AppModule {}
