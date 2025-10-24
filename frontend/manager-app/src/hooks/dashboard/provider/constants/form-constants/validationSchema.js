import { object, string } from 'yup';

export const validationSchema = object({
  fullName: string().max(50).isNotInjection().required("Full name is required"),
  specialty: string().max(50).isNotInjection().required("Specialty is required"),
});