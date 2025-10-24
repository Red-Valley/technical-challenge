import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllProviders } from "../../../services/provider/providerService";
import { usePatientStore } from "../../../stores/patient/patientStore";
import { QUERY_KEYS } from "../../../utils/constants/query-key-constants/queryKeyConstants";
import { initialValues } from "./constants/form-constants/initialValues";
import { getAllStatuses } from "../../../services/status/statusService";
import { useFormik } from "formik";
import { setInitialValues } from "../../../utils/form/setInitialValues";
import { validationSchema } from "./constants/form-constants/validationSchema";
import { useEffect, useState } from "react";
import { createDropdownItems } from "../../../utils/transforms/createDropdownItems";
import { createPatient } from "../../../services/patient/patientService";
import { errorAlert, infoAlert } from "../../../services/alert/alertService";

export const usePatient = () => {
  const [statuses, setStatuses] = useState([]);
  const [providers, setProviders] = useState([]);

  const {
    data: fetchedProviders,
    isLoading: providersLoading,
    isSuccess: providersSuccess,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PROVIDERS],
    queryFn: getAllProviders,
  });

  const {
    data: fetchStatuses,
    isLoading: statusesLoading,
    isSuccess: statusesSuccess,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_STATUSES],
    queryFn: getAllStatuses,
  });

  const patientStore = usePatientStore((state) => state);

  const onSubmit = () => {
    createPatientMutation.mutate(form.values);
  };

  const form = useFormik({
    initialValues: setInitialValues(patientStore, initialValues),
    validationSchema,
    onSubmit,
  });

  const createPatientMutation = useMutation({
    mutationFn: createPatient,
    onError: () => {
      errorAlert({ message: 'Error creating this patient' });
    },
    onSuccess: () => {
      infoAlert({
        icon: 'success',
        title: 'Patient created',
        message: 'The patient has been created successfully.'
      })
      form.resetForm();
    }
  });

  useEffect(() => {
    if (!statusesSuccess) return;
    setStatuses(fetchStatuses.data);
  }, [statusesSuccess]);

  useEffect(() => {
    if (!providersSuccess) return;
    setProviders(createDropdownItems(fetchedProviders.data, "id", "full_name"));
  }, [providersSuccess]);

  return {
    form,
    statuses,
    providers,
    isLoading: providersLoading || statusesLoading || createPatientMutation.isLoading,
    patientStore,
  };
};
