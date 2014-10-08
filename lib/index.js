var commander = require('commander');


/**
 * collect option string.
 *
 * @param {String} str option string.
 * @param {String[]} memo memo array.
 * @return {String[]} memo memo array.
 */
function collect(str, memo) {
  memo.push(str);

  return memo;
}

commander
  .version(require('../package').version)
  .usage('[options] [file ...]')
  .option('-i, --ignore-keys <key,...>', 'ignore keys', collect, [])
  .option('-k, --keys <key,...>', 'filter keys', collect, [])
  .option('--no-color', 'no coloring')
  .parse(process.argv);

require('./main').execute(commander);
