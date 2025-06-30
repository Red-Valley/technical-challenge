import { Status } from 'src/models';

export const organizeStatuses = (statuses: Status[]) => {
	return statuses
		.filter(s => !s.parent_id)
		.sort((a, b) => a.order - b.order)
		.flatMap(parent => [
			parent,
			...statuses.filter(s => s.parent_id === parent.id).sort((a, b) => a.order - b.order)
		]);
};

export const isStatusProgression = (fromStatus: string, toStatus: string) => {
	const progression = ['Scheduled', 'Checked-In', 'In Consultation'];
	const fromIndex = progression.indexOf(fromStatus);
	const toIndex = progression.indexOf(toStatus);
	return fromIndex !== -1 && toIndex !== -1 && toIndex === fromIndex + 1;
};

// Función para obtener transiciones válidas basadas en la jerarquía
export const getValidTransitions = (currentStatus: Status, allStatuses: Status[]): Status[] => {
	const validTransitions: Status[] = [];

	// 1. Estados hijos del status actual
	const children = allStatuses.filter(s => s.parent_id === currentStatus.id);
	validTransitions.push(...children);

	// 2. Estados hermanos (mismo padre)
	if (currentStatus.parent_id) {
		const siblings = allStatuses.filter(
			s => s.parent_id === currentStatus.parent_id && s.id !== currentStatus.id
		);
		validTransitions.push(...siblings);
	}

	// 3. Estados padre (permitir retroceder en la jerarquía)
	if (currentStatus.parent_id) {
		const parent = allStatuses.find(s => s.id === currentStatus.parent_id);
		if (parent) {
			validTransitions.push(parent);
		}
	}

	// 4. Estados raíz (si el status actual no es raíz)
	if (currentStatus.parent_id) {
		const rootStatuses = allStatuses.filter(s => !s.parent_id);
		validTransitions.push(...rootStatuses);
	}

	// Remover duplicados
	return validTransitions.filter(
		(status, index, self) => index === self.findIndex(s => s.id === status.id)
	);
};

// Función para validar si una transición es válida
export const isValidTransition = (
	fromStatus: Status,
	toStatus: Status,
	allStatuses: Status[]
): boolean => {
	const validTransitions = getValidTransitions(fromStatus, allStatuses);
	return validTransitions.some(status => status.id === toStatus.id);
};

// Función para obtener el nivel de un status en la jerarquía
export const getStatusLevel = (status: Status, allStatuses: Status[]): number => {
	let level = 0;
	let currentStatus: Status | undefined = status;

	while (currentStatus?.parent_id) {
		level++;
		currentStatus = allStatuses.find(s => s.id === currentStatus.parent_id);
	}

	return level;
};

// Función para obtener la ruta completa de un status
export const getStatusPath = (status: Status, allStatuses: Status[]): Status[] => {
	const path: Status[] = [status];
	let currentStatus: Status | undefined = status;

	while (currentStatus?.parent_id) {
		const parent = allStatuses.find(s => s.id === currentStatus.parent_id);
		if (parent) {
			path.unshift(parent);
			currentStatus = parent;
		} else {
			break;
		}
	}

	return path;
};
