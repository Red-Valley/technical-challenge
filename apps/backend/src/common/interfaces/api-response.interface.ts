export interface ApiResponse<T = any> {
	message: string
	data: T
	count?: number
}

export interface ApiErrorResponse {
	statusCode: number
	message: string | string[]
	error: string
	timestamp: string
	path: string
}
