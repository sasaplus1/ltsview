var assert = require('assert'),
    keyChecker = require('../lib/key_checker');

suite('KeyCheckerのテスト', function() {

  suite('コンストラクタのテスト', function() {

    test('filterKeys, ignoreKeysを指定しないで生成できること', function() {
      var kc = new keyChecker;

      assert.deepEqual(kc.filterKeys_, [], 'filterKeys_ should be []');
      assert.deepEqual(kc.ignoreKeys_, [], 'ignoreKeys_ should be []');
    });

    test('filterKeys, ignoreKeysを指定して生成できること', function() {
      var kc = new keyChecker(['1', '2', '3'], ['a', 'b', 'c']);

      assert.deepEqual(kc.filterKeys_, ['1', '2', '3'],
          'filterKeys_ should be ["1", "2", "3"]');
      assert.deepEqual(kc.ignoreKeys_, ['a', 'b', 'c'],
          'ignoreKeys_ should be ["a", "b", "c"]');
    });

  })

  suite('isFilterKeyメソッドのテスト', function() {

    test('filterKeysを指定せずに実行し、常にfalseが返ること', function() {
      var kc = new keyChecker;

      assert.ok(!kc.isFilterKey('123'),
          'isFilterKey("123") should be returned false');
      assert.ok(!kc.isFilterKey('456'),
          'isFilterKey("456") should be returned false');
      assert.ok(!kc.isFilterKey('789'),
          'isFilterKey("789") should be returned false');
    });

    test('filterKeysを指定して実行し、一致した場合trueが返ること', function() {
      var kc = new keyChecker(['123', '456', '789']);

      assert.ok(kc.isFilterKey('123'),
          'isFilterKey("123") should be returned true');
      assert.ok(kc.isFilterKey('456'),
          'isFilterKey("456") should be returned true');
      assert.ok(kc.isFilterKey('789'),
          'isFilterKey("789") should be returned true');
    });

    test('filterKeysを指定して実行し、一致しない場合falseが返ること', function() {
      var kc = new keyChecker(['123', '456', '789']);

      assert.ok(!kc.isFilterKey('abc'),
          'isFilterKey("abc") should be returned false');
      assert.ok(!kc.isFilterKey('def'),
          'isFilterKey("def") should be returned false');
      assert.ok(!kc.isFilterKey('ghi'),
          'isFilterKey("ghi") should be returned false');
    });

  });

  suite('isIgnoreKeyメソッドのテスト', function() {

    test('ignoreKeysを指定せずに実行し、常にfalseが返ること', function() {
      var kc = new keyChecker([]);

      assert.ok(!kc.isIgnoreKey('123'),
          'isIgnoreKey("123") should be returned false');
      assert.ok(!kc.isIgnoreKey('456'),
          'isIgnoreKey("456") should be returned false');
      assert.ok(!kc.isIgnoreKey('789'),
          'isIgnoreKey("789") should be returned false');
    });

    test('ignoreKeysを指定して実行し、一致した場合trueが返ること', function() {
      var kc = new keyChecker([], ['123', '456', '789']);

      assert.ok(kc.isIgnoreKey('123'),
          'isIgnoreKey("123") should be returned true');
      assert.ok(kc.isIgnoreKey('456'),
          'isIgnoreKey("456") should be returned true');
      assert.ok(kc.isIgnoreKey('789'),
          'isIgnoreKey("789") should be returned true');
    });

    test('ignoreKeysを指定して実行し、一致しない場合falseが返ること', function() {
      var kc = new keyChecker([], ['123', '456', '789']);

      assert.ok(!kc.isIgnoreKey('abc'),
          'isIgnoreKey("abc") should be returned false');
      assert.ok(!kc.isIgnoreKey('def'),
          'isIgnoreKey("def") should be returned false');
      assert.ok(!kc.isIgnoreKey('ghi'),
          'isIgnoreKey("ghi") should be returned false');
    });

  });

  suite('hasFilterKeyメソッドのテスト', function() {

    test('filterKeysを指定していない場合、falseを返すこと', function() {
      var kc = new keyChecker;

      assert.ok(!kc.hasFilterKey(), 'hasFilterKey() should be returned false');
    });

    test('filterKeysを指定している場合、trueを返すこと', function() {
      var kc = new keyChecker(['1']);

      assert.ok(kc.hasFilterKey(), 'hasFilterKey() should be returned true');
    });

  });

  suite('hasIgnoreKeyメソッドのテスト', function() {

    test('ignoreKeysを指定していない場合、falseを返すこと', function() {
      var kc = new keyChecker;

      assert.ok(!kc.hasIgnoreKey(), 'hasIgnoreKey() should be returned false');
    });

    test('ignoreKeysを指定している場合、trueを返すこと', function() {
      var kc = new keyChecker([], ['1']);

      assert.ok(kc.hasIgnoreKey(), 'hasIgnoreKey() should be returned true');
    });

  });

});
