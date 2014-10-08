var expect = require('expect.js'),
    stream = require('../lib/stream');

describe('LtsviewStream', function() {

  describe('filter options', function() {

    it('should filter keys', function(done) {
      var text = '',
          ls = stream.createLtsviewStream({
            filters: ['label1'],
            color: false
          });

      ls.on('readable', function() {
        var buf;

        while ((buf = ls.read()) !== null) {
          text += buf;
        }
      });
      ls.on('end', function() {
        expect(text).to.be(
            '---\nlabel1: value1\n');
        done();
      });

      ls.end({label1: 'value1', label2: 'value2'});
    });

    it('should ignore keys', function(done) {
      var text = '',
          ls = stream.createLtsviewStream({
            ignores: ['label1'],
            color: false
          });

      ls.on('readable', function() {
        var buf;

        while ((buf = ls.read()) !== null) {
          text += buf;
        }
      });
      ls.on('end', function() {
        expect(text).to.be(
            '---\nlabel2: value2\n');
        done();
      });

      ls.end({label1: 'value1', label2: 'value2'});
    });

    it('should filter keys, and ignore keys', function(done) {
      var text = '',
          ls = stream.createLtsviewStream({
            ignores: ['label1'],
            filters: ['label3'],
            color: false
          });

      ls.on('readable', function() {
        var buf;

        while ((buf = ls.read()) !== null) {
          text += buf;
        }
      });
      ls.on('end', function() {
        expect(text).to.be(
            '---\nlabel3: value3\n');
        done();
      });

      ls.end({label1: 'value1', label2: 'value2', label3: 'value3'});
    });

  });

  describe('color option', function() {

    it('should coloring output', function(done) {
      var text = '',
          ls = stream.createLtsviewStream({
            color: true
          });

      ls.on('readable', function() {
        var buf;

        while ((buf = ls.read()) !== null) {
          text += buf;
        }
      });
      ls.on('end', function() {
        expect(text).to.be(
            '---\n\u001b[35mlabel\u001b[39m: \u001b[32mvalue\u001b[39m\n');
        done();
      });

      ls.end({label: 'value'});
    });

    it('should not coloring output', function(done) {
      var text = '',
          ls = stream.createLtsviewStream({
            color: false
          });

      ls.on('readable', function() {
        var buf;

        while ((buf = ls.read()) !== null) {
          text += buf;
        }
      });
      ls.on('end', function() {
        expect(text).to.be(
            '---\nlabel: value\n');
        done();
      });

      ls.end({label: 'value'});
    });

  });

});
