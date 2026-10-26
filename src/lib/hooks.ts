import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/**
 * useMounted Hook
 * Safe client-side mount detection without cascading renders or hydration mismatch.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {};
  }
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

/**
 * usePrefersReducedMotion Hook
 * Responsive, accessible hook tracking OS reduced-motion preferences.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
    () => false
  );
}
