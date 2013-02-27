// ltsview Copyright(c) 2013 sasa+1
// https://github.com/sasaplus1/ltsview
// Released under the MIT License.

var fs = require('fs'),
    commander = require('commander'),
    package = require('../package');

process.on('uncaughtException', function(err) {
  console.error(err.stack);
  process.exit(1);
});

commander
  .version(package.version)
  .usage('[options]')
  .option('-f, --file <file>', 'read from file')
  .option('-k, --keys <key,...>', 'filter keys')
  .option('-i, --ignore-keys <key,...>', 'ignore keys')
  .option('--no-color', 'no coloring')
  .option('-s, --strict', 'parse strict')
  .parse(process.argv);

require('./ltsview').execute({
  filterKeys: commander.keys,
  ignoreKeys: commander.ignoreKeys,
  noColor: commander.color,
  isStrict: commander.strict
}, (commander.file) ? fs.createReadStream(commander.file) : process.stdin);
