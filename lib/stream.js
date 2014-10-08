var os = require('os'),
    stream = require('stream'),
    util = require('util'),
    colo = require('colo'),
    ltsv = require('ltsv');


/**
 * inherit from Transform stream.
 */
util.inherits(LtsviewStream, stream.Transform);



/**
 * constructor of LtsviewStream.
 *
 * @private
 * @constructor
 * @param {Object} options options object.
 */
function LtsviewStream(options) {
  var ignores, filters;

  options || (options = {});
  options.objectMode = true;

  stream.Transform.call(this, options);

  options.ignores || (options.ignores = []);
  options.filters || (options.filters = []);

  // split keys
  ignores = options.ignores.map(function(key) {
    return key.split(',');
  });
  filters = options.filters.map(function(key) {
    return key.split(',');
  });

  // flatten
  this._ignores = Array.prototype.concat.apply([], ignores);
  this._filters = Array.prototype.concat.apply([], filters);

  this._color = !!options.color;

  this._hasIgnores = (this._ignores.length > 0);
  this._hasFilters = (this._filters.length > 0);

  this._buffer = [];
}


/**
 * transform chunk.
 *
 * @param {Buffer|Array} chunk chunk string.
 * @param {String} encoding encoding of chunk.
 * @param {Function} callback callback function.
 */
LtsviewStream.prototype._transform = function(chunk, encoding, callback) {
  this._buffer.push(chunk);
  this._append(callback);
};


/**
 * transform end of chunk.
 *
 * @param {Function} callback callback function.
 */
LtsviewStream.prototype._flush = function(callback) {
  this._appendAll(callback);
};


/**
 * append formatted text to stream.
 *
 * @param {Function} callback callback function.
 */
LtsviewStream.prototype._append = function(callback) {
  var i, len, record, output;

  try {
    for (i = 0, len = this._buffer.length; i < len; ++i) {
      record = this._buffer.shift();
      output = this._format(record);

      if (!this.push(output)) {
        this._buffer.unshift(record);
        break;
      }
    }
  } catch (e) {
    return this.emit('error', e);
  }

  (typeof callback === 'function') && callback(null);
};


/**
 * append all formatted text to stream.
 *
 * @param {Function} callback callback function.
 */
LtsviewStream.prototype._appendAll = function(callback) {
  this._append();

  if (this._buffer.length > 0) {
    setImmediate(function() {
      this._appendAll(callback);
    }, this);

    return;
  }

  this.push(null);

  (typeof callback === 'function') && callback(null);
};


/**
 * format record object.
 *
 * @param {Object} record record object.
 * @return {String} formatted text.
 */
LtsviewStream.prototype._format = function(record) {
  var output = [],
      keys = Object.keys(record),
      i, len, label, value;

  for (i = 0, len = keys.length; i < len; ++i) {
    // ignore if not found key in filters
    if (this._hasFilters && this._filters.indexOf(keys[i]) === -1) {
      continue;
    }
    // ignore if found key in ignores
    if (this._hasIgnores && this._ignores.indexOf(keys[i]) !== -1) {
      continue;
    }

    label = String(keys[i]);
    value = String(record[keys[i]]);

    if (this._color) {
      label = colo.magenta(label);
      value = colo.green(value);
    }

    output.push(label + ': ' + value);
  }

  if (output.length > 0) {
    output.unshift('---');
    output.push('');
  }

  return output.join(os.EOL);
};


/**
 * create LtsviewStream instance.
 *
 * @param {Object} options option object.
 * @return {LtsviewStream} LtsviewStream instance.
 */
function createLtsviewStream(options) {
  return new LtsviewStream(options);
}


/**
 * export.
 */
module.exports = {
  createLtsviewStream: createLtsviewStream
};
