import { useFormik } from "formik"
import { initialValues } from "./constants/form-constants/initialValues"
import { validationSchema } from "./constants/form-constants/validationSchema"
import { useProviderStore } from "../../../stores/provider/providerStore";
import { setInitialValues } from "../../../utils/form/setInitialValues";

export const useProvider = () => {

  const providerStore = useProviderStore(state => state);

  const onSubmit = () => {}

  const form = useFormik({
    initialValues: setInitialValues(providerStore, initialValues),
    validationSchema,
    onSubmit
  })

  return {
    form,
    providerStore
  }
}