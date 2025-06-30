export interface Provider {
	id: string;
	full_name: string;
	specialty: string;
	created_at: string;
	_count?: {
		patients: number;
	};
}

export interface CreateProviderFormData {
	full_name: string;
	specialty: string;
}

export interface ProviderApiResponse {
	message: string;
	data: Provider;
}

export interface ProvidersApiResponse {
	message: string;
	data: Provider[];
	count: number;
}
