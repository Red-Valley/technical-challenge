import { QueryCache, QueryClient } from "@tanstack/react-query";
import { errorAlert } from "../alert/alertService";

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    },
    queryCache: new QueryCache({
      onError: (error) => {
        let message = '';

        const messageIsString = typeof error.response.data.message === 'string';
        const messageIsArray = Array.isArray(error.response.data.message);

        if (!error.response.data.message || (!messageIsString && !messageIsArray)) {
          message = 'Ha ocurrido un error inesperado.';
        } else if(messageIsString) {
          message = error.response.data.message;
        } else if(messageIsArray) {
          message = error.response.data.message[0];
        }

        errorAlert({ message });
      },
    }),
  });