import { useFormik } from "formik";
import { useQuery } from '@tanstack/react-query';
import { initialValues } from "./constants/form-constants/initialValues";
import { validationSchema } from "./constants/form-constants/validationSchema";
import { useProviderStore } from "../../../stores/provider/providerStore";
import { setInitialValues } from "../../../utils/form/setInitialValues";
import { createProvider } from "../../../services/provider/providerService";

export const useProvider = () => {

  const providerStore = useProviderStore(state => state);

  const onSubmit = () => {
    refetch();
  }

  const form = useFormik({
    initialValues: setInitialValues(providerStore, initialValues),
    validationSchema,
    onSubmit
  })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['create-provider', form.values],
    queryFn: createProvider,
    enabled: false,
  })

  return {
    form,
    providerStore,
    isLoading,
    onSubmit
  }
}