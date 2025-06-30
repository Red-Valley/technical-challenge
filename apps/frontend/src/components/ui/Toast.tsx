'use client';
import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
	message: string;
	type: 'success' | 'error';
	isVisible: boolean;
	onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => {
				onClose();
			}, 4000);

			return () => clearTimeout(timer);
		}
	}, [isVisible, onClose]);

	if (!isVisible) return null;

	const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
	const borderColor = type === 'success' ? 'border-green-200' : 'border-red-200';
	const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
	const iconColor = type === 'success' ? 'text-green-400' : 'text-red-400';
	const Icon = type === 'success' ? CheckCircle : XCircle;

	return (
		<div className="fixed top-4 right-4 z-50">
			<div className={`rounded-md border p-4 ${bgColor} ${borderColor}`}>
				<div className="flex">
					<div className="flex-shrink-0">
						<Icon className={`h-5 w-5 ${iconColor}`} />
					</div>
					<div className="ml-3">
						<p className={`text-sm font-medium ${textColor}`}>{message}</p>
					</div>
					<div className="ml-auto pl-3">
						<div className="-mx-1.5 -my-1.5">
							<button
								onClick={onClose}
								className={`inline-flex rounded-md p-1.5 ${bgColor} ${textColor} hover:bg-opacity-75 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 focus:outline-none`}
							>
								<X className="h-4 w-4" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { Toast };
