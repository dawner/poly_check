# PolyCheck

A simple application that takes an address from a user, and determines whether that address is inside or outside a polygon projected onto a map.

### Deployed App

https://polycheck.herokuapp.com/

- The app will load up a random polygon and show it on the map.
- Search for an address and the map will show a marker at your chosen address and display if it is contained within the randomly loaded polygon.
- You can search again for a different address or refresh the page to choose a different polygon (although note there are currently only 3 polygons in the "database", so you may get the same one twice!)
- Note the app is written using newer ES6 features, without polyfills, and won't run in older browsers like IE.

### Development

PolyCheck is a NodeJS app, using Express as the server to provide both a user interface and minimal API.

The app provides a publically accessible `GET /polygon` endpoint, which can be accessed via the browser or curl, and returns a custom data format representing a polygon in the structure:

```
{
  "name": <name-of-polygon>,
  "coordinates": [
    {
      "lng": <longitude>,
      "lat":  <latitude>
    },
    ...
  ]
}
```

The polygon data is stored in a [static JSON file](data/polygons.json) which was created from http://geojson.io. Additions to this data must satisfy the polygon validation check, ensuring the shape is a closed loop. That is;

1. First and last coordinate should be the same
2. The number of coordinates must be more than 2

To run locally, you will need to set a [Google API key](https://developers.google.com/maps/documentation/javascript/get-api-key) in a `.env` file.
See `env.example` for required format.

```
$ git clone git@github.com:dawner/poly_check.git
$ cd poly_check
$ npm run build:local
$ npm run start
>> Open on localhost:3000
```
