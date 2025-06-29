'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavBar: React.FC = () => {
	const pathname = usePathname();

	const isActive = (path: string) => {
		if (path === '/' && pathname === '/') return true;
		if (path !== '/' && pathname.startsWith(path)) return true;
		return false;
	};

	return (
		<nav className="border-b border-gray-200 bg-white shadow-sm">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center space-x-8">
						<div className="flex-shrink-0">
							<h1 className="text-xl font-semibold text-gray-900">VIP Medical Platform</h1>
						</div>
						<div className="flex space-x-4">
							<Link
								href="/"
								className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
									isActive('/') && !pathname.startsWith('/providers')
										? 'bg-blue-100 text-blue-700'
										: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
								}`}
							>
								Patients
							</Link>
							<a
								href="/providers"
								className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
									isActive('/providers')
										? 'bg-blue-100 text-blue-700'
										: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
								}`}
							>
								Providers
							</a>
						</div>
					</div>

					<div className="flex items-center space-x-4">
						<div className="text-sm text-gray-500">Medwork Platform</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
