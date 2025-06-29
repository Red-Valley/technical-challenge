import React from 'react';

interface ConfirmationModalProps {
	show: boolean;
	title: string;
	message: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	confirmVariant?: 'danger' | 'warning' | 'primary';
	onConfirm: () => void;
	onCancel: () => void;
	icon?: React.ReactNode;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	show,
	title,
	message,
	description,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	confirmVariant = 'primary',
	onConfirm,
	onCancel,
	icon
}) => {
	if (!show) return null;

	const getConfirmButtonStyles = () => {
		switch (confirmVariant) {
			case 'danger':
				return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
			case 'warning':
				return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';
			default:
				return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
		}
	};

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				{/* Overlay */}
				<div
					className="bg-opacity-75 fixed inset-0 bg-gray-500 transition-opacity"
					aria-hidden="true"
				/>

				{/* Modal */}
				<div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
					<div className="sm:flex sm:items-start">
						{icon && (
							<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
								{icon}
							</div>
						)}
						<div className={`mt-3 text-center sm:mt-0 ${icon ? 'sm:ml-4 sm:text-left' : ''}`}>
							<h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
							<div className="mt-2">
								<p className="text-sm text-gray-500">{message}</p>
								{description && <p className="mt-2 text-xs text-gray-400">{description}</p>}
							</div>
						</div>
					</div>
					<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
						<button
							type="button"
							onClick={onConfirm}
							className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm ${getConfirmButtonStyles()}`}
						>
							{confirmText}
						</button>
						<button
							type="button"
							onClick={onCancel}
							className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
						>
							{cancelText}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
