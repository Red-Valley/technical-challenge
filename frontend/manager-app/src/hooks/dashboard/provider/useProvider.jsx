import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { initialValues } from "./constants/form-constants/initialValues";
import { validationSchema } from "./constants/form-constants/validationSchema";
import { useProviderStore } from "../../../stores/provider/providerStore";
import { setInitialValues } from "../../../utils/form/setInitialValues";
import { createProvider } from "../../../services/provider/providerService";
import { infoAlert } from "../../../services/alert/alertService";

export const useProvider = () => {
  const providerStore = useProviderStore((state) => state);

  const onSubmit = () => {
    createProviderMutation.mutate(form.values);
  };

  const form = useFormik({
    initialValues: setInitialValues(providerStore, initialValues),
    validationSchema,
    onSubmit,
  });

  const handleOnSaveSuccess = () => {
    infoAlert({
      icon: "success",
      title: "Provider created",
      message: "The provider has been created successfully.",
    });
    form.resetForm();
  }

  const createProviderMutation = useMutation({
    mutationFn: createProvider,
    onError: () => {
      errorAlert({ message: "Error creating this provider" });
    },
    onSuccess: handleOnSaveSuccess
  });

  return {
    form,
    providerStore,
    loading: createProviderMutation.isLoading,
    onSubmit,
  };
};
