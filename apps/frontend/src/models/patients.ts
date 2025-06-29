import { ApiResponse, Provider, Status } from './index';

export interface Patient {
	id: string;
	full_name: string;
	email: string;
	phone: string;
	provider_id: string;
	status_id: string;
	created_at: string;
	// Relaciones incluidas en la respuesta del backend
	provider: Provider;
	status: Status;
}

export interface CreatePatientFormData {
	full_name: string;
	email: string;
	phone: string;
	provider_id: string;
}

export interface StatusHistory {
	id: string;
	patient_id: string;
	status_id: string;
	changed_at: string;
	// Relación incluida en la respuesta del backend
	status: Status;
}

// Interfaces para las respuestas de la API
export type PatientApiResponse = ApiResponse<Patient>;
export type PatientsApiResponse = ApiResponse<Patient[]>;
export type StatusHistoryApiResponse = ApiResponse<StatusHistory[]>;
