var assert = require('assert'),
    os = require('os'),
    stream = require('stream'),
    util = require('util'),
    colors = require('colors'),
    ltsview = require('../lib/ltsview');

function createWritableStream() {
  var wstream = new stream,
      chunks = [];

  wstream.write = function(data) {
    chunks.push(data);
  };

  wstream.getData = function() {
    return chunks;
  };

  return wstream;
}

suite('ltsviewのテスト', function() {

  suite('getOnError_関数のテスト', function() {

    var ws;

    setup(function() {
      ws = createWritableStream();
    });

    teardown(function() {
      ws = null;
    });

    suite('出力に関するテスト', function() {

      test('メッセージが出力されること', function() {
        var onError = ltsview.getOnError_(ws, {});

        onError('error message');
        assert.deepEqual(ws.getData(), [
              '[error message]' + os.EOL
            ], 'output should be "[error message]" + os.EOL');
      });

    });
  });

  suite('getOnData_関数のテスト', function() {

    var ws;

    setup(function() {
      ws = createWritableStream();
    });

    teardown(function() {
      ws = null;
    });

    suite('色に関するテスト', function() {

      test('ラベルがマゼンタに、値が緑に色付けされていること', function() {
        var onData = ltsview.getOnData_(ws, {
          filters: null,
          ignores: null,
          noColor: false
        });

        onData({label1: 'value1'});
        onData({label2: 'value2'});
        onData({label3: 'value3'});

        assert.deepEqual(ws.getData(), [
              util.format('---%s%s: %s%s',
                os.EOL, 'label1'.magenta, 'value1'.green, os.EOL),
              util.format('---%s%s: %s%s',
                os.EOL, 'label2'.magenta, 'value2'.green, os.EOL),
              util.format('---%s%s: %s%s',
                os.EOL, 'label3'.magenta, 'value3'.green, os.EOL)
            ], 'output should be coloring');
      });

      test('ラベルと値が色付けされないこと', function() {
        var onData = ltsview.getOnData_(ws, {
          filters: null,
          ignores: null,
          noColor: true
        });

        onData({label1: 'value1'});
        onData({label2: 'value2'});
        onData({label3: 'value3'});

        assert.deepEqual(ws.getData(), [
              util.format('---%s%s: %s%s', os.EOL, 'label1', 'value1', os.EOL),
              util.format('---%s%s: %s%s', os.EOL, 'label2', 'value2', os.EOL),
              util.format('---%s%s: %s%s', os.EOL, 'label3', 'value3', os.EOL)
            ], 'output should not be coloring');
      });

    });

    suite('キーに関するテスト', function() {

      test('filtersで指定されたキーのみ出力されること', function() {
        var onData = ltsview.getOnData_(ws, {
          filters: ['l1', 'l2', 'l5', 'l6'],
          ignores: null,
          noColor: true
        });

        onData({l1: 'v1', l2: 'v2'});
        onData({l3: 'v3', l4: 'v4'});
        onData({l5: 'v5', l6: 'v6'});

        assert.deepEqual(ws.getData(), [
              util.format('---%s%s: %s%s%s: %s%s',
                os.EOL, 'l1', 'v1', os.EOL, 'l2', 'v2', os.EOL),
              util.format('---%s%s: %s%s%s: %s%s',
                os.EOL, 'l5', 'v5', os.EOL, 'l6', 'v6', os.EOL)
            ], 'output should be print l1, l2, l5, l6');
      });

      test('ignoresで指定されたキー以外が出力されること', function() {
        var onData = ltsview.getOnData_(ws, {
          filters: null,
          ignores: ['l1', 'l2', 'l5', 'l6'],
          noColor: true
        });

        onData({l1: 'v1', l2: 'v2'});
        onData({l3: 'v3', l4: 'v4'});
        onData({l5: 'v5', l6: 'v6'});

        assert.deepEqual(ws.getData(), [
              util.format('---%s%s: %s%s%s: %s%s',
                os.EOL, 'l3', 'v3', os.EOL, 'l4', 'v4', os.EOL)
            ], 'output should be print l3, l4');
      });

      test('filtersで指定され、ignoresで指定されていないキーが出力されること',
          function() {
            var onData = ltsview.getOnData_(ws, {
              filters: ['l3', 'l4'],
              ignores: ['l1', 'l2', 'l4', 'l5', 'l6'],
              noColor: true
            });

            onData({l1: 'v1', l2: 'v2'});
            onData({l3: 'v3', l4: 'v4'});
            onData({l5: 'v5', l6: 'v6'});

            assert.deepEqual(ws.getData(), [
                  util.format('---%s%s: %s%s', os.EOL, 'l3', 'v3', os.EOL)
                ], 'output should be print l3, l4');
          });

    });

  });

});
