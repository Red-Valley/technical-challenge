'use client';
import React from 'react';
import { useApi } from 'src/hooks';
import { PatientStatusHistoryApiResponse } from 'src/models';
import { getPatientStatusHistory } from 'src/services/patientsService';
import { PatientHistory } from './PatientHistory';

interface Iprops {
	id: string;
}

const HistoryPage: React.FC<Iprops> = ({ id }) => {
	const { data, loading, error } = useApi<PatientStatusHistoryApiResponse, string>(
		getPatientStatusHistory,
		{ params: id, autoFetch: true }
	);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	console.log(data);

	return (
		<div>
			{data?.data && <PatientHistory patient={data.data.patient} history={data.data.history} />}
		</div>
	);
};

export default HistoryPage;
