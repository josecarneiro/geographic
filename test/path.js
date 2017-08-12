'use strict';

/* DEPENDENCIES */
const expect = require('chai').expect;
const { version } = require('./../package');
const Point = require('./../point');
const Path = require('./../path');

/* EASY ID TESTS */
describe('Path', () => {

  /* POINT CONSTRUCTORS */

  it('should generate Path from two objects', () => {
    let path = new Path([ [ -5, 25 ], [ -1, 10 ] ]);
    expect(path.start.coordinates).to.have.property('latitude', -5);
    expect(path.start.coordinates).to.have.property('longitude', 25);
    expect(path.end.coordinates).to.have.property('latitude', -1);
    expect(path.end.coordinates).to.have.property('longitude', 10);
  });

  it('should get distance between two points', () => {
    let path = new Path([ [ 38.7, -9.13 ], [ 38.8, -7.16 ] ]);
    expect(path.distance).to.equal(171609);
  });

  it('should get length of multiple point path', () => {
    let path = new Path([ [ 38.7, -9.13 ], [ 38.8, -7.16 ], [ 38.7, -9.13 ] ]);
    expect(path.distance).to.equal(171609 * 2);
  });

  // /* THROWN ERRORS */
  
  it('should throw error from wrong arguments', () => {
    expect(() => new Path())
    .to.throw(Error, 'Wrong arguments.');
    expect(() => new Path([ 10, 10 ]))
    .to.throw(Error, 'Wrong arguments.');
    expect(() => new Path([ [ 20, 30 ] ]))
    .to.throw(Error, 'Path requires 2 or more points.');
  });
  
  it('should throw error from invalid coordinates', () => {
    expect(() => new Path([ [ 105, 21 ], [ 10, 20 ] ]))
    .to.throw(Error, 'Coordinates are invalid.');
  });

  // /* PRECISION */

  // it('should generate set coordinates to precision', () => {
  //   let point = new Point({ latitude: -5.123456, longitude: 25.654321 }, { precision: 3 });
  //   expect(point.coordinates).to.have.property('latitude', -5.123);
  //   expect(point.coordinates).to.have.property('longitude', 25.654);
  // });

  it('should stringify to JSON should only output coordinates', () => {
    let path = JSON.parse(JSON.stringify(new Path([ [ 0, 10 ], [ 20, 30 ] ])));
    expect(path[0]).to.have.property('latitude', 0);
    expect(path[0]).to.have.property('longitude', 10);
    expect(path[1]).to.have.property('latitude', 20);
    expect(path[1]).to.have.property('longitude', 30);
  });

  // /* GET UTIL VERSION */

  it('should get correct package version', () => {
    let path = new Path([ [ 0, 10 ], [ 20, 30 ] ]);
    expect(path.version).to.equal(version);
    expect(Path.version()).to.equal(version);
  });

  it('object should have "Path" name', () => {
    expect(new Path([ [ 0, 10 ], [ 20, 30 ] ]).name).to.equal('Path');
  });
});
