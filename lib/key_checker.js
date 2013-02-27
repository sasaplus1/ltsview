// ltsview Copyright(c) 2013 sasa+1
// https://github.com/sasaplus1/ltsview
// Released under the MIT License.

var util = require('util');

function KeyChecker(filterKeys, ignoreKeys) {
  this.filterKeys_ = (util.isArray(filterKeys)) ? filterKeys : [];
  this.ignoreKeys_ = (util.isArray(ignoreKeys)) ? ignoreKeys : [];
}

KeyChecker.prototype.isFilterKey = function(key) {
  return this.filterKeys_.indexOf(key) !== -1;
};

KeyChecker.prototype.isIgnoreKey = function(key) {
  return this.ignoreKeys_.indexOf(key) !== -1;
};

KeyChecker.prototype.hasFilterKey = function() {
  return this.filterKeys_.length > 0;
};

KeyChecker.prototype.hasIgnoreKey = function() {
  return this.ignoreKeys_.length > 0;
};

module.exports = KeyChecker;
