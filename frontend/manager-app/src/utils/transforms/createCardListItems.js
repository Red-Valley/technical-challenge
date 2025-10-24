export const createCardListItems = (dataArray, titleKey, subtitleKey, idKey = 'id') => {
  return dataArray.map(item => ({
    id: item[idKey],
    title: item[titleKey],
    subtitle: item[subtitleKey]
  }));
};
