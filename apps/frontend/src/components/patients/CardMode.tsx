import React from 'react';
import Link from 'next/link';
import { Patient, Status } from 'src/models';
import { getStatusBadgeColor } from 'src/lib/getStatusBadgeColor';

interface Iprops {
	patients: Patient[];
	statuses?: Status[];
	handleStatusUpdate?: (patientId: string, newStatusId: string) => void;
}

const CardMode: React.FC<Iprops> = ({ patients }) => {
	return (
		<div className="p-6">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{patients.map(patient => (
					<div key={patient.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
						<div className="mb-3 flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
									<span className="text-sm font-medium text-blue-600">
										{patient.full_name
											?.split(' ')
											.map(n => n[0])
											.join('')
											.toUpperCase()
											.slice(0, 2) || '??'}
									</span>
								</div>
								<div>
									<h3 className="text-sm font-medium text-gray-900">
										{patient.full_name || 'Unknown Patient'}
									</h3>
									<p className="text-xs text-gray-500">
										{patient.provider?.full_name || 'No provider'}
									</p>
								</div>
							</div>
						</div>

						<div className="mb-3">
							<span
								className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeColor(patient.status?.name || '')}`}
							>
								{patient.status?.name || 'Unknown'}
							</span>
						</div>

						<div className="flex items-center justify-between">
							{/* <StatusDropdown
                        currentStatusId={patient.status_id}
                        statuses={statuses}
                        onStatusChange={(newStatusId) => handleStatusUpdate(patient.id, newStatusId)}
                      /> */}
							<Link
								href={`/patients/${patient.id}/history`}
								className="text-xs text-blue-600 hover:text-blue-900"
							>
								View History
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export { CardMode };
