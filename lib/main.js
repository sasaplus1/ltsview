var fs = require('fs'),
    ltsv = require('ltsv'),
    stream = require('./stream');


/**
 * execute ltsview.
 *
 * @param {Object} param option parameter.
 */
function execute(param) {
  var args = param.args;

  if (args.length > 0) {
    args.forEach(function(arg) {
      // NOTE: do not reuse stream.
      fs.createReadStream(arg)
          .pipe(ltsv.createLtsvToJsonStream({
            toObject: true
          }))
          .pipe(stream.createLtsviewStream({
            ignores: param.ignoreKeys,
            filters: param.keys,
            color: param.color
          }))
          .pipe(process.stdout);
    });
  } else {
    process.stdin
        .pipe(ltsv.createLtsvToJsonStream({
          toObject: true
        }))
        .pipe(stream.createLtsviewStream({
          ignores: param.ignoreKeys,
          filters: param.keys,
          color: param.color
        }))
        .pipe(process.stdout);
  }
}


/**
 * export.
 */
module.exports = {
  execute: execute
};
