'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useApi } from 'src/hooks';
import { CreateProviderFormData, ProviderApiResponse } from 'src/models/provider';
import { createProvider } from 'src/services/providersService';

const CreateProviderForm: React.FC = () => {
	const router = useRouter();

	const { fetch, loading } = useApi<ProviderApiResponse, CreateProviderFormData>(createProvider);

	const initialValues: CreateProviderFormData = {
		full_name: '',
		specialty: ''
	};

	const validationSchema = Yup.object({
		full_name: Yup.string()
			.required('El nombre completo es requerido')
			.min(2, 'El nombre debe tener al menos 2 caracteres')
			.max(100, 'El nombre no puede tener más de 100 caracteres'),
		specialty: Yup.string()
			.required('La especialidad es requerida')
			.min(2, 'La especialidad debe tener al menos 2 caracteres')
			.max(50, 'La especialidad no puede tener más de 50 caracteres')
	});

	const handleSubmit = async (values: CreateProviderFormData) => {
		try {
			const data = await fetch(values);
			if (data?.data) {
				router.push('/providers');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-white shadow-sm">
				<div className="border-b border-gray-200 px-6 py-4">
					<h1 className="text-2xl font-semibold text-gray-900">Crear Nuevo Proveedor</h1>
					<p className="mt-1 text-sm text-gray-600">
						Agregar un nuevo proveedor médico a la plataforma
					</p>
				</div>

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form className="space-y-6 px-6 py-6">
							<div>
								<label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-700">
									Nombre Completo *
								</label>
								<Field
									type="text"
									id="full_name"
									name="full_name"
									className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
										errors.full_name ? 'border-red-300' : 'border-gray-300'
									}`}
									placeholder="Ingrese el nombre completo del proveedor"
									disabled={isSubmitting}
								/>
								{errors.full_name && touched.full_name && (
									<p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
								)}
							</div>

							<div>
								<label htmlFor="specialty" className="mb-2 block text-sm font-medium text-gray-700">
									Especialidad *
								</label>
								<Field
									type="text"
									id="specialty"
									name="specialty"
									className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
										errors.specialty ? 'border-red-300' : 'border-gray-300'
									}`}
									placeholder="Ej: Cardiología, Pediatría, etc."
									disabled={isSubmitting}
								/>
								{errors.specialty && touched.specialty && (
									<p className="mt-1 text-sm text-red-600">{errors.specialty}</p>
								)}
							</div>

							<div className="rounded-md border border-blue-200 bg-blue-50 p-4">
								<div className="flex">
									<div className="flex-shrink-0">
										<svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div className="ml-3">
										<p className="text-sm text-blue-700">
											Los proveedores pueden ser asignados a pacientes una vez creados.
										</p>
									</div>
								</div>
							</div>

							<div className="flex justify-end space-x-3 border-t border-gray-200 pt-6">
								<button
									type="button"
									onClick={() => router.push('/providers')}
									className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
									disabled={isSubmitting || loading}
								>
									Cancelar
								</button>
								<button
									type="submit"
									className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
									disabled={isSubmitting || loading}
								>
									{isSubmitting || loading ? 'Creando...' : 'Crear Proveedor'}
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</section>
	);
};

export { CreateProviderForm };
