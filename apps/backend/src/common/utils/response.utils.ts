import { ApiResponse } from '../interfaces/api-response.interface'

/**
 * Crea una respuesta de éxito estándar
 * @param message - Mensaje descriptivo del resultado
 * @param data - Datos a retornar
 * @param count - Número opcional de elementos (para arrays)
 * @returns Respuesta formateada
 */
export function createSuccessResponse<T>(message: string, data: T, count?: number): ApiResponse<T> {
	const response: ApiResponse<T> = {
		message,
		data
	}

	if (count !== undefined) {
		response.count = count
	}

	return response
}

/**
 * Crea una respuesta de éxito para datos únicos
 * @param message - Mensaje descriptivo del resultado
 * @param data - Datos a retornar
 * @returns Respuesta formateada
 */
export function createDataResponse<T>(message: string, data: T): ApiResponse<T> {
	return createSuccessResponse(message, data)
}

/**
 * Crea una respuesta de creación exitosa
 * @param resourceName - Nombre del recurso creado
 * @param data - Datos del recurso creado
 * @returns Respuesta formateada
 */
export function createCreatedResponse<T>(resourceName: string, data: T): ApiResponse<T> {
	return createDataResponse(`${resourceName} created successfully`, data)
}

/**
 * Crea una respuesta de actualización exitosa
 * @param resourceName - Nombre del recurso actualizado
 * @param data - Datos del recurso actualizado
 * @returns Respuesta formateada
 */
export function createUpdatedResponse<T>(resourceName: string, data: T): ApiResponse<T> {
	return createDataResponse(`${resourceName} updated successfully`, data)
}

/**
 * Crea una respuesta de recuperación exitosa para un recurso único
 * @param resourceName - Nombre del recurso recuperado
 * @param data - Datos del recurso
 * @returns Respuesta formateada
 */
export function createRetrievedResponse<T>(resourceName: string, data: T): ApiResponse<T> {
	return createDataResponse(`${resourceName} retrieved successfully`, data)
}

/**
 * Crea una respuesta de recuperación exitosa para múltiples recursos
 * @param resourceName - Nombre del recurso recuperado (en plural)
 * @param data - Array de datos
 * @returns Respuesta formateada
 */
export function createRetrievedListResponse<T>(resourceName: string, data: T[]): ApiResponse<T[]> {
	return createSuccessResponse(`${resourceName} retrieved successfully`, data, data.length)
}
