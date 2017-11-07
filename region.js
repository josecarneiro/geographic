'use strict';

const { Base } = require('./common');

// const geo = require('geolib');

const Path = require('./path');

module.exports = class Region extends Base {
  constructor (paths, options) {
    super({
      options
    });
    this._paths = [];
    this.paths = paths;
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
      this._paths = [ new Path(paths) ];
    }
  }

  get paths () {
    return this._paths;
  }

  // get area () {}

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
};
