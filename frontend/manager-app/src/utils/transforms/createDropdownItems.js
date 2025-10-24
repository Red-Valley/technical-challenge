export const createDropdownItems = (dataArray, idKey, nameKey) => {
  return dataArray.map(item => ({
    id: item[idKey],
    name: item[nameKey]
  }));
}