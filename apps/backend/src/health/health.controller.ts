import { Controller, Get, HttpStatus, HttpCode } from '@nestjs/common'
import { HealthService, HealthStatus } from './health.service'
import { ApiResponse, createDataResponse } from '../common'

@Controller('health')
export class HealthController {
	constructor(private readonly healthService: HealthService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async checkHealth(): Promise<ApiResponse<HealthStatus>> {
		const healthStatus = await this.healthService.checkHealth()

		return {
			message: `System is ${healthStatus.status}`,
			data: healthStatus
		}
	}

	@Get('ready')
	@HttpCode(HttpStatus.OK)
	async checkReadiness(): Promise<ApiResponse<{ ready: boolean; timestamp: string }>> {
		const isDbConnected = await this.healthService.checkDatabaseConnection()

		if (!isDbConnected) {
			return {
				message: 'System is not ready - database connection failed',
				data: {
					ready: false,
					timestamp: new Date().toISOString()
				}
			}
		}

		return createDataResponse('System is ready', {
			ready: true,
			timestamp: new Date().toISOString()
		})
	}

	@Get('live')
	@HttpCode(HttpStatus.OK)
	async checkLiveness(): Promise<
		ApiResponse<{ alive: boolean; timestamp: string; uptime: number }>
	> {
		// Liveness check - verificar que la aplicación esté funcionando
		const uptime = Math.floor(process.uptime())

		return createDataResponse('System is alive', {
			alive: true,
			timestamp: new Date().toISOString(),
			uptime
		})
	}

	@Get('simple')
	@HttpCode(HttpStatus.OK)
	async getSimpleStatus(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
		const status = await this.healthService.getSimpleStatus()
		return createDataResponse('Health status retrieved', status)
	}

	@Get('database')
	@HttpCode(HttpStatus.OK)
	async checkDatabase(): Promise<ApiResponse<{ connected: boolean; timestamp: string }>> {
		const isConnected = await this.healthService.checkDatabaseConnection()

		return createDataResponse('Database status retrieved', {
			connected: isConnected,
			timestamp: new Date().toISOString()
		})
	}
}
