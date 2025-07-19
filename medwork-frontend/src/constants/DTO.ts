// DTOs for API requests
export interface CreatePatientDto {
  fullName: string;
  email: string;
  phone: string;
  providerId: string;
  statusId?: string; // Optional, can be set to default status
}

export interface UpdatePatientDto {
  fullName?: string;
  email?: string;
  phone?: string;
  providerId?: string;
  statusId?: string;
}

export interface CreateProviderDto {
  fullName: string;
  specialty: string;
}

export interface UpdateProviderDto {
  fullName?: string;
  specialty?: string;
}

export interface ChangeStatusDto {
  statusId: string;
}
