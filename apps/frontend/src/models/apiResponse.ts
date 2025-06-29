export interface ApiResponse<T> {
	message: string;
	data: T;
	count?: number;
}
