'use strict';

const { version } = require('./../package');

class Base {
  constructor (data) {
    this._version = version;
    this._defaults = data.defaults;
    this.options = data.options;
  }

  set options (options) {
    this._options = Object.assign(this._defaults || {}, options || {});
  }

  get options () {
    return this._options;
  }

  get name () {
    return this.constructor.name;
  }

  get version () {
    return this._version;
  }

  static version () {
    return version;
  }
}

module.exports = {
  Base
};
