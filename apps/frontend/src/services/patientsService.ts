import {
	PatientsApiResponse,
	UseApiCall,
	PatientApiResponse,
	CreatePatientFormData,
	PatientStatusHistoryApiResponse
} from 'src/models';
import { loadAbortController } from 'src/utils';
import { initAxios } from './axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

const axiosInstance = initAxios(BASE_URL);

export const getAllPatients = (): UseApiCall<PatientsApiResponse> => {
	const controller = loadAbortController();

	return {
		controller,
		call: axiosInstance.get<PatientsApiResponse>(`${BASE_URL}/api/patients`, {
			signal: controller.signal
		})
	};
};

export const getPatientsByProvider = (providerId: string): UseApiCall<PatientsApiResponse> => {
	const controller = loadAbortController();

	return {
		controller,
		call: axiosInstance.get<PatientsApiResponse>(
			`${BASE_URL}/api/patients?provider=${providerId}`,
			{
				signal: controller.signal
			}
		)
	};
};

export const getPatientsByStatus = (statusId: string): UseApiCall<PatientsApiResponse> => {
	const controller = loadAbortController();

	return {
		controller,
		call: axiosInstance.get<PatientsApiResponse>(`${BASE_URL}/api/patients?status=${statusId}`, {
			signal: controller.signal
		})
	};
};

export const getPatientById = (id: string): UseApiCall<PatientApiResponse> => {
	const controller = loadAbortController();

	return {
		controller,
		call: axiosInstance.get<PatientApiResponse>(`${BASE_URL}/api/patients/${id}`, {
			signal: controller.signal
		})
	};
};

export const createPatient = (
	patientData: CreatePatientFormData & { status_id: string }
): UseApiCall<PatientApiResponse> => {
	const controller = loadAbortController();

	return {
		controller,
		call: axiosInstance.post<PatientApiResponse>(`${BASE_URL}/api/patients`, patientData, {
			signal: controller.signal
		})
	};
};

export const updatePatientStatus = (
	id: string,
	statusId: string
): UseApiCall<PatientApiResponse> => {
	const controller = loadAbortController();

	return {
		controller,
		call: axiosInstance.patch<PatientApiResponse>(
			`${BASE_URL}/api/patients/${id}/status`,
			{ status_id: statusId },
			{
				signal: controller.signal
			}
		)
	};
};

export const getPatientStatusHistory = (
	id: string
): UseApiCall<PatientStatusHistoryApiResponse> => {
	const controller = loadAbortController();

	return {
		controller,
		call: axiosInstance.get<PatientStatusHistoryApiResponse>(
			`${BASE_URL}/api/patients/${id}/status-history`,
			{
				signal: controller.signal
			}
		)
	};
};
