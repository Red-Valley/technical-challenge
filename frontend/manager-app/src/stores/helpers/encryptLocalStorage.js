import secureLocalStorage from 'react-secure-storage';

export const encryptLocalStorage = {

  getItem: (name) => {
    return secureLocalStorage.getItem(name);
  },

  setItem: (name, value) => {
    secureLocalStorage.setItem(name, value);
  },

  removeItem: (name) => {
    secureLocalStorage.removeItem(name);
  }
};
