'use strict';

const { GenericGeographicClass } = require('./lib/common');
const geo = require('geolib');

const Point = require('./point');

module.exports = class Path extends GenericGeographicClass {
  constructor (points, options) {
    super({ options });
    this._points = [];
    this.points = points;
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
        this._points.push(new Point(point, this._options));
      }
    }
  }

  add (point) {
    this._points.push(new Point(point, this._options));
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
    return geo.getPathLength(this._points.map(({ coordinates }) => coordinates));
  }

  get direction () {
    return geo.getGreatCircleBearing(this.start.coordinates, this.end.coordinates) % 360 / 360;
  }

  get count () {
    return this._points.length;
  }

  toJSON () {
    return this._points.map(point => point.toJSON());
  }

  toGeoJSON (properties) {
    return {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: this.toJSON()
      },
      ...properties && { properties }
    };
  }
};
