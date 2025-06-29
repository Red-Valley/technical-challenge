import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Global() // Hace que el módulo sea global, disponible en toda la aplicación
@Module({
	providers: [PrismaService],
	exports: [PrismaService]
})
export class PrismaModule {}
