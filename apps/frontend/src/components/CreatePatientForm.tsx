'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { CreatePatientFormData } from 'src/models';

const CreatePatientForm: React.FC = () => {
	const router = useRouter();
	const initialValues: CreatePatientFormData = {
		full_name: '',
		email: '',
		phone: '',
		provider_id: ''
	};

	const validationSchema = Yup.object({
		full_name: Yup.string().required('Full name is required'),
		email: Yup.string().email('Invalid email address').required('Email is required'),
		phone: Yup.string().required('Phone is required'),
		provider_id: Yup.string().required('Provider is required')
	});

	const handleSubmit = async (values: CreatePatientFormData) => {
		// TODO: Implement the create patient logic
		console.log(values);
	};

	return (
		<section className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-white shadow-sm">
				<div className="border-b border-gray-200 px-6 py-4">
					<h1 className="text-2xl font-semibold text-gray-900">Create New Patient</h1>
					<p className="mt-1 text-sm text-gray-600">Add a new patient to the medical platform</p>
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
									Full Name *
								</label>
								<Field
									type="text"
									id="full_name"
									name="full_name"
									className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
										errors.full_name ? 'border-red-300' : 'border-gray-300'
									}`}
									placeholder="Enter patient's full name"
									disabled={isSubmitting}
								/>
								{errors.full_name && touched.full_name && (
									<p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
								)}
							</div>

							<div>
								<label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
									Email *
								</label>
								<Field
									type="email"
									id="email"
									name="email"
									className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
										errors.email ? 'border-red-300' : 'border-gray-300'
									}`}
									placeholder="Enter patient's email address"
									disabled={isSubmitting}
								/>
								{errors.email && touched.email && (
									<p className="mt-1 text-sm text-red-600">{errors.email}</p>
								)}
							</div>

							<div>
								<label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
									Phone *
								</label>
								<Field
									type="tel"
									id="phone"
									name="phone"
									className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
										errors.phone ? 'border-red-300' : 'border-gray-300'
									}`}
									placeholder="(555) 123-4567"
									disabled={isSubmitting}
								/>
								{errors.phone && touched.phone && (
									<p className="mt-1 text-sm text-red-600">{errors.phone}</p>
								)}
							</div>

							<div>
								<label
									htmlFor="provider_id"
									className="mb-2 block text-sm font-medium text-gray-700"
								>
									Assign Provider *
								</label>
								<Field
									as="select"
									id="provider_id"
									name="provider_id"
									className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
										errors.provider_id ? 'border-red-300' : 'border-gray-300'
									}`}
									disabled={isSubmitting}
								>
									<option value="">Choose a provider...</option>
									{/* {providers.map((provider) => (
                    <option key={provider.id} value={provider.id}>
                      {provider.full_name} - {provider.specialty}
                    </option>
                  ))} */}
								</Field>
								{errors.provider_id && touched.provider_id && (
									<p className="mt-1 text-sm text-red-600">{errors.provider_id}</p>
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
											New patients will be automatically assigned the &ldquo;Scheduled&#34; status.
										</p>
									</div>
								</div>
							</div>

							<div className="flex justify-end space-x-3 border-t border-gray-200 pt-6">
								<button
									type="button"
									onClick={() => router.push('/')}
									className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
									disabled={isSubmitting}
								>
									Cancel
								</button>
								<button
									type="submit"
									className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Creating...' : 'Create Patient'}
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</section>
	);
};

export { CreatePatientForm };
