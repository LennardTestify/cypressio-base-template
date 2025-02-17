// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, promise) => {
  // we expect a 3rd party library error with message 'talk-chat'
  // and don't want to fail the test so we return false
  if (err.message.includes('o.removeEventListener')) {
    return false;
  }

  // when the exception originated from an unhandled promise
  // rejection, the promise is provided as a third argument
  // you can turn off failing the test in this case
  if (promise) {
    return false;
  }
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test
});

beforeEach(function() {
  let testSuite = Cypress.env('SUITE');
  if (!testSuite) {
    return;
  }
  
  const testName = Cypress.mocha.getRunner().test.fullTitle();
  testSuite = "<"+testSuite+">"
  if (!testName.includes(testSuite)) {
    this.skip();
  }
})
