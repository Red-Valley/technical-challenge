import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

export interface HealthStatus {
	status: 'healthy' | 'unhealthy' | 'degraded'
	timestamp: string
	uptime: number
	version: string
	database: {
		status: 'connected' | 'disconnected' | 'error'
		responseTime?: number
		error?: string
	}
	services: {
		api: {
			status: 'running' | 'stopped'
			pid: number
		}
	}
	memory: {
		used: number
		total: number
		percentage: number
	}
}

@Injectable()
export class HealthService {
	private readonly logger = new Logger(HealthService.name)
	private readonly startTime = Date.now()

	constructor(private readonly prisma: PrismaService) {}

	async checkHealth(): Promise<HealthStatus> {
		const timestamp = new Date().toISOString()
		const uptime = Math.floor((Date.now() - this.startTime) / 1000)

		// Verificar estado de la base de datos
		const databaseStatus = await this.checkDatabase()

		// Información de memoria
		const memoryUsage = process.memoryUsage()
		const memory = {
			used: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
			total: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
			percentage: Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100)
		}

		// Determinar estado general
		let overallStatus: 'healthy' | 'unhealthy' | 'degraded' = 'healthy'
		if (databaseStatus.status === 'disconnected' || databaseStatus.status === 'error') {
			overallStatus = 'unhealthy'
		} else if (memory.percentage > 90) {
			overallStatus = 'degraded'
		}

		const healthStatus: HealthStatus = {
			status: overallStatus,
			timestamp,
			uptime,
			version: process.env.npm_package_version || '1.0.0',
			database: databaseStatus,
			services: {
				api: {
					status: 'running',
					pid: process.pid
				}
			},
			memory
		}

		// Log si el estado no es saludable
		if (overallStatus !== 'healthy') {
			this.logger.warn(`Health check failed: ${JSON.stringify(healthStatus)}`)
		}

		return healthStatus
	}

	private async checkDatabase(): Promise<HealthStatus['database']> {
		const startTime = Date.now()

		try {
			// Realizar una consulta simple para verificar la conexión
			await this.prisma.$queryRaw`SELECT 1`

			const responseTime = Date.now() - startTime

			return {
				status: 'connected',
				responseTime
			}
		} catch (error) {
			this.logger.error('Database health check failed:', error)

			return {
				status: 'error',
				responseTime: Date.now() - startTime,
				error: error instanceof Error ? error.message : 'Unknown database error'
			}
		}
	}

	async checkDatabaseConnection(): Promise<boolean> {
		try {
			await this.prisma.$queryRaw`SELECT 1`
			return true
		} catch (error) {
			this.logger.error('Database connection failed:', error)
			return false
		}
	}

	async getSimpleStatus(): Promise<{ status: string; timestamp: string }> {
		const isDbConnected = await this.checkDatabaseConnection()

		return {
			status: isDbConnected ? 'OK' : 'ERROR',
			timestamp: new Date().toISOString()
		}
	}
}
