export type Component = Record<string, unknown>

export type Dispatch = <
  K extends keyof HTMLElementEventMap,
  V extends (HTMLElementEventMap[K] extends CustomEvent ? HTMLElementEventMap[K]['detail'] : unknown),
> (event: K, data?: V) => void

export type Element = HTMLElement

export type NextTick = (callback: () => void) => void

export type Refs = Record<string, HTMLElement>;

export type Watch<T> = <K extends keyof T>(
  property: K,
  callback: (newValue: T[K], oldValue: T[K]) => void,
) => void
