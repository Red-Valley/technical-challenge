export interface Patient {
  id: string
  full_name: string
  email: string
  phone: string
  provider_id?: string
  status_id?: string
  created_at: string
  provider?: Provider
  status?: Status
}

export interface Provider {
  id: string
  full_name: string
  specialty: string
  created_at: string
}

export interface Status {
  id: string
  name: string
  parent_id?: string
  order: number
  created_at: string
  parent?: Status
  children?: Status[]
}

export interface StatusHistory {
  id: string
  patient_id: string
  status_id: string
  changed_at: string
  status?: Status
}

export interface CreatePatientDto {
  full_name: string
  email: string
  phone: string
  provider_id?: string
  status_id?: string
}

export interface UpdatePatientDto extends Partial<CreatePatientDto> {}

export interface UpdatePatientStatusDto {
  status_id: string
}

export interface CreateProviderDto {
  full_name: string
  specialty: string
}

export interface UpdateProviderDto extends Partial<CreateProviderDto> {}

export interface CreateStatusDto {
  name: string
  parent_id?: string
  order: number
}

export interface UpdateStatusDto extends Partial<CreateStatusDto> {} 