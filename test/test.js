const assert = require('chai').assert;
const application = require('../app.js');

describe('Application', () => {
  it('returns desired result', () => {
    const args =  [
      [0, 1, 0, 0, 0],
      [1, 0, 0, 1, 1],
      [1, 1, 0, 0, 1],
      [0, 1, 0, 0, 0],
      [1, 0, 0, 0, 1]
    ];
    assert.deepEqual(application(args), '0 0 0 0 0\n1 0 1 1 1\n1 1 1 1 1\n0 1 0 0 0\n0 0 0 0 0')
  })
});
