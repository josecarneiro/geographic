# Geographic
> `Geographic` is a collection of abstractions that ease the pain of working with geographic features in JavaScript.

[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-version]][npm-url]
[![NPM License][npm-license]][npm-url]
<!-- [![NPM Downloads][npm-downloads]][npm-url] -->

## Installation

Node.js version 6.x.x or higher is required. To install `geographic` with `yarn`, run the command:

``` bash
yarn add geographic
```

Alternatively, it can be installed through `npm`:

``` bash
npm install geographic --save
```

## Usage

### Point Class

Takes point with several possible formats:

* Object
  * `lat` and `lng` properties
  * `lat` and `long` properties
  * `latitude` and `longitude` properties
* Array
  * Normally ordered, `latitude, longitude`
  * Inverted, `longitude, latitude`
* Browser Geolocation Object (with a `Position` constructor)
* An instance of the `Point` class

(**Note**: If instantiated with an inverted array, it should be accompanied by the `inverted: true` property in the options object, or the boolean `true`)

It includes several useful getters:

* `coordinates`: Outputs an object with coordinates in the `{ latitude: ..., longitude: ... }` format.
* `short`: Returns an object with the format `{ lat: ..., long: ... }`
* `shortest`: Returns the shortest coordinates format `{ lat: ..., lng: ... }`
* `array`: An array of coordinates in the format `[ [latitude], [longitude] ]`.
* `arrayInverted`: An array of coordinates in the format `[ [longitude], [latitude] ]`.

### Path Class

Takes an array of at least two points. Any valid format to instantiate a `Point` is valid to instantiate a `Path` object.

<!-- ## Examples

A few motivating and useful examples of how your product can be used. Spice this up with code blocks and potentially more screenshots.

_For more examples and usage, please refer to the [Wiki][wiki]._ -->

## Running Tests

To run tests on `geographic` locally, please clone the repository, run `yarn install` or `npm install`, followed by `npm run test`.

To run tests on the development mode (refreshing after each file save) run the command `npm run test:dev`.

## Authorship

José Carneiro | [josecarnei.ro](https://josecarnei.ro) | contact@josecarnei.ro

## License

`geographic` is licensed under the MIT License, meaning it's free to be used for any purpose.

<!-- Markdown link & img dfn's -->
[npm-version]: https://img.shields.io/npm/v/@twiz/geo.svg
[npm-license]: https://img.shields.io/npm/l/@twiz/geo.svg
[npm-url]: https://npmjs.org/package/@twiz/geo
<!-- [npm-downloads]: https://img.shields.io/npm/dm/@twiz/geo.svg -->
[travis-image]: https://img.shields.io/travis/josecarneiro/geographic.svg
[travis-url]: https://travis-ci.org/josecarneiro/geographic
<!-- [wiki]: https://github.com/josecarneiro/@twiz/geo/wiki -->
