'use strict';

/* DEPENDENCIES */

const { expect } = require('chai');
const { version } = require('./../package');
const Point = require('./../point');

/* POINT TESTS */

describe('Point', () => {

  /* POINT CONSTRUCTORS */

  it('should generate Point from latitude and longitude', () => {
    let point = new Point({ latitude: -5, longitude: 26 });
    expect(point.coordinates).to.have.property('latitude', -5);
    expect(point.coordinates).to.have.property('longitude', 26);
  });

  it('should generate Point from lat and long', () => {
    let point = new Point({ lat: 12, long: 13 });
    expect(point.coordinates).to.have.property('latitude', 12);
    expect(point.coordinates).to.have.property('longitude', 13);
  });

  it('should generate Point from lat and lng', () => {
    let point = new Point({ lat: 74, lng: -104 });
    expect(point.coordinates).to.have.property('latitude', 74);
    expect(point.coordinates).to.have.property('longitude', -104);
  });

  it('should generate Point from array', () => {
    let point = new Point([ 43, 56 ]);
    expect(point.coordinates).to.have.property('latitude', 43);
    expect(point.coordinates).to.have.property('longitude', 56);
  });

  it('should generate Point from inverted array', () => {
    let point = new Point([ -145, -23 ], true);
    expect(point.coordinates).to.have.property('latitude', -23);
    expect(point.coordinates).to.have.property('longitude', -145);
  });

  it('should generate Point from object with strings.', () => {
    let point = new Point([ '-56.9472', '128.3824' ]);
    expect(point.coordinates).to.have.property('latitude', -56.9472);
    expect(point.coordinates).to.have.property('longitude', 128.3824);
  });

  it('should generate Point from simulated "Position" browser interface.', () => {
    let position = { coords: new Point([ 10, 12 ]).coordinates };
    let point = new Point(position);
    expect(point.coordinates).to.have.property('latitude', 10);
    expect(point.coordinates).to.have.property('longitude', 12);
  });

  it('should generate Point from geohash.', () => {
    let point = new Point('u4xsu6jhrms7');
    expect(point.coordinates).to.have.property('latitude', 59.909207);
    expect(point.coordinates).to.have.property('longitude', 10.740826);
  });

  it('should generate set coordinates to precision', () => {
    let point = new Point({ latitude: -5.123456, longitude: 25.654321 }, { precision: 3 });
    expect(point.coordinates).to.have.property('latitude', -5.123);
    expect(point.coordinates).to.have.property('longitude', 25.654);
  });

  /* OUTPUT OBJECT IN SEVERAL FORMATS */

  it('should output Point as Array', () => {
    let point = new Point([ 10.1, 125.6 ]);
    let inverted = point.array;
    expect(inverted).to.be.instanceof(Array);
    expect(inverted[0]).to.equal(10.1);
    expect(inverted[1]).to.equal(125.6);
  });

  it('should output Point as inverted Array', () => {
    let point = new Point([ 10.1, 125.6 ]);
    let inverted = point.arrayInverted;
    expect(inverted).to.be.instanceof(Array);
    expect(inverted[0]).to.equal(125.6);
    expect(inverted[1]).to.equal(10.1);
  });

  it('should output Point as Geohash', () => {
    let point = new Point([ 59.909207, 10.740826 ]);
    let geohash = point.geohash;
    expect(geohash).to.equal('u4xsu6jhrms7');
  });

  it('should output Point as GeoJSON feature', () => {
    let point = new Point([ 10.1, 125.6 ]);
    let object = point.toGeoJSON({ name: 'Dinagat Islands' });
    expect(object).to.have.property('type', 'Feature');
    expect(object).to.have.property('geometry');
    expect(object.geometry).to.have.property('type', 'Point');
    expect(object.geometry).to.have.property('coordinates');
    expect(object.geometry.coordinates).to.be.instanceof(Array);
    expect(object.geometry.coordinates[0]).to.equal(125.6);
    expect(object.geometry.coordinates[1]).to.equal(10.1);
    expect(object).to.have.property('properties');
    expect(object.properties).to.have.property('name', 'Dinagat Islands');
  });

  it('should stringify to JSON should only output coordinates', () => {
    let point = JSON.parse(JSON.stringify(new Point([ -30, 60 ])));
    expect(point).to.have.property('latitude', -30);
    expect(point).to.have.property('longitude', 60);
  });

  /* THROWN ERRORS */

  it('should throw error from invalid latitude', () => {
    expect(() => new Point({ latitude: 105, longitude: 21 }))
      .to.throw(Error, 'Coordinates are invalid.');
  });

  it('should throw error from invalid longitude', () => {
    expect(() => new Point({ latitude: 50, longitude: -190 }))
      .to.throw(Error, 'Coordinates are invalid.');
  });

  it('should throw error from invalid arguments', () => {
    const message = 'Wrong arguments.';
    expect(() => new Point())
      .to.throw(Error, message);
    expect(() => new Point(null))
      .to.throw(Error, message);
    expect(() => new Point(123))
      .to.throw(Error, message);
    expect(() => new Point({ l: 10, a: 20 }))
      .to.throw(Error, message);
    expect(() => new Point([ 25 ]))
      .to.throw(Error, message);
    expect(() => new Point([ 10, 25, 39 ]))
      .to.throw(Error, message);
  });

  /* UTIL INFO */

  it('should get correct package version', () => {
    let point = new Point([ 0, 0 ]);
    expect(point.version).to.equal(version);
    expect(Point.version()).to.equal(version);
  });

  it('should be instance of "Point"', () => {
    const point = new Point([ 0, 0 ]);
    expect(point.name).to.equal('Point');
    expect(point.constructor.name).to.equal('Point');
    expect(point).to.be.instanceof(Point);
  });
});
