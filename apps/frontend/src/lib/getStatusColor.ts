export const getStatusColor = (
	statusName: string,
	variant: 'bg' | 'text' | 'border' | 'accent' | 'full' = 'full'
) => {
	const colorMap = {
		scheduled: {
			bg: 'bg-blue-50',
			text: 'text-blue-700',
			border: 'border-blue-200',
			accent: 'bg-blue-500'
		},
		'checked-in': {
			bg: 'bg-yellow-50',
			text: 'text-yellow-700',
			border: 'border-yellow-200',
			accent: 'bg-yellow-500'
		},
		'in consultation': {
			bg: 'bg-green-50',
			text: 'text-green-700',
			border: 'border-green-200',
			accent: 'bg-green-500'
		},
		cancelled: {
			bg: 'bg-red-50',
			text: 'text-red-700',
			border: 'border-red-200',
			accent: 'bg-red-500'
		},
		'no-show': {
			bg: 'bg-gray-50',
			text: 'text-gray-700',
			border: 'border-gray-200',
			accent: 'bg-gray-500'
		}
	};

	const normalizedName = statusName.toLowerCase();
	const colors = colorMap[normalizedName as keyof typeof colorMap] || colorMap.scheduled;

	if (variant === 'full') {
		return `${colors.border} ${colors.bg} ${colors.text}`;
	}

	return colors[variant];
};
