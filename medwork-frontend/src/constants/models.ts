// Interfaces for the Medwork system entities based on the database schema

export interface Patient {
    id: string; // UUID
    fullName: string;
    email: string;
    phone: string;
    providerId: string | null; // UUID (FK to providers) - nullable
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
  