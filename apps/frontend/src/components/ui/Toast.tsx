import React from 'react';

interface ToastProps {
	show: boolean;
	message: string;
	type?: 'success' | 'error' | 'warning' | 'info';
	onClose: () => void;
	duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
	show,
	message,
	type = 'success',
	onClose,
	duration = 4000
}) => {
	React.useEffect(() => {
		if (show && duration > 0) {
			const timer = setTimeout(() => {
				onClose();
			}, duration);
			return () => clearTimeout(timer);
		}
	}, [show, duration, onClose]);

	if (!show) return null;

	const getToastStyles = () => {
		switch (type) {
			case 'success':
				return {
					bg: 'bg-green-100',
					icon: 'text-green-600',
					iconBg: 'bg-green-100',
					iconSvg: (
						<svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					)
				};
			case 'error':
				return {
					bg: 'bg-red-100',
					icon: 'text-red-600',
					iconBg: 'bg-red-100',
					iconSvg: (
						<svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
								clipRule="evenodd"
							/>
						</svg>
					)
				};
			case 'warning':
				return {
					bg: 'bg-yellow-100',
					icon: 'text-yellow-600',
					iconBg: 'bg-yellow-100',
					iconSvg: (
						<svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
								clipRule="evenodd"
							/>
						</svg>
					)
				};
			default:
				return {
					bg: 'bg-blue-100',
					icon: 'text-blue-600',
					iconBg: 'bg-blue-100',
					iconSvg: (
						<svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clipRule="evenodd"
							/>
						</svg>
					)
				};
		}
	};

	const styles = getToastStyles();

	return (
		<div className="fixed right-4 bottom-4 z-50">
			<div
				className={`animate-in slide-in-from-bottom-2 max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-xl duration-300 ${styles.bg}`}
			>
				<div className="flex items-start space-x-3">
					<div className="flex-shrink-0">
						<div
							className={`flex h-8 w-8 items-center justify-center rounded-full ${styles.iconBg}`}
						>
							{styles.iconSvg}
						</div>
					</div>
					<div className="flex-1">
						<p className="text-sm font-medium text-gray-900">
							{type === 'success'
								? 'Success'
								: type === 'error'
									? 'Error'
									: type === 'warning'
										? 'Warning'
										: 'Info'}
						</p>
						<p className="mt-1 text-sm text-gray-500">{message}</p>
					</div>
					<button
						onClick={onClose}
						className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
					>
						<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};
