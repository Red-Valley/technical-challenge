import React from 'react';
import Link from 'next/link';
import { formatDate } from 'src/lib';
import { Patient, Status } from 'src/models';
import { getStatusBadgeColor } from 'src/lib/getStatusBadgeColor';

interface Iprops {
	patients: Patient[];
	statuses: Status[];
	handleStatusUpdate: (patientId: string, newStatusId: string) => void;
}

const TableMode: React.FC<Iprops> = ({ patients }) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							Patient
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							Contact
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							Assigned Provider
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							Clinical Status
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							Created
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 bg-white">
					{patients.map(patient => (
						<tr key={patient.id} className="hover:bg-gray-50">
							<td className="px-6 py-4 whitespace-nowrap">
								<div>
									<div className="text-sm font-medium text-gray-900">
										{patient.full_name || 'Unknown Patient'}
									</div>
									<div className="text-sm text-gray-500">ID: {patient.id.slice(0, 8)}...</div>
								</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="text-sm text-gray-900">{patient.email || 'No email'}</div>
								<div className="text-sm text-gray-500">{patient.phone || 'No phone'}</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="text-sm text-gray-900">
									{patient.provider?.full_name || 'Unassigned'}
								</div>
								<div className="text-sm text-gray-500">{patient.provider?.specialty || ''}</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<span
									className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeColor(patient.status?.name || '')}`}
								>
									{patient.status?.name || 'Unknown'}
								</span>
							</td>
							<td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
								{formatDate(patient.created_at)}
							</td>
							<td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
								<div className="flex space-x-3">
									{/* <StatusDropdown
                            currentStatusId={patient.status_id}
                            statuses={statuses}
                            onStatusChange={(newStatusId) => handleStatusUpdate(patient.id, newStatusId)}
                          /> */}
									<Link
										href={`/patients/${patient.id}/history`}
										className="text-sm text-blue-600 hover:text-blue-900"
									>
										History
									</Link>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export { TableMode };
