import {
	PatientsApiResponse,
	UseApiCall,
	PatientApiResponse,
	CreatePatientFormData,
	StatusHistoryApiResponse
} from 'src/models';
import { loadAbortController } from 'src/utils';
import { initAxios } from './axios';

const BASE_URL = 'http://localhost:3000/api';

const axiosInstance = initAxios(BASE_URL);

export const getAllPatients = (): UseApiCall<PatientsApiResponse> => {
	const controller = loadAbortController();

	return {
		controller,
		call: axiosInstance.get<PatientsApiResponse>(`${BASE_URL}/patients`, {
			signal: controller.signal
		})
	};
};

export const getPatientsByProvider = (providerId: string): UseApiCall<PatientsApiResponse> => {
	const controller = loadAbortController();

	return {
		controller,
		call: axiosInstance.get<PatientsApiResponse>(`${BASE_URL}/patients?provider=${providerId}`, {
			signal: controller.signal
		})
	};
};

export const getPatientsByStatus = (statusId: string): UseApiCall<PatientsApiResponse> => {
	const controller = loadAbortController();

	return {
		controller,
		call: axiosInstance.get<PatientsApiResponse>(`${BASE_URL}/patients?status=${statusId}`, {
			signal: controller.signal
		})
	};
};

export const getPatientById = (id: string): UseApiCall<PatientApiResponse> => {
	const controller = loadAbortController();

	return {
		controller,
		call: axiosInstance.get<PatientApiResponse>(`${BASE_URL}/patients/${id}`, {
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
		call: axiosInstance.post<PatientApiResponse>(`${BASE_URL}/patients`, patientData, {
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
			`${BASE_URL}/patients/${id}/status`,
			{ status_id: statusId },
			{
				signal: controller.signal
			}
		)
	};
};

export const getPatientStatusHistory = (id: string): UseApiCall<StatusHistoryApiResponse> => {
	const controller = loadAbortController();

	return {
		controller,
		call: axiosInstance.get<StatusHistoryApiResponse>(`${BASE_URL}/patients/${id}/status-history`, {
			signal: controller.signal
		})
	};
};
