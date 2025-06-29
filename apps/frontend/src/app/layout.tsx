import React from 'react';
import type { Metadata } from 'next';
import { NavBar } from 'src/components';
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
				<NavBar />
				{children}
			</body>
		</html>
	);
}
