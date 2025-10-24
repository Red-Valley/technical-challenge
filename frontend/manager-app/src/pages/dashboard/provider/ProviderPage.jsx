import PropTypes from "prop-types";
import { useProvider } from "../../../hooks/dashboard/provider/useProvider";
import GenericTextInput from "../../../components/generic/form-items/GenericTextInput";
import GenericButton from "../../../components/generic/form-items/GenericButton";
import GenericProgressBar from "../../../components/generic/ui/GenericProgressBar";

const ProviderPage = (props) => {
  const { form, providerStore, isLoading } = useProvider();

  if (isLoading) return <GenericProgressBar />;

  return (
    <form
      className="w-full h-full flex flex-col gap-4 p-4 bg-white rounded-md shadow-md"
      onSubmit={form.handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        Create new Doctor (Provider)
      </h2>

      <GenericTextInput
        label="Full Name"
        name="fullName"
        form={form}
        persistence={providerStore.setFullName}
      />
      <GenericTextInput
        label="Specialty"
        name="specialty"
        form={form}
        persistence={providerStore.setSpecialty}
      />
      <GenericButton type="submit" variant="primary" size="md" form={form}>
        Create
      </GenericButton>
    </form>
  );
};

ProviderPage.propTypes = {};

export default ProviderPage;
