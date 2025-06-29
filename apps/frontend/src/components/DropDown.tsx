'use client';

import React from 'react';
import { Toast, ConfirmationModal } from 'src/components/ui';
import { useStatusManagement } from 'src/hooks/useStatusManagement';
import {
	getStatusIcon,
	getStatusColor,
	getStatusDescription,
	organizeStatuses,
	isStatusProgression
} from 'src/lib';
import { Status } from 'src/models';

interface Iprops {
	currentStatusId: string;
	statuses: Status[];
	onStatusChange: (newStatusId: string) => void;
}

export const DropDown: React.FC<Iprops> = ({ currentStatusId, statuses, onStatusChange }) => {
	const {
		isOpen,
		showConfirmation,
		showToast,
		toastMessage,
		currentStatus,
		pendingStatus,
		handleStatusSelect,
		confirmStatusChange,
		cancelStatusChange,
		closeDropdown,
		toggleDropdown,
		closeToast
	} = useStatusManagement({ currentStatusId, statuses, onStatusChange });

	const organizedStatuses = organizeStatuses(statuses);

	return (
		<>
			<div className="relative inline-block">
				<button
					onClick={toggleDropdown}
					className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
					aria-haspopup="true"
					aria-expanded={isOpen}
				>
					<span className="mr-2 text-base">{getStatusIcon(currentStatus?.name || '')}</span>
					<span className="hidden sm:inline">Update Status</span>
					<span className="sm:hidden">Update</span>
					<svg
						className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				{isOpen && (
					<>
						{/* Overlay */}
						<div className="fixed inset-0 z-40" onClick={closeDropdown} aria-hidden="true" />

						{/* Dropdown */}
						<div className="animate-in fade-in slide-in-from-top-2 absolute top-full right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl duration-200">
							{/* Header */}
							<div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-4">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-sm font-semibold text-gray-900">Update Patient Status</h3>
										<div className="mt-1 flex items-center text-xs text-gray-600">
											<span className="mr-2">{getStatusIcon(currentStatus?.name || '')}</span>
											<span>Current: {currentStatus?.name || 'Unknown'}</span>
										</div>
									</div>
									<button
										onClick={closeDropdown}
										className="text-gray-400 transition-colors hover:text-gray-600"
									>
										<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>

							{/* Status options */}
							<div className="max-h-80 overflow-y-auto">
								<div className="p-2">
									{organizedStatuses.map(status => {
										const isChild = !!status.parent_id;
										const isSelected = status.id === currentStatusId;
										const isProgression = isStatusProgression(
											currentStatus?.name || '',
											status.name
										);

										return (
											<button
												key={status.id}
												onClick={() => handleStatusSelect(status.id)}
												disabled={isSelected}
												className={`mb-1 w-full rounded-lg p-3 text-left transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed ${
													isChild ? 'mr-2 ml-4' : ''
												} ${
													isSelected
														? `${getStatusColor(status.name, 'bg')} ${getStatusColor(status.name, 'border')} border-2 shadow-sm`
														: `hover:${getStatusColor(status.name, 'bg')} border border-transparent hover:shadow-sm`
												}`}
												role="menuitem"
											>
												<div className="flex items-start space-x-3">
													{/* Status indicator */}
													<div className="mt-0.5 flex-shrink-0">
														{isChild && <span className="mr-2 text-sm text-gray-400">└─</span>}
														<span className="text-lg">{getStatusIcon(status.name)}</span>
													</div>

													{/* Content */}
													<div className="min-w-0 flex-1">
														<div className="flex items-center justify-between">
															<div className="text-sm font-medium text-gray-900">{status.name}</div>
															<div className="flex items-center space-x-2">
																{isProgression && (
																	<span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
																		Next
																	</span>
																)}
																{isSelected && (
																	<div
																		className={`h-2 w-2 rounded-full ${getStatusColor(status.name, 'accent')}`}
																	/>
																)}
															</div>
														</div>
														<p className="mt-1 text-xs text-gray-500">
															{getStatusDescription(status.name)}
														</p>
														{isChild && (
															<p className="mt-1 text-xs text-gray-400">
																Sub-status of {statuses.find(s => s.id === status.parent_id)?.name}
															</p>
														)}
													</div>
												</div>
											</button>
										);
									})}
								</div>
							</div>

							{/* Footer */}
							<div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
								<p className="text-center text-xs text-gray-500">
									Select a new status to update the patients current state
								</p>
							</div>
						</div>
					</>
				)}
			</div>

			{/* Confirmation Modal */}
			<ConfirmationModal
				show={showConfirmation}
				title="Confirm Status Change"
				message={`Are you sure you want to change the patient status to ${pendingStatus?.name}?`}
				description={pendingStatus ? getStatusDescription(pendingStatus.name) : undefined}
				confirmVariant={pendingStatus?.name === 'Cancelled' ? 'danger' : 'warning'}
				onConfirm={() => confirmStatusChange(pendingStatus?.id ?? '')}
				onCancel={cancelStatusChange}
				icon={pendingStatus ? getStatusIcon(pendingStatus.name) : undefined}
			/>

			{/* Toast */}
			<Toast show={showToast} message={toastMessage} type="success" onClose={closeToast} />
		</>
	);
};
