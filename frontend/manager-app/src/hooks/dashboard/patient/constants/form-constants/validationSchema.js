import { object, string } from 'yup';

export const validationSchema = object({
  full_name: string().max(50).isNotInjection().required("Full name is required"),
  email: string().email("Invalid email format").max(100).isNotInjection().required("Email is required"),
  phone: string().max(15).isNotInjection().required("Phone number is required"),
  provider_id: string().uuid("Invalid provider ID").required("Provider ID is required"),
  status_id: string().uuid("Invalid status ID").required("Status ID is required"),
});