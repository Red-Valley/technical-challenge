import { useState } from 'react';
import { Status } from 'src/models';

interface UseStatusManagementProps {
	currentStatusId: string;
	statuses: Status[];
	onStatusChange: (newStatusId: string) => void;
}

export const useStatusManagement = ({
	currentStatusId,
	statuses,
	onStatusChange
}: UseStatusManagementProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [pendingStatusId, setPendingStatusId] = useState<string | null>(null);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');

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
		const newStatus = statuses.find(s => s.id === statusId);
		onStatusChange(statusId);
		setToastMessage(`Status updated to ${newStatus?.name || 'Unknown'}`);
		setShowToast(true);
		setTimeout(() => setShowToast(false), 4000);
		setShowConfirmation(false);
		setPendingStatusId(null);
	};

	const cancelStatusChange = () => {
		setShowConfirmation(false);
		setPendingStatusId(null);
	};

	const closeDropdown = () => setIsOpen(false);
	const toggleDropdown = () => setIsOpen(!isOpen);
	const closeToast = () => setShowToast(false);

	const currentStatus = statuses.find(s => s.id === currentStatusId);
	const pendingStatus = statuses.find(s => s.id === pendingStatusId);

	return {
		// Estado
		isOpen,
		showConfirmation,
		showToast,
		toastMessage,
		currentStatus,
		pendingStatus,

		// Acciones
		handleStatusSelect,
		confirmStatusChange,
		cancelStatusChange,
		closeDropdown,
		toggleDropdown,
		closeToast
	};
};
