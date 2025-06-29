import Link from 'next/link';

export default function NotFound() {
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
				<h3 className="mb-2 text-lg font-medium text-gray-900">Paciente no encontrado</h3>
				<p className="mb-4 text-gray-500">
					El paciente solicitado no existe o no se pudo encontrar.
				</p>
				<Link href="/" className="font-medium text-blue-600 hover:text-blue-900">
					← Volver a Pacientes
				</Link>
			</div>
		</section>
	);
}
