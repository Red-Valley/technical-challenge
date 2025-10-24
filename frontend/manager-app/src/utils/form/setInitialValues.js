export const setInitialValues = (store, initialValues) => {
  return Object.keys(initialValues).reduce((acc, key) => {
    acc[key] = store[key] || initialValues[key];
    return acc;
  }, {});
}