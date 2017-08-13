'use strict';

describe('Geo Library Tests', () => {
  /* BEFORE AND AFTER TEST HOOKS */
  before(done => {
    done();
  });

  after(done => {
    done();
  });

  /* REQUIRE TESTS */
  require('./point');
  require('./path');
  require('./region');
});
