'use client';
import React, { useState, useMemo } from 'react';
import { ChevronDown, Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { getStatusIcon, getStatusBadgeColor } from 'src/lib';
import { Status } from 'src/models';
import { getValidTransitions, getStatusLevel } from 'src/lib/organizeStatuses';

interface StatusDropdownProps {
	currentStatusId: string;
	statuses: Status[];
	onStatusChange: (newStatusId: string) => void;
	patientId: string;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
	currentStatusId,
	statuses,
	onStatusChange
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [pendingStatusId, setPendingStatusId] = useState<string | null>(null);

	// Calcular transiciones válidas usando validaciones locales
	const currentStatus = useMemo(
		() => statuses.find(s => s.id === currentStatusId),
		[currentStatusId, statuses]
	);

	const availableTransitions = useMemo(() => {
		if (!currentStatus) return [];
		return getValidTransitions(currentStatus, statuses);
	}, [currentStatus, statuses]);

	const pendingStatus = useMemo(
		() => statuses.find(s => s.id === pendingStatusId),
		[pendingStatusId, statuses]
	);

	const handleStatusSelect = (newStatusId: string) => {
		if (newStatusId !== currentStatusId) {
			const newStatus = statuses.find(s => s.id === newStatusId);

			// Mostrar confirmación para estados críticos
			if (newStatus?.name === 'Cancelled' || newStatus?.name === 'No-Show') {
				setPendingStatusId(newStatusId);
				setShowConfirmation(true);
				setIsOpen(false);
				return;
			}

			// Cambio directo para otros estados
			confirmStatusChange(newStatusId);
		}
		setIsOpen(false);
	};

	const confirmStatusChange = (statusId: string) => {
		onStatusChange(statusId);
		setShowConfirmation(false);
		setPendingStatusId(null);
	};

	const cancelStatusChange = () => {
		setShowConfirmation(false);
		setPendingStatusId(null);
	};

	const getTransitionType = (status: Status): string => {
		if (!currentStatus) return '';

		if (status.parent_id === currentStatus.id) return 'Progresión';
		if (status.id === currentStatus.parent_id) return 'Retroceso';
		if (status.parent_id === currentStatus.parent_id) return 'Alternativa';
		if (!status.parent_id) return 'Estado Raíz';

		return 'Otro';
	};

	const getTransitionIcon = (status: Status) => {
		const type = getTransitionType(status);
		switch (type) {
			case 'Progresión':
				return <ArrowRight className="h-4 w-4 text-green-600" />;
			case 'Retroceso':
				return <ArrowRight className="h-4 w-4 rotate-180 transform text-yellow-600" />;
			case 'Alternativa':
				return <ArrowRight className="h-4 w-4 text-blue-600" />;
			default:
				return <ArrowRight className="h-4 w-4 text-gray-600" />;
		}
	};

	return (
		<div className="relative">
			{/* Dropdown principal */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			>
				{currentStatus && (
					<>
						<span
							className={`mr-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeColor(currentStatus.name)}`}
						>
							{currentStatus.name}
						</span>
					</>
				)}
				<ChevronDown className="h-4 w-4 text-gray-400" />
			</button>

			{/* Dropdown menu */}
			{isOpen && (
				<div className="ring-opacity-5 absolute right-0 z-10 mt-2 w-72 rounded-md bg-white shadow-lg ring-1 ring-black">
					<div className="py-1">
						<div className="px-4 py-2 text-xs font-medium tracking-wide text-gray-500 uppercase">
							Cambiar Status
						</div>

						{/* Status actual */}
						<div className="border-b border-gray-100 px-4 py-2 text-sm text-gray-500">
							Status actual: <span className="font-medium">{currentStatus?.name}</span>
							{currentStatus && (
								<div className="mt-1 text-xs text-gray-400">
									Nivel: {getStatusLevel(currentStatus, statuses)}
								</div>
							)}
						</div>

						{/* Opciones disponibles */}
						{availableTransitions.length > 0 ? (
							availableTransitions.map(status => (
								<button
									key={status.id}
									onClick={() => handleStatusSelect(status.id)}
									className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
								>
									<div className="mr-3">{getStatusIcon(status.name)}</div>
									<div className="flex-1 text-left">
										<div className="font-medium">{status.name}</div>
										<div className="text-xs text-gray-500">
											{getTransitionType(status)} • Nivel {getStatusLevel(status, statuses)}
										</div>
									</div>
									<div className="flex items-center space-x-2">
										{getTransitionIcon(status)}
										{status.id === currentStatusId && <Check className="h-4 w-4 text-blue-600" />}
									</div>
								</button>
							))
						) : (
							<div className="px-4 py-2 text-sm text-gray-500">No hay transiciones disponibles</div>
						)}
					</div>
				</div>
			)}

			{/* Modal de confirmación */}
			{showConfirmation && (
				<div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
					<div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
						<div className="mb-4 flex items-center">
							<AlertTriangle className="mr-3 h-6 w-6 text-yellow-600" />
							<h3 className="text-lg font-medium text-gray-900">Confirmar cambio de status</h3>
						</div>

						<div className="mb-6">
							<p className="text-sm text-gray-600">
								¿Estás seguro de que quieres cambiar el status del paciente a{' '}
								<span className="font-medium text-red-600">{pendingStatus?.name}</span>?
							</p>
							<p className="mt-2 text-xs text-gray-500">
								Esta acción no se puede deshacer fácilmente.
							</p>
						</div>

						<div className="flex justify-end space-x-3">
							<button
								onClick={cancelStatusChange}
								className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							>
								Cancelar
							</button>
							<button
								onClick={() => confirmStatusChange(pendingStatusId!)}
								className="rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
							>
								Confirmar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export { StatusDropdown };
