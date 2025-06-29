import { Provider } from 'src/models/provider';
import { UseApiCall } from 'src/models/useApiCall';
import { loadAbortController } from 'src/utils';
import { initAxios } from './axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
const axiosInstance = initAxios(BASE_URL);

export const getAllProviders = (): UseApiCall<{ data: Provider[] }> => {
	const controller = loadAbortController();
	return {
		controller,
		call: axiosInstance.get<{ data: Provider[] }>(`${BASE_URL}/api/providers`, {
			signal: controller.signal
		})
	};
};
