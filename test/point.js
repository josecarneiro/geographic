'use strict';

/* DEPENDENCIES */
const expect = require('chai').expect;
const Point = require('./../point');

/* EASY ID TESTS */
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
    let point = new Point([ '128.3824', '-56.9472' ], true);
    expect(point.coordinates).to.have.property('latitude', -56.9472);
    expect(point.coordinates).to.have.property('longitude', 128.3824);
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
    expect(() => new Point(null))
    .to.throw(Error, 'Wrong arguments.');
    expect(() => new Point(123))
    .to.throw(Error, 'Wrong arguments.');
    expect(() => new Point('foo'))
    .to.throw(Error, 'Wrong arguments.');
    expect(() => new Point({ l: 10, a: 20 }))
    .to.throw(Error, 'Wrong arguments.');
    expect(() => new Point([ 25 ]))
    .to.throw(Error, 'Wrong arguments.');
    expect(() => new Point([ 10, 25, 39 ]))
    .to.throw(Error, 'Wrong arguments.');
  });

  /* PRECISION */

  it('should generate set coordinates to precision', () => {
    let point = new Point({ latitude: -5.123456, longitude: 25.654321 }, { precision: 3 });
    expect(point.coordinates).to.have.property('latitude', -5.123);
    expect(point.coordinates).to.have.property('longitude', 25.654);
  });

  it('should stringify to JSON should only output coordinates', () => {
    let point = new Point({ latitude: -30, longitude: 60 });
    let parsed = JSON.parse(JSON.stringify(point));
    expect(parsed).to.have.property('latitude', -30);
    expect(parsed).to.have.property('longitude', 60);
  });

  /* GET UTIL VERSION */

  it('should get correct package version', () => {
    let version = Point.version();
    expect(version).to.equal(require('./../package').version);
  });

  it('object should have "Point" name', () => {
    expect(new Point([ 10, 10 ]).name).to.equal('Point');
  });
});
