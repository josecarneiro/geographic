'use strict';

const { version } = require('./../package');
// const geo = require('geolib');
const Path = require('./../path');

module.exports = class Region {
  constructor (paths, options) {
    this.version = version;
    this._options = {};
    this._defaults = {};
    this._paths = [];
    this.options = options;
    this.paths = paths;
  }

  set options (options) {
    this._options = Object.assign(this._defaults, options || {});
  }

  get options () {
    return this._options;
  }

  set paths (paths) {
    if (!paths) {
      throw new Error('Wrong arguments.');
    } else if (paths instanceof this.constructor) {
      this.paths = paths.paths;
    } else if (paths instanceof Path) {
      this._paths = paths;
    } else if (!(paths instanceof Array)) {
      throw new Error('Wrong arguments.');
    } else if (paths[0] instanceof Array) {
      if (paths[0][0] instanceof Array) {
        for (let path of paths) {
          this._paths.push(new Path(path));
        }
      } else {
        this._paths.push(new Path(paths));
      }
    } else {
      this._paths = new Path(paths);
    }
  }

  get paths () {
    return this._paths;
  }

  // get start () {
  //   return this._points[0];
  // }

  // get end () {
  //   return this._points[this._points.length - 1];
  // }

  // get distance () {
  //   return geo.getDistance(this.start.coordinates, this.end.coordinates);
  // }

  // get length () {
  //   let distance = 0;
  //   for (let index = 0; index < this.points.length; index++) {
  //     if (index) {
  //       distance += geo.getDistance(this.points[index - 1].coordinates, this.points[index].coordinates);
  //     } 
  //   }
  //   return distance;
  // }

  // get direction () {
  //   return (geo.getBearing(this.start.coordinates, this.end.coordinates) % 360) / 360;
  // }

  // get count () {
  //   return this._points.length;
  // }

  get name () {
    return this.constructor.name;
  }

  toJSON () {
    let paths = [];
    for (let path of this._paths) {
      paths.push(path.toJSON());
    }
    return paths;
  }

  add (path) {
    this._paths.push(new Path(path));
  }

  static version () {
    return version;
  }
};
