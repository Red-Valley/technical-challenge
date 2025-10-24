import { Suspense } from "react";
import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "./router/router";
import { addMethod, string } from "yup";
import { injectionValidate } from "./utils/validation/injectionValidate";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/query-client/queryClientService";
import GenericProgressBar from "./components/generic/ui/GenericProgressBar";

function App() {
  addMethod(string, "isNotInjection", injectionValidate);

  return (
    <Suspense fallback={<GenericProgressBar />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
