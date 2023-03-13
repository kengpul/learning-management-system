export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      getByData(value: string): Chainable<JQuery<HTMLElement>>;
      login(): void;
    }
  }
}
