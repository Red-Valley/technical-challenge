export const getStatusDescription = (statusName: string) => {
	const descriptions: Record<string, string> = {
		Scheduled: 'Patient has an upcoming appointment',
		'Checked-In': 'Patient has arrived and checked in',
		'In Consultation': 'Patient is currently with the provider',
		Cancelled: 'Appointment has been cancelled',
		'No-Show': 'Patient did not show up for appointment'
	};

	return descriptions[statusName] || 'Status information';
};
