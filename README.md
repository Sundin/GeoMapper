# GeoMapper

A tool for displaying a bunch of locations on a map in your browser.

Try it out at: https://sundin.github.io/GeoMapper/

Just upload a valid CSV file (it needs to include two columns named `Address` and `City` at the minimum) and you are good to go!

## Local Development

To try it out locally, simply open [index.html](./index.html) in your browser of choice.

## Dependencies

- leaflet
- leaflet-control-geocoder: For reverse geocoding
- Map data from OpenStreetMap
- Map from Mapbox
- [tabletop](https://github.com/jsoma/tabletop): Read data from Google Sheets.
- [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) - For grouping markers on the map.
