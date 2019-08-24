'use strict';

const { GenericGeographicClass } = require('./lib/common');
const geoHash = require('./lib/geohash');

module.exports = class Point extends GenericGeographicClass {
  constructor (coordinates, options) {
    const defaults = {
      inverted: false,
      precision: 6 // 0.11m of precision
    };
    if (typeof options === 'boolean') options = { inverted: options };
    if (typeof options === 'number') options = { precision: options };
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
    else if (coordinates && coordinates instanceof this.constructor) {
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
    else if (coordinates.coords && coordinates.coords.latitude && coordinates.coords.longitude) {
      this.coordinates = [
        coordinates.coords.latitude,
        coordinates.coords.longitude
      ];
    }
  
    // IF SIMPLE LATITUDE AND LONGITUDE OBJECT
    else if (coordinates.lat && coordinates.long) {
      this.coordinates = [
        coordinates.lat,
        coordinates.long
      ];
    } else if (coordinates.lat && coordinates.lng) {
      this.coordinates = [
        coordinates.lat,
        coordinates.lng
      ];
    } else if (coordinates.latitude && coordinates.longitude) {
      this.coordinates = [
        coordinates.latitude,
        coordinates.longitude
      ];
    }
  
    // IF GEOHASH
    else if (typeof coordinates === 'string') {
      let [ latitude, longitude ] = geoHash.decode(coordinates);
      this.coordinates = [
        latitude,
        longitude
      ];
    }
  
    // IF NONE OF THE CONDITIONS MATCH, THROW ERROR
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
      Object.entries(this._coordinates).map(([ key, value ]) => {
        this._coordinates[key] = parseFloat(value.toFixed(this._options.precision));
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

  get geohash () {
    return geoHash.encode(this.array);
  }

  toJSON () {
    return this._coordinates;
  }

  toGeoJSON (properties) {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: this.arrayInverted
      },
      ...properties && { properties }
    };
  }
};
