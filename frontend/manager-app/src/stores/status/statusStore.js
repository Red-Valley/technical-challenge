import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { encryptLocalStorage } from "../helpers/encryptLocalStorage";

const storeApi = (set) => ({
  id: "",
  name: "",
  parent_id: "",
  order: "",

  setId: (id) => {
    set({ id });
  },

  setName: (name) => {
    set({ name });
  },
  
  setParentId: (parent_id) => {
    set({ parent_id });
  },

  setOrder: (order) => {
    set({ order });
  },
  
  clearData: () => {
    set({ id: "", name: "", parent_id: "", order: "" });
  }
});

export const useStatusStore = create(
  devtools(
    persist(storeApi, {
      name: "status-storage",
      storage: createJSONStorage(() => encryptLocalStorage)
    })
  )
);
