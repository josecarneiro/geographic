const version = require('./../package').version;

module.exports = class Point {
  constructor (coordinates, options) {
    this.name = 'Point';
    this.version = version;
    this._coordinates = {};
    this._options = {};
    this._defaults = {
      inverted: false,
      format: 'normal',
      precision: null
    };
    if (typeof options === 'boolean') options = { inverted: options };
    this.options = options;
    this.coordinates = coordinates;
  }

  set options (options) {
    this._options = Object.assign(this._defaults, options);
  }

  get options () {
    return this._options;
  }

  set coordinates (coordinates) {
    /* eslint brace-style: 0 */
    if (!coordinates) {
      throw new Error('Wrong arguments.');
    }
    // ARRAY WITH LONGITUDE AND LATITUDE
    else if (coordinates instanceof Array && coordinates.length === 2) {
      // if (coordinates)
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
    else if (coordinates.constructor && coordinates.constructor.name === 'Geoposition') {
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
    // OTHER GEO POINT OBJECT
    else if (coordinates && coordinates.name === 'Point') {
      this._coordinates = coordinates.coordinates;
    }
    // IF NONE OF THE CONDITIONS MATCH,
    // THROW ERROR
    else {
      throw new Error('Wrong arguments.');
    }
    // OPTIONS PRECISION
    if (typeof this._options.precision === 'number') {
      Object.keys(this._coordinates).map(key => {
        this._coordinates[key] = this._coordinates[key].toFixed(this._options.precision);
      });
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
  }

  get coordinates () {
    return this._coordinates;
  }

  get shortest () {
    return {
      lat: this._coordinates.latitude,
      lng: this._coordinates.longitude
    };
  }

  get short () {
    return {
      lat: this._coordinates.latitude,
      long: this._coordinates.longitude
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

  static version () {
    return version;
  }
};
