var assert = require('assert');
var Notebook = require('../dist/Notebook');

describe('Notebook', function() {
  describe('#update()', function() {
    it('should return a new Notebook with the given note and an updated dictionary', function() {
      const notebook = new Notebook.default();
      console.log(notebook);
      assert.equal(notebook.dictionary.size, 0);
    });
  });
});