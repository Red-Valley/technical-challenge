import { Status } from 'src/models/status';
import { UseApiCall } from 'src/models/useApiCall';
import { loadAbortController } from 'src/utils';
import { initAxios } from './axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
const axiosInstance = initAxios(BASE_URL);

export const getAllStatuses = (): UseApiCall<{ data: Status[] }> => {
	const controller = loadAbortController();
	return {
		controller,
		call: axiosInstance.get<{ data: Status[] }>(`${BASE_URL}/api/statuses`, {
			signal: controller.signal
		})
	};
};
