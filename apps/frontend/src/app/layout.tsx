import React from 'react';
import type { Metadata } from 'next';
import { NavBar } from 'src/components';
import { StatusProviderProvider } from 'src/context/StatusProviderContext';
import 'src/styles/globals.css';

export const metadata: Metadata = {
	title: 'Technical Challenge - Frontend',
	description: 'Frontend moderno para el desafío técnico desarrollado con Next.js'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<StatusProviderProvider>
					<NavBar />
					{children}
				</StatusProviderProvider>
			</body>
		</html>
	);
}
