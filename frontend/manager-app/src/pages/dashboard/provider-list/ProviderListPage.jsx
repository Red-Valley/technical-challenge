import GenericCardList from "../../../components/generic/ui/GenericCardList";
import GenericProgressBar from "../../../components/generic/ui/GenericProgressBar";
import { useProviderList } from "../../../hooks/dashboard/provider-list/useProviderList";

const ProviderListPage = () => {
  const { providerList, isSuccess } = useProviderList();

  if (!isSuccess) return <GenericProgressBar />;

  return (
    <GenericCardList
      title="Provider"
      items={providerList}
    />
  );
};

export default ProviderListPage;