import { Alpine as AlpineInterface } from 'alpinejs'

declare module 'alpinejs' {
  /**
   * @see https://github.com/archtechx/alpine-typescript/blob/master/src/index.ts ```
   *  original source for less strict types but provides more API documentation
   * ```
   */
  abstract class AlpineComponent<T> {
    /**
     * Retrieve the root component DOM node.
     */
    public readonly $el: HTMLElement

    /**
     * Retrieve DOM elements marked with x-ref inside the component.
     */
    public readonly $refs: { [name: string]: HTMLElement }

    /**
     * Create a CustomEvent and dispatch it using .dispatchEvent() internally.
     */
    public $dispatch:<
      K extends keyof HTMLElementEventMap,
      V extends (HTMLElementEventMap[K] extends CustomEvent ? HTMLElementEventMap[K]['detail'] : unknown),
    > (
      event: K,
      data?: V,
    ) => void

    /**
     * Execute a given expression AFTER Alpine has made its reactive DOM updates.
     */
    public $nextTick: (callback: () => void) => void

    /**
     * Will fire a provided callback when a component property you "watched" gets changed.
     */
    public $watch:<K extends keyof T> (
      property: K,
      callback: (newValue: T[K], oldValue?: T[K]) => void,
    ) => void

    /**
     * Will be executed before Alpine initializes teh rest of the component.
     */
    public init?(): void
  }

  export interface Alpine extends AlpineInterface {
    /**
     * Provides a way to reuse x-data contexts within your application.
     *
     * @param name the id of the x-data context
     * @param callback the initializer of the x-data context
     */
    data(name: string, callback: (...initialStateArgs: unknown[]) => AlpineComponent): void;
  }
}

declare module '@alpinejs/intersect' {
}
