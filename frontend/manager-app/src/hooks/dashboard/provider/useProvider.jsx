import { useEffect } from "react";
import { useFormik } from "formik";
import { useQuery } from '@tanstack/react-query';
import { initialValues } from "./constants/form-constants/initialValues";
import { validationSchema } from "./constants/form-constants/validationSchema";
import { useProviderStore } from "../../../stores/provider/providerStore";
import { setInitialValues } from "../../../utils/form/setInitialValues";
import { createProvider } from "../../../services/provider/providerService";
import { infoAlert } from "../../../services/alert/alertService";
import { QUERY_KEYS } from "../../../utils/constants/query-key-constants/queryKeyConstants";

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

  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.CREATE_PROVIDER, form.values],
    queryFn: createProvider,
    enabled: false
  })

  useEffect(() => {
    if(!isSuccess) return;

    infoAlert({
      icon: 'success',
      title: 'Proveedor creado',
      message: 'El proveedor ha sido creado exitosamente.'
    });

    form.resetForm();
  }, [isSuccess])
  

  return {
    form,
    providerStore,
    isLoading,
    onSubmit
  }
}