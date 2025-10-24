import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { encryptLocalStorage } from '../helpers/encryptLocalStorage';

const storeApi = (set) => ({
  id: "",
  full_name: "",
  specialty: "",

  setId: (id) => {
    set({ id });
  },

  setFullName: (full_name) => {
    set({ full_name });
  },

  setSpecialty: (specialty) => {
    set({ specialty });
  },

  clearMenuData: () => {
    set({ id: "", full_name: "", specialty: "" });
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