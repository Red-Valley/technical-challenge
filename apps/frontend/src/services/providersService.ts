import {
	ProvidersApiResponse,
	ProviderApiResponse,
	CreateProviderFormData
} from 'src/models/provider';
import { UseApiCall } from 'src/models/useApiCall';
import { loadAbortController } from 'src/utils';
import { initAxios } from './axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
const axiosInstance = initAxios(BASE_URL);

export const getAllProviders = (): UseApiCall<ProvidersApiResponse> => {
	const controller = loadAbortController();
	return {
		controller,
		call: axiosInstance.get<ProvidersApiResponse>(`${BASE_URL}/api/providers`, {
			signal: controller.signal
		})
	};
};

export const createProvider = (
	providerData: CreateProviderFormData
): UseApiCall<ProviderApiResponse> => {
	const controller = loadAbortController();
	return {
		controller,
		call: axiosInstance.post<ProviderApiResponse>(`${BASE_URL}/api/providers`, providerData, {
			signal: controller.signal
		})
	};
};
