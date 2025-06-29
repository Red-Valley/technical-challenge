import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	async onModuleInit() {
		// Conectar a la base de datos cuando el módulo se inicializa
		await this.$connect()
		console.log('✅ Connected to PostgreSQL database')
	}

	async onModuleDestroy() {
		// Desconectar de la base de datos cuando el módulo se destruye
		await this.$disconnect()
		console.log('❌ Disconnected from PostgreSQL database')
	}
}
