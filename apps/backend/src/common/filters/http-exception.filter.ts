import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
	Logger
} from '@nestjs/common'
import { Request, Response } from 'express'
import { ApiErrorResponse } from '../interfaces/api-response.interface'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(GlobalExceptionFilter.name)

	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()

		let status: number
		let message: string | string[]
		let error: string

		// Manejar excepciones HTTP específicas de NestJS
		if (exception instanceof HttpException) {
			status = exception.getStatus()
			const exceptionResponse = exception.getResponse()

			if (typeof exceptionResponse === 'string') {
				message = exceptionResponse
				error = exception.name
			} else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
				const responseObj = exceptionResponse as any
				message = responseObj.message || exception.message
				error = responseObj.error || exception.name
			} else {
				message = exception.message
				error = exception.name
			}
		}
		// Manejar errores de Prisma
		else if (this.isPrismaError(exception)) {
			const prismaError = this.handlePrismaError(exception as any)
			status = prismaError.status
			message = prismaError.message
			error = prismaError.error
		}
		// Manejar errores de validación
		else if (this.isValidationError(exception)) {
			status = HttpStatus.BAD_REQUEST
			message = this.extractValidationMessages(exception as any)
			error = 'Validation Error'
		}
		// Manejar otros errores no esperados
		else {
			status = HttpStatus.INTERNAL_SERVER_ERROR
			message = 'Internal server error'
			error = 'Internal Server Error'

			// Log del error completo para debugging
			this.logger.error(
				`Unhandled exception: ${exception}`,
				exception instanceof Error ? exception.stack : 'No stack trace available'
			)
		}

		// Crear la respuesta de error formateada
		const errorResponse: ApiErrorResponse = {
			statusCode: status,
			message,
			error,
			timestamp: new Date().toISOString(),
			path: request.url
		}

		// Log del error (excepto para errores 4xx que son errores del cliente)
		if (status >= 500) {
			this.logger.error(
				`HTTP ${status} Error: ${JSON.stringify(errorResponse)}`,
				exception instanceof Error ? exception.stack : undefined
			)
		} else if (status >= 400) {
			this.logger.warn(`HTTP ${status} Error: ${JSON.stringify(errorResponse)}`)
		}

		response.status(status).json(errorResponse)
	}

	/**
	 * Verifica si el error es de Prisma
	 */
	private isPrismaError(exception: unknown): boolean {
		return (
			exception &&
			typeof exception === 'object' &&
			'code' in exception &&
			'clientVersion' in exception
		)
	}

	/**
	 * Maneja errores específicos de Prisma
	 */
	private handlePrismaError(error: any): { status: number; message: string; error: string } {
		switch (error.code) {
			case 'P2002':
				return {
					status: HttpStatus.CONFLICT,
					message: 'A record with this data already exists',
					error: 'Duplicate Entry'
				}
			case 'P2025':
				return {
					status: HttpStatus.NOT_FOUND,
					message: 'Record not found',
					error: 'Not Found'
				}
			case 'P2003':
				return {
					status: HttpStatus.BAD_REQUEST,
					message: 'Foreign key constraint failed',
					error: 'Constraint Violation'
				}
			case 'P2014':
				return {
					status: HttpStatus.BAD_REQUEST,
					message: 'The change would violate a required relation',
					error: 'Relation Violation'
				}
			default:
				return {
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					message: 'Database error occurred',
					error: 'Database Error'
				}
		}
	}

	/**
	 * Verifica si el error es de validación
	 */
	private isValidationError(exception: unknown): boolean {
		return (
			exception &&
			typeof exception === 'object' &&
			'response' in exception &&
			typeof (exception as any).response === 'object' &&
			'message' in (exception as any).response &&
			Array.isArray((exception as any).response.message)
		)
	}

	/**
	 * Extrae mensajes de errores de validación
	 */
	private extractValidationMessages(error: any): string[] {
		if (error.response && Array.isArray(error.response.message)) {
			return error.response.message
		}
		return [error.message || 'Validation failed']
	}
}
