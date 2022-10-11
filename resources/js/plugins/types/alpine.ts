export type Component = Record<string, unknown>

/**
 * Dispatch browser events.
 */
export type Dispatch = <
  K extends keyof HTMLElementEventMap,
  V extends (HTMLElementEventMap[K] extends CustomEvent ? HTMLElementEventMap[K]['detail'] : unknown),
> (event: K, data?: V) => void

/**
 * Retrieve the current DOM node.
 */
export type Element = HTMLElement

/**
 * Execute a given expression AFTER Alpine has made its reactive DOM updates.
 */
export type NextTick = (callback: () => void) => void

/**
 * Retrieve DOM elements marked with x-ref inside the component.
 */
export type Refs = Record<string, HTMLElement>;

/**
 * Fire the given callback when the value in the property is changed.
 */
export type Watch<T> = <K extends keyof T>(
  property: K,
  callback: (newValue: T[K], oldValue: T[K]) => void,
) => void
