import { Axios } from "axios";

export const apiClient = new Axios({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});