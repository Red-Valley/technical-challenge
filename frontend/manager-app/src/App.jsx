import { Suspense } from 'react';
import {
  RouterProvider,
} from "react-router";
import './App.css'
import { router } from './router/router';

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App
