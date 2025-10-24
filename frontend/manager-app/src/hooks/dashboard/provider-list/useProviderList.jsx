import { useQuery } from "@tanstack/react-query";
import { getAllProviders } from "../../../services/provider/providerService";
import { useEffect, useState } from "react";
import { createCardListItems } from "../../../utils/transforms/createCardListItems";
import { QUERY_KEYS } from "../../../utils/constants/query-key-constants/queryKeyConstants";

export const useProviderList = () => {

  const [providerList, setProviderList] = useState([])

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PROVIDERS],
    queryFn: getAllProviders
  })

  useEffect(()=>{
    if(!isSuccess) return;

    setProviderList(createCardListItems(data.data, 'full_name', 'specialty'));
  }, [isSuccess])

  return {
    providerList,
    isLoading,
    isSuccess
  }
}
