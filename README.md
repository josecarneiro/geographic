# Twiz Geo

### Point Class

Takes point with several possible formats:

* Object
  * `lat` and `lng` properties
  * `lat` and `long` properties
  * `latitude` and `longitude` properties
* Browser Geolocation Object
* Array
  * Normally ordered, `latitude, longitude`
  * Inverted, `longitude, latitude`

(**Note**: An inverted array should be accompanied by the `inverted: true` property in options object, or the boolean `true`)