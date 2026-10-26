/**
 * Accessibility (WCAG 2.2 AA) Utilities
 */

import { KeyboardEvent } from 'react';

/**
 * Handles Enter and Space keyboard activations for custom interactive elements.
 * Ensures div/span interactions are fully keyboard operable.
 */
export function handleKeyboardActivation(
  event: KeyboardEvent<HTMLElement>,
  action: () => void
) {
  if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
    event.preventDefault();
    action();
  }
}

/**
 * Safe SSR-compatible check for prefers-reduced-motion media query.
 */
export function isReducedMotionPreferred(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
