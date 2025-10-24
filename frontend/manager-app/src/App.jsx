import { Suspense } from 'react';
import {
  RouterProvider,
} from "react-router";
import './App.css'
import { router } from './router/router';
import { addMethod, string } from 'yup';
import { injectionValidate } from './utils/validation/injectionValidate';

function App() {

  addMethod(string, 'isNotInjection', injectionValidate);

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App
