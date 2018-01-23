# Geographic

`Geographic` is a collection of abstractions to ease the pain of working with geographic features in JavaScript.

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
