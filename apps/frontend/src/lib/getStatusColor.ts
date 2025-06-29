export const getStatusColor = (statusName: string) => {
	switch (statusName.toLowerCase()) {
		case 'scheduled':
			return 'border-blue-200 bg-blue-50 text-blue-700';
		case 'checked-in':
			return 'border-yellow-200 bg-yellow-50 text-yellow-700';
		case 'in consultation':
			return 'border-green-200 bg-green-50 text-green-700';
		case 'cancelled':
			return 'border-red-200 bg-red-50 text-red-700';
		case 'no-show':
			return 'border-gray-200 bg-gray-50 text-gray-700';
		default:
			return 'border-gray-200 bg-gray-50 text-gray-700';
	}
};
