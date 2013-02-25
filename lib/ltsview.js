// ltsview Copyright(c) 2013 sasa+1
// https://github.com/sasaplus1/ltsview
// Released under the MIT License.

var os = require('os'),
    util = require('util'),
    colors = require('colors'),
    ltsv = require('ltsv'),
    keyChecker = require('./key_checker');

function getOnError_(writableStream, params) {
  return function(err) {
    writableStream.write(
        util.format('[%s]%s', err, os.EOL));
  };
}

function getOnData_(writableStream, params) {
  var kc = new keyChecker(params.filters, params.ignores);

  return function(data) {
    var output = [],
        keys = Object.keys(data),
        i, len, label, value;

    for (i = 0, len = keys.length; i < len; ++i) {
      if (kc.hasFilterKey() && !kc.isFilterKey(keys[i])) {
        continue;
      }
      if (kc.hasIgnoreKey() && kc.isIgnoreKey(keys[i])) {
        continue;
      }

      label = String(keys[i]);
      value = String(data[keys[i]]);

      if (!params.noColor) {
        label = label.magenta;
        value = value.green;
      }

      output.push(
          util.format('%s: %s', label, value));
    }

    if (output.length > 0) {
      output.unshift('---');
      output.push('');

      writableStream.write(
          output.join(os.EOL));
    }
  };
}

function getOnEnd_(writableStream, params) {
  return function() {
  };
}

function execute(options, readableStream) {
  var params = {
    filters: (options.filterKeys) ? options.filterKeys.split(',') : null,
    ignores: (options.ignoreKeys) ? options.ignoreKeys.split(',') : null,
    noColor: !options.noColor || false
  };

  readableStream.pipe(
      ltsv.createLtsvToJsonStream({ toObject: true, strict: options.isStrict })
        .on('error', getOnError_(process.stderr, params))
        .on('data', getOnData_(process.stdout, params))
        .on('end', getOnEnd_(process.stdout, params)));
}

module.exports =
    (process.env.NODE_ENV === 'test') ? {
      getOnError_: getOnError_,
      getOnData_: getOnData_,
      getOnEnd_: getOnEnd_,
      execute: execute
    } : {
      execute: execute
    };
