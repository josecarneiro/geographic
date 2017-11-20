'use strict';

const { Base } = require('./common');

const geo = require('./utilities/geolib');

const Point = require('./point');

module.exports = class Path extends Base {
  constructor (points, options) {
    super({
      options
    });
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

  toJSON () {
    let path = [];
    for (let point of this._points) {
      path.push(point.toJSON());
    }
    return path;
  }

  toGeoJSON (properties) {
    let object = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: this.toJSON()
      }
    };
    if (properties !== undefined) object.properties = properties;
    return object;
  }
};
