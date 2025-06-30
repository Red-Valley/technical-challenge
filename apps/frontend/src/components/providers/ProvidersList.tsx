'use client';
import React from 'react';
import Link from 'next/link';
import { useApi } from 'src/hooks';
import { ProvidersApiResponse } from 'src/models/provider';
import { getAllProviders } from 'src/services/providersService';
import { formatDate } from 'src/lib/formatDate';
import { getProviderInitials } from 'src/lib/getProviderInitials';

const ProvidersList = () => {
	const { data, loading, error } = useApi<ProvidersApiResponse, undefined>(getAllProviders, {
		autoFetch: true,
		params: undefined
	});

	const providers = data?.data || [];

	if (loading) {
		return (
			<div className="rounded-lg bg-white shadow-sm">
				<div className="flex items-center justify-center py-12">
					<div className="text-center">
						<div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
						<p className="mt-4 text-gray-600">Cargando proveedores...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="rounded-lg bg-white shadow-sm">
				<div className="flex items-center justify-center py-12">
					<div className="text-center">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
							<svg
								className="h-6 w-6 text-red-600"
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
						<h3 className="mb-1 text-sm font-medium text-gray-900">Error al cargar proveedores</h3>
						<p className="text-sm text-gray-500">{error.message}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-white shadow-sm">
				<div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
					<div>
						<h1 className="text-2xl font-semibold text-gray-900">Healthcare Providers</h1>
						<p className="mt-1 text-sm text-gray-600">
							Manage healthcare providers and their patient assignments
						</p>
					</div>
					<Link
						href="/providers/new"
						className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					>
						Add Provider
					</Link>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
									Provider
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
									Specialty
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
									Patients
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
									Joined
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{providers.map(provider => (
								<tr key={provider.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div className="h-10 w-10 flex-shrink-0">
												<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
													<span className="text-sm font-medium text-blue-600">
														{getProviderInitials(provider.full_name)}
													</span>
												</div>
											</div>
											<div className="ml-4">
												<div className="text-sm font-medium text-gray-900">
													{provider.full_name || 'Unknown Provider'}
												</div>
												<div className="text-sm text-gray-500">
													ID: {provider.id.slice(0, 8)}...
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800`}
										>
											{provider.specialty || 'General'}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<span className="text-sm font-medium text-gray-900">
												{provider._count?.patients || 0}
											</span>
											<span className="ml-1 text-sm text-gray-500">
												patient{(provider._count?.patients || 0) !== 1 ? 's' : ''}
											</span>
										</div>
									</td>
									<td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
										{formatDate(provider.created_at)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{providers.length === 0 && (
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
									d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</div>
						<h3 className="mb-1 text-sm font-medium text-gray-900">No providers found</h3>
						<p className="mb-4 text-sm text-gray-500">
							Get started by adding your first healthcare provider.
						</p>
						<a
							href="/providers/new"
							className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
						>
							Add Provider
						</a>
					</div>
				)}
			</div>
		</main>
	);
};

export { ProvidersList };
