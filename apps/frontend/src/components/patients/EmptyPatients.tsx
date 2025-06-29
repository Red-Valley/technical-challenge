import React from 'react';
import Link from 'next/link';

const EmptyPatients = () => {
	return (
		<div className="py-12 text-center">
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
						d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
					/>
				</svg>
			</div>
			<h3 className="mb-1 text-sm font-medium text-gray-900">No patients found</h3>
			<p className="mb-4 text-sm text-gray-500">
				Get started by creating your first patient record.
			</p>
			<Link
				href="/patients/new"
				className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
			>
				Add Patient
			</Link>
		</div>
	);
};

export { EmptyPatients };
