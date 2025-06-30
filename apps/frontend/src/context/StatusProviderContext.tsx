'use client';
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
	useCallback
} from 'react';
import { AxiosResponse } from 'axios';
import { Provider } from '../models/provider';
import { Status } from '../models/status';
import { getAllProviders } from '../services/providersService';
import { getAllStatuses } from '../services/statusesService';

interface StatusProviderContextType {
	statuses: Status[];
	providers: Provider[];
	loading: boolean;
	error: string | null;
	reload: () => void;
}

const StatusProviderContext = createContext<StatusProviderContextType | undefined>(undefined);

export const StatusProviderProvider = ({ children }: { children: ReactNode }) => {
	const [statuses, setStatuses] = useState<Status[]>([]);
	const [providers, setProviders] = useState<Provider[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const [statusesApi, providersApi] = [getAllStatuses(), getAllProviders()];
			const [statusesRes, providersRes]: [
				AxiosResponse<{ data: Status[] }>,
				AxiosResponse<{ data: Provider[] }>
			] = await Promise.all([statusesApi.call, providersApi.call]);
			setStatuses(statusesRes.data.data || []);
			setProviders(providersRes.data.data || []);
		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : 'Error al cargar los datos';
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const contextValue = React.useMemo(
		() => ({
			statuses,
			providers,
			loading,
			error,
			reload: fetchData
		}),
		[statuses, providers, loading, error, fetchData]
	);

	return (
		<StatusProviderContext.Provider value={contextValue}>{children}</StatusProviderContext.Provider>
	);
};

export const useStatusProvider = () => {
	const context = useContext(StatusProviderContext);
	if (!context) {
		throw new Error('useStatusProvider debe usarse dentro de StatusProviderProvider');
	}
	return context;
};
