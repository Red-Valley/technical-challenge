export interface Patient {
	id: string; // UUID
	full_name: string;
	email: string;
	phone: string;
	provider_id: string; // UUID (FK)
	status_id: string; // UUID (FK)
	created_at: string; // datetime
}

export interface CreatePatientFormData {
	full_name: string;
	email: string;
	phone: string;
	provider_id: string;
}
