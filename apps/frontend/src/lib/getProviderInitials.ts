export const getProviderInitials = (fullName: string) => {
	if (!fullName || typeof fullName !== 'string') return '??';

	return fullName
		.split(' ')
		.map(n => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
};
