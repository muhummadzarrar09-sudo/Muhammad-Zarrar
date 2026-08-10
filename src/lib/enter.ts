import { useSyncExternalStore } from "react";

/**
 * App-enter signal — lets the preloader choreograph the page reveal.
 * The preloader fires `signalAppEnter()` just before it lifts, so hero
 * animations start while the overlay is still sliding away (the classic
 * "reveal" rhythm) instead of finishing invisibly behind it.
 */

let entered = false;
const listeners = new Set<() => void>();

export function signalAppEnter() {
  if (entered) return;
  entered = true;
  listeners.forEach((fn) => fn());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot() {
  return entered;
}

export function useAppEnter(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot);
}
