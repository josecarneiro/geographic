'use strict';

const { version } = require('./../package');

const geo = require('geolib');

const Point = require('./../point');

module.exports = class Path {
  constructor (points, options) {
    this.name = 'Path';
    this.version = version;
    this._options = {};
    this._defaults = {};
    this._points = [];
    this.options = options;
    this.points = points;
  }

  set options (options) {
    this._options = Object.assign(this._defaults, options || {});
  }

  get options () {
    return this._options;
  }

  set points (points) {
    if (!points || !(points instanceof Array)) {
      throw new Error('Wrong arguments.');
    } else if (points.length < 2) {
      throw new Error('Path requires 2 or more points.');
    } else {
      for (let point of points) {
        this._points.push(new Point(point));
      }
    }
  }

  get points () {
    return this._points;
  }

  get start () {
    return this._points[0];
  }

  get end () {
    return this._points[this._points.length - 1];
  }

  get distance () {
    let distance = 0;
    for (let index = 0; index < this.points.length; index++) {
      if (index) {
        distance += geo.getDistance(this.points[index - 1]._coordinates, this.points[index]._coordinates);
      } 
    }
    return distance;
  }

  toJSON () {
    let path = [];
    for (let point of this._points) {
      path.push(point.toJSON());
    }
    return path;
  }

  add (point) {
    this._points.push(new Point(point));
  }

  static version () {
    return version;
  }
};
