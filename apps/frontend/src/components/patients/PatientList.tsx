'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useStatusProvider } from 'src/context/StatusProviderContext';
import { useApi } from 'src/hooks';
import { PatientsApiResponse } from 'src/models';
import { getAllPatients, updatePatientStatus } from 'src/services/patientsService';
import { CardMode } from './CardMode';
import { EmptyPatients } from './EmptyPatients';
import { TableMode } from './TableMode';
import { Toast } from '../ui/Toast';

const PatientList = () => {
	const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
	const [toast, setToast] = useState<{
		message: string;
		type: 'success' | 'error';
		isVisible: boolean;
	}>({
		message: '',
		type: 'success',
		isVisible: false
	});

	const { statuses } = useStatusProvider();
	const { data, loading, error, fetch } = useApi<PatientsApiResponse, undefined>(getAllPatients, {
		autoFetch: true,
		params: undefined
	});

	const handleStatusUpdate = async (patientId: string, newStatusId: string) => {
		try {
			await updatePatientStatus(patientId, newStatusId).call;
			// Recargar la lista de pacientes después de la actualización
			await fetch(undefined);

			// Mostrar notificación de éxito
			const newStatus = statuses.find(s => s.id === newStatusId);
			setToast({
				message: `Status actualizado exitosamente a ${newStatus?.name || 'nuevo status'}`,
				type: 'success',
				isVisible: true
			});
		} catch (error) {
			console.error('Error updating patient status:', error);
			// Mostrar notificación de error
			setToast({
				message: 'Error al actualizar el status del paciente',
				type: 'error',
				isVisible: true
			});
		}
	};

	const closeToast = () => {
		setToast(prev => ({ ...prev, isVisible: false }));
	};

	if (loading) {
		return (
			<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="text-center">
					<div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
					<p className="mt-4 text-gray-600">Loading patients...</p>
				</div>
			</section>
		);
	}

	if (error) return <div>Error: {error.message}</div>;

	return (
		<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-white shadow-sm">
				<div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
					<div>
						<h1 className="text-2xl font-semibold text-gray-900">Patients</h1>
						<p className="mt-1 text-sm text-gray-600">Manage patient records and clinical status</p>
					</div>
					<div className="flex items-center space-x-3">
						<div className="flex items-center rounded-lg bg-gray-100 p-1">
							<button
								onClick={() => setViewMode('table')}
								className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
									viewMode === 'table'
										? 'bg-white text-gray-900 shadow-sm'
										: 'text-gray-600 hover:text-gray-900'
								}`}
							>
								Table
							</button>
							<button
								onClick={() => setViewMode('cards')}
								className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
									viewMode === 'cards'
										? 'bg-white text-gray-900 shadow-sm'
										: 'text-gray-600 hover:text-gray-900'
								}`}
							>
								Cards
							</button>
						</div>
						<Link
							href="/patients/new"
							className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
						>
							Add Patient
						</Link>
					</div>
				</div>

				{viewMode === 'table' ? (
					<TableMode
						patients={data?.data || []}
						statuses={statuses}
						handleStatusUpdate={handleStatusUpdate}
					/>
				) : (
					<CardMode
						patients={data?.data || []}
						statuses={statuses}
						handleStatusUpdate={handleStatusUpdate}
					/>
				)}

				{data?.data?.length === 0 && <EmptyPatients />}
			</div>

			{/* Toast de notificaciones */}
			<Toast
				message={toast.message}
				type={toast.type}
				isVisible={toast.isVisible}
				onClose={closeToast}
			/>
		</main>
	);
};

export { PatientList };
