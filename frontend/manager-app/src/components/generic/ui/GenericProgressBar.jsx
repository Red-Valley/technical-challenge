import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import { decrement, increment } from './loadCounter';

export default function GenericProgressBar() {
  useEffect(() => {
    increment();

    return () => {
      decrement();
    };
  }, []);

  return null;
}