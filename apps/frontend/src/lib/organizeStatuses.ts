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
