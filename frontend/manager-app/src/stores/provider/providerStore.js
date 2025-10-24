import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { encryptLocalStorage } from '../helpers/encryptLocalStorage';

const storeApi = (set) => ({
  id: "",
  fullName: "",
  specialty: "",

  setId: (id) => {
    set({ id });
  },

  setFullName: (fullName) => {
    set({ fullName });
  },

  setSpecialty: (specialty) => {
    set({ specialty });
  },

  clearMenuData: () => {
    set({ id: "", fullName: "", specialty: "" });
  }
});

export const useProviderStore = create(
  devtools(
    persist(storeApi, {
      name: 'provider-storage',
      storage: createJSONStorage(() => encryptLocalStorage)
    })
  )
);