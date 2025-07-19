// Interfaces for the Medwork system entities based on the database schema

export interface Patient {
    id: string; // UUID
    fullName: string;
    email: string;
    phone: string;
    providerId: string; // UUID (FK to providers)
    statusId: string; // UUID (FK to statuses)
    createdAt: Date;
    // Optional relations for API responses
    provider?: Provider;
    status?: Status;
    statusHistory?: StatusHistory[];
  }
  
  export interface Provider {
    id: string; // UUID
    fullName: string;
    specialty: string;
    createdAt: Date;
    // Optional relations for API responses
    patients?: Patient[];
  }
  
  export interface Status {
    id: string; // UUID
    name: string;
    parentId?: string; // UUID (nullable, FK to statuses)
    order: number;
    createdAt?: Date;
    // Optional relations for API responses
    parent?: Status;
    children?: Status[];
  }
  
  export interface StatusHistory {
    id: string; // UUID
    patientId: string; // UUID (FK to patients)
    statusId: string; // UUID (FK to statuses)
    changedAt: Date;
    // Optional relations for API responses
    patient?: Patient;
    status?: Status;
  }
  
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
  
  // API Response types
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }  