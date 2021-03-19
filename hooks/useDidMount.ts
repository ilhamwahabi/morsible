import { useEffect, useRef } from 'react';

export const useDidMount = (fn: Function, deps: any[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) fn();
    else didMount.current = true;
  }, deps);
}