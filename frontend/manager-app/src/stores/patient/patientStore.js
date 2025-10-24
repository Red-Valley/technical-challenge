import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { encryptLocalStorage } from '../helpers/encryptLocalStorage';

const storeApi = (set) => ({

  id: "",
  full_name: "",
  email: "",
  phone: "",
  provider_id: "",
  status_id: "",

  setId: (id) => {
    set({ id });
  },

  setFullName: (full_name) => {
    set({ full_name });
  },

  setEmail: (email) => {
    set({ email });
  },
  setPhone: (phone) => {
    set({ phone });
  },

  setProviderId: (provider_id) => {
    set({ provider_id });
  },

  setStatusId: (status_id) => {
    set({ status_id });
  },

  clearMenuData: () => {
    set({ id: "", full_name: "", email: "", phone: "", provider_id: "", status_id: "" });
  }
});

export const usePatientStore = create(
  devtools(
    persist(storeApi, {
      name: 'patient-storage',
      storage: createJSONStorage(() => encryptLocalStorage)
    })
  )
);