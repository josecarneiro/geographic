'use strict';

const { Base } = require('./lib/common');

module.exports = class Point extends Base {
  constructor (coordinates, options) {
    const defaults = {
      inverted: false,
      format: 'normal',
      // 0.11m of precision.
      precision: 6
    };
    if (typeof options === 'boolean') options = { inverted: options };
    super({
      defaults,
      options
    });
    this._coordinates = {};
    this.coordinates = coordinates;
  }

  set coordinates (coordinates) {
    if (!coordinates) {
      throw new Error('Wrong arguments.');
    }
    // OTHER GEO POINT OBJECT
    else if (coordinates && coordinates.constructor.name === 'Point') {
      this.coordinates = coordinates.coordinates;
    }
    // ARRAY WITH LONGITUDE AND LATITUDE
    else if (coordinates instanceof Array && coordinates.length === 2) {
      if (this._options.inverted) {
        this._coordinates = {
          latitude: coordinates[1],
          longitude: coordinates[0]
        };
      } else {
        this._coordinates = {
          latitude: coordinates[0],
          longitude: coordinates[1]
        };
      }
    }
    // BROWSER GEOLOCATION
    else if (coordinates.constructor && coordinates.constructor.name === 'Position') {
      this._coordinates = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude
      };
    }
    // IF SIMPLE LATITUDE AND LONGITUDE OBJECT
    else if (coordinates.lat && coordinates.long) {
      this._coordinates = {
        latitude: coordinates.lat,
        longitude: coordinates.long
      };
    } else if (coordinates.lat && coordinates.lng) {
      this._coordinates = {
        latitude: coordinates.lat,
        longitude: coordinates.lng
      };
    } else if (coordinates.latitude && coordinates.longitude) {
      this._coordinates = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      };
    }
    // IF NONE OF THE CONDITIONS MATCH,
    // THROW ERROR
    else {
      throw new Error('Wrong arguments.');
    }

    // ENSURE COORDINATES ARE NUMERIC
    if (typeof this._coordinates.latitude === 'string') {
      this._coordinates.latitude = parseFloat(this._coordinates.latitude);
    }
    if (typeof this._coordinates.longitude === 'string') {
      this._coordinates.longitude = parseFloat(this._coordinates.longitude);
    }

    // VERIFY COORDINATES ARE VALID
    if (
      typeof this._coordinates.latitude !== 'number' ||
      typeof this._coordinates.longitude !== 'number' ||
      this._coordinates.latitude > 90 ||
      this._coordinates.latitude < -90 ||
      this._coordinates.longitude > 180 ||
      this._coordinates.longitude < -180
    ) {
      throw new Error('Coordinates are invalid.');
    }
    
    // OPTIONS PRECISION
    if (typeof this._options.precision === 'number') {
      Object.keys(this._coordinates).map(key => {
        this._coordinates[key] = parseFloat(this._coordinates[key].toFixed(this._options.precision));
      });
    }
  }

  get coordinates () {
    return this._coordinates;
  }

  get short () {
    return {
      lat: this._coordinates.latitude,
      long: this._coordinates.longitude
    };
  }

  get shortest () {
    return {
      lat: this._coordinates.latitude,
      lng: this._coordinates.longitude
    };
  }

  get array () {
    return [ this._coordinates.latitude, this._coordinates.longitude ];
  }

  get arrayInverted () {
    return [ this._coordinates.longitude, this._coordinates.latitude ];
  }

  toJSON () {
    return this._coordinates;
  }

  toGeoJSON (properties) {
    let object = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: this.arrayInverted
      }
    };
    if (properties !== undefined) object.properties = properties;
    return object;
  }
};
