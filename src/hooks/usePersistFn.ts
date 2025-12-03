import { useRef, useEffect, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePersistFn<T extends (...args: any[]) => any>(fn: T): T {
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stableFn = useCallback((...args: any[]) => {
    const callable = fnRef.current;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (callable as any)(...args);
  }, []);

  return stableFn as T;
}