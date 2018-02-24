// ADAPTED FROM Chris Veness's "Geohash encoding/decoding and associated functions"
// https://github.com/chrisveness/latlon-geohash

'use strict';

let Geohash = {};

Geohash.base32 = '0123456789bcdefghjkmnpqrstuvwxyz';

Geohash.encode = ([ latitude, longitude ], precision) => {
  if (typeof precision === 'undefined') {
    for (let p = 1; p <= 12; p++) {
      let hash = Geohash.encode([ latitude, longitude ], p);
      let position = Geohash.decode(hash);
      if (position[0] === latitude && position[1] === longitude) return hash;
    }
    precision = 12;
  }

  latitude = Number(latitude);
  longitude = Number(longitude);
  precision = Number(precision);

  if (isNaN(latitude) || isNaN(longitude) || isNaN(precision)) throw new Error('Invalid geohash');

  let index = 0;
  let bit = 0;
  let evenBit = true;
  let hash = '';

  let latMin = -90;
  let latMax = 90;
  let lonMin = -180;
  let lonMax = 180;

  while (hash.length < precision) {
    if (evenBit) {
      let lonMid = (lonMin + lonMax) / 2;
      if (longitude >= lonMid) {
        index = index * 2 + 1;
        lonMin = lonMid;
      } else {
        index = index * 2;
        lonMax = lonMid;
      }
    } else {
      let latMid = (latMin + latMax) / 2;
      if (latitude >= latMid) {
        index = index * 2 + 1;
        latMin = latMid;
      } else {
        index = index * 2;
        latMax = latMid;
      }
    }
    evenBit = !evenBit;

    if (++bit === 5) {
      hash += Geohash.base32.charAt(index);
      bit = 0;
      index = 0;
    }
  }

  return hash;
};

Geohash.decode = hash => {
  let { sw, ne } = Geohash.bounds(hash);
  // const num = (max, min) => Number(((min + max) / 2).toFixed(Math.floor(2 - Math.log(max - min) / Math.LN10)));
  const num = (max, min) => Number(((min + max) / 2));
  return [ num(sw.lat, ne.lat), num(sw.lon, ne.lon) ];
};

Geohash.bounds = hash => {
  if (hash.length === 0) throw new Error('Invalid hash');

  hash = hash.toLowerCase();

  let evenBit = true;
  let latMin = -90;
  let latMax = 90;
  let lonMin = -180;
  let lonMax = 180;

  for (let i = 0; i < hash.length; i++) {
    let character = hash.charAt(i);
    let index = Geohash.base32.indexOf(character);
    if (index === -1) throw new Error('Invalid hash');

    for (let n = 4; n >= 0; n--) {
      let bitN = index >> n & 1;
      if (evenBit) {
        // longitude
        let lonMid = (lonMin + lonMax) / 2;
        if (bitN === 1) {
          lonMin = lonMid;
        } else {
          lonMax = lonMid;
        }
      } else {
        // latitude
        let latMid = (latMin + latMax) / 2;
        if (bitN === 1) {
          latMin = latMid;
        } else {
          latMax = latMid;
        }
      }
      evenBit = !evenBit;
    }
  }
  return {
    sw: { lat: latMin, lon: lonMin },
    ne: { lat: latMax, lon: lonMax }
  };
};

module.exports = Geohash;
