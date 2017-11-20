'use strict';

/* DEPENDENCIES */
const expect = require('chai').expect;
const { version } = require('./../package');
const Region = require('./../region');

/* REGION TESTS */
describe('Region', () => {

  /* REGION CONSTRUCTORS */

  it('should generate Region from path object', () => {
    let region = new Region([ [ -5, 25 ], [ -1, 10 ], [ -3, 5 ] ]);
    expect(region.paths).to.be.an('array');
    expect(region.paths).to.have.length(1);
    expect(region.paths[0].toJSON()).to.have.length(3);
    expect(region.toJSON()[0]).to.have.length(3);
  });

  it('should generate Region from inverted path object', () => {
    let region = new Region([ [ -9, 38 ], [ -10, 39 ], [ -9, 37 ] ], { inverted: true });
    expect(region.paths).to.be.an('array');
    expect(region.paths).to.have.length(1);
    let path = region.toJSON()[0];
    expect(path).to.have.length(3);
    expect(path[0]).to.have.property('latitude', 38);
  });

  it('should generate Region from Region', () => {
    let region = new Region([ [ -5, 25 ], [ -1, 10 ], [ -3, 5 ] ]);
    let newRegion = new Region(region);
    expect(newRegion.paths).to.be.an('array');
    expect(newRegion.paths).to.have.length(1);
    expect(newRegion.paths[0].toJSON()).to.have.length(3);
    expect(newRegion.toJSON()[0]).to.have.length(3);
  });

  it('toJSON', () => {
    let region = new Region([
      { latitude: 39, longitude: -9 },
      { latitude: 38, longitude: -9 },
      { latitude: 38, longitude: -8 },
      { latitude: 39, longitude: -8 }
    ]).toJSON();
    expect(region).to.be.an('array');
    expect(region).to.have.length(1);
    expect(region[0]).to.have.length(4);
  });

  // it('should generate Path from other path', () => {
  //   let path = new Path(new Path([ [ -5, 25 ], [ -1, 10 ] ]));
  //   expect(path.start.coordinates).to.have.property('latitude', -5);
  //   expect(path.start.coordinates).to.have.property('longitude', 25);
  //   expect(path.end.coordinates).to.have.property('latitude', -1);
  //   expect(path.end.coordinates).to.have.property('longitude', 10);
  // });

  // it('should get distance between start and finish', () => {
  //   expect(new Path([ [ 38.7, -9.13 ], [ 24.12, -33.45 ], [ 38.8, -7.16 ] ]).distance)
  //   .to.equal(new Path([ [ 38.7, -9.13 ], [ 38.8, -7.16 ] ]).distance);
  //   // DISTANCE BETWEEN TWO POINTS IN DIFFERENT EAST-WEST HEMISPHERES
  //   expect(new Path([ [ 0, -179.5 ], [ 0, 179.5 ] ]).distance)
  //   .to.equal(new Path([ [ 0, -178.5 ], [ 0, -179.5 ] ]).distance);
  // });

  // it('should get length of path', () => {
  //   let path = new Path([ [ 38.7, -9.13 ], [ 38.7, -9.13 ] ]);
  //   expect(path.length).to.equal(path.distance);
  // });

  // it('should get length of multiple point path', () => {
  //   let path = new Path([ [ 38.7, -9.13 ], [ 38.8, -7.16 ], [ 38.7, -9.13 ] ]);
  //   expect(path.length).to.equal(171609 * 2);
  // });

  // it('should get direction of path', () => {
  //   expect(new Path([ [ 0, 0 ], [ 0, 0 ] ]).direction).to.equal(0);
  //   expect(new Path([ [ 0, 0 ], [ 10, 0 ] ]).direction).to.equal(0);
  //   expect(new Path([ [ 0, 0 ], [ 0, 10 ] ]).direction).to.equal(0.25);
  //   expect(new Path([ [ 0, 0 ], [ -10, 0 ] ]).direction).to.equal(0.5);
  //   expect(new Path([ [ 0, 0 ], [ 0, -10 ] ]).direction).to.equal(0.75);

  // });

  // it('should allow adding points after initialization', () => {
  //   let path = new Path([ [ 38.7, -9.13 ], [ 38.8, -7.16 ] ]);
  //   path.add([ 25, 36 ]);
  //   path.add([ 56, 84 ]);
  //   expect(path.count).to.equal(4);
  // });

  // // /* THROWN ERRORS */
  
  // it('should throw error from wrong arguments', () => {
  //   expect(() => new Path())
  //   .to.throw(Error, 'Wrong arguments.');
  //   expect(() => new Path([ 10, 10 ]))
  //   .to.throw(Error, 'Wrong arguments.');
  //   expect(() => new Path([ [ 20, 30 ] ]))
  //   .to.throw(Error, 'Path requires 2 or more points.');
  // });
  
  // it('should throw error from invalid coordinates', () => {
  //   expect(() => new Path([ [ 105, 21 ], [ 10, 20 ] ]))
  //   .to.throw(Error, 'Coordinates are invalid.');
  // });

  // it('should stringify to JSON should only output coordinates', () => {
  //   let region = new Region([ [ 0, 0 ], [ 10, 10 ] ]);
  //   // console.log(region.toJSON());
  //   let regions = new Region([ [ [ 0, 0 ], [ 10, 10 ] ] ]);
  //   // console.log(regions.toJSON());
  //   // let path = JSON.parse(JSON.stringify(new Region([ [ 0, 10 ], [ 20, 30 ] ])));
  //   // expect(path[0]).to.have.property('latitude', 0);
  //   // expect(path[0]).to.have.property('longitude', 10);
  //   // expect(path[1]).to.have.property('latitude', 20);
  //   // expect(path[1]).to.have.property('longitude', 30);
  // });

  // /* GET UTIL VERSION */

  // it('should get correct package version', () => {
  //   let path = new Path([ [ 0, 10 ], [ 20, 30 ] ]);
  //   expect(path.version).to.equal(version);
  //   expect(Path.version()).to.equal(version);
  // });

  // it('object should have "Region" name', () => {
  //   expect(new Path([ [ 0, 10 ], [ 20, 30 ] ]).name).to.equal('Path');
  // });
});
