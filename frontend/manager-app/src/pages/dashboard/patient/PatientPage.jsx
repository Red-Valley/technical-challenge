import GenericButton from "../../../components/generic/form-items/GenericButton";
import GenericDropdown from "../../../components/generic/form-items/GenericDropdown";
import GenericTextInput from "../../../components/generic/form-items/GenericTextInput";
import GenericProgressBar from "../../../components/generic/ui/GenericProgressBar";
import { usePatient } from "../../../hooks/dashboard/patient/usePatient";

const PatientPage = () => {
  const { statuses, providers, patientStore, patient, isLoading, error, form } =
    usePatient();

  if (isLoading) return <GenericProgressBar />;

  return (
    <form
      onSubmit={form.handleSubmit}
      className="w-full h-full flex flex-col gap-4 p-4 bg-white rounded-md shadow-md"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        Create new Patient
      </h2>
      <GenericTextInput
        label="Full Name"
        name="full_name"
        form={form}
        persistence={patientStore.setFullName}
      />
      <GenericTextInput
        label="Email"
        name="email"
        form={form}
        persistence={patientStore.setEmail}
      />
      <GenericTextInput
        label="Phone"
        name="phone"
        form={form}
        persistence={patientStore.setPhone}
      />
      <GenericDropdown
        name={"provider_id"}
        form={form}
        label={"Provider"}
        options={providers || []}
        persistence={patientStore.setProviderId}
      />
      <GenericDropdown
        name={"status_id"}
        form={form}
        label={"Status"}
        options={statuses || []}
        persistence={patientStore.setStatusId}
      />
      <GenericButton type="submit" variant="primary" size="md">
        Create
      </GenericButton>
    </form>
  );
};

PatientPage.propTypes = {};

export default PatientPage;
