import 'alpinejs'

declare module 'alpinejs' {
  export interface AlpineComponent<T> {
    /**
     * Retrieve the current DOM node.
     */
    $el: HTMLElement

    /**
     * Retrieve DOM elements marked with x-ref inside the component.
     */
    $refs: Record<string, HTMLElement>

    /**
     * Dispatch browser events.
     */
    $dispatch: <
      K extends keyof HTMLElementEventMap,
      V extends (HTMLElementEventMap[K] extends CustomEvent ? HTMLElementEventMap[K]['detail'] : unknown),
    > (event: K, data?: V) => void

    /**
     * Execute a given expression AFTER Alpine has made its reactive DOM updates.
     */
    $nextTick: (callback: () => void) => void

    /**
     * Fire the given callback when the value in the property is changed.
     */
    $watch: <
      K extends keyof T,
      V extends T[K],
    >(property: K, callback: (value: V, oldValue: V) => void) => void
  }
}
