'use strict';

const { version } = require('./../package');

const geo = require('geolib');

const Point = require('./../point');

module.exports = class Path {
  constructor (points, options) {
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
    if (!points) {
      throw new Error('Wrong arguments.');
    } else if (points instanceof this.constructor) {
      this.points = points.points;
    } else if (!(points instanceof Array)) {
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
    return geo.getDistance(this.start.coordinates, this.end.coordinates);
  }

  get length () {
    let distance = 0;
    for (let index = 0; index < this.points.length; index++) {
      if (index) {
        distance += geo.getDistance(this.points[index - 1].coordinates, this.points[index].coordinates);
      } 
    }
    return distance;
  }

  get direction () {
    return (geo.getBearing(this.start.coordinates, this.end.coordinates) % 360) / 360;
  }

  get count () {
    return this._points.length;
  }

  get name () {
    return this.constructor.name;
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
