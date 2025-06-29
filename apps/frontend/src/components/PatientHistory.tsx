import React from 'react';
import Link from 'next/link';
import { Patient } from 'src/models';

interface Iprops {
	patient: Patient;
}
const PatientHistory: React.FC<Iprops> = ({ patient }) => {
	if (!patient) {
		return (
			<section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
						<svg
							className="h-6 w-6 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
							/>
						</svg>
					</div>
					<h3 className="mb-2 text-lg font-medium text-gray-900">Patient not found</h3>
					<p className="mb-4 text-gray-500">The requested patient could not be found.</p>
					<Link href="/" className="font-medium text-blue-600 hover:text-blue-900">
						← Back to Patients
					</Link>
				</div>
			</section>
		);
	}

	return (
		<section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-white shadow-sm">
				<div className="border-b border-gray-200 px-6 py-4">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-semibold text-gray-900">Clinical Status History</h1>
							<div className="mt-1 flex items-center space-x-4 text-sm text-gray-600">
								<span className="font-medium">{patient.full_name}</span>
								<span>•</span>
								<span>ID: {patient.id.slice(0, 8)}...</span>
								<span>•</span>
								<span>{patient.email}</span>
							</div>
						</div>
						<Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-900">
							← Back to Patients
						</Link>
					</div>
				</div>

				{/* <div className="px-6 py-6">
            {statusHistory.length > 0 ? (
              <div className="space-y-6">
                <div className="text-sm text-gray-600 mb-4">
                  Showing {statusHistory.length} status change{statusHistory.length !== 1 ? "s" : ""}
                </div>

                <div className="relative">
                 
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                  {statusHistory.map((item, index) => (
                    <div key={item.id} className="relative flex items-start space-x-4 pb-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-lg relative z-10">
                        {getStatusIcon(item.status?.name || "")}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <span
                            className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(item.status?.name || "")}`}
                          >
                            {item.status?.name || "Unknown Status"}
                          </span>
                          {index === 0 && (
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              Current
                            </span>
                          )}
                        </div>

                        <div className="text-sm text-gray-600 mb-1">
                          <time dateTime={item.changed_at}>{formatDate(item.changed_at)}</time>
                        </div>

                       
                        {item.status?.parent_id && (
                          <div className="text-xs text-gray-500">
                            Sub-status of {statuses.find((s) => s.id === item.status?.parent_id)?.name}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">No status history</h3>
                <p className="text-sm text-gray-500">This patient has no recorded status changes yet.</p>
              </div>
            )}
          </div> */}
			</div>
		</section>
	);
};

export { PatientHistory };
