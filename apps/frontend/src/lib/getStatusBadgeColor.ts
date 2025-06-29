export const getStatusBadgeColor = (statusName: string) => {
	switch (statusName) {
		case 'Scheduled':
			return 'bg-blue-100 text-blue-800';
		case 'Checked-In':
			return 'bg-yellow-100 text-yellow-800';
		case 'In Consultation':
			return 'bg-green-100 text-green-800';
		case 'Cancelled':
			return 'bg-red-100 text-red-800';
		case 'No-Show':
			return 'bg-gray-100 text-gray-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
};
