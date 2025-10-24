import { getAllPatients } from "../../../services/patient/patientService";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/constants/query-key-constants/queryKeyConstants";
import { getAllProviders } from "../../../services/provider/providerService";
import { getAllStatuses } from "../../../services/status/statusService";

export const usePatientList = () => {
  const {
    data: fetchedProviders,
    isLoading: providersLoading
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PROVIDERS],
    queryFn: getAllProviders,
  });

  const {
    data: fetchStatuses,
    isLoading: statusesLoading
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_STATUSES],
    queryFn: getAllStatuses,
  });

  const { data: response, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PATIENTS],
    queryFn: getAllPatients,
  });

  return {
    isLoading: providersLoading || statusesLoading,
    patientList: response?.data || [],
    statuses: fetchStatuses?.data || [],
    providers: fetchedProviders?.data || [],
    isSuccess,
  };
};
