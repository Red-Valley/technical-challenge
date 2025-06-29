export interface Status {
	id: string; // UUID
	name: string;
	parent_id?: string; // UUID (FK)
	order: number;
}
