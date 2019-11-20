function getMarker(item, geocoder) {
  const searchQuery = item["Address"] + " " + item["City"];

  return new Promise((resolve, reject) => {
    geocoder.geocode(searchQuery, function(results) {
      var r = results[0];
      if (r) {
        return resolve(L.marker(r.center).bindPopup(r.name));
      } else {
        // Fallback to only city if street address not found
        const backupSearchQuery = item["City"];
        geocoder.geocode(backupSearchQuery, function(results) {
          var r = results[0];
          if (r) {
            return resolve(L.marker(r.center).bindPopup(r.name));
          } else {
            return reject(searchQuery);
          }
        });
      }
    });
  });
}

let index = -1;

function getMarkerWithGoogleSheetsData(item, geocoder) {
  return new Promise((resolve, reject) => {
    if (item["Lat"] && item["Lng"]) {
      return resolve(
        putDetailedMarkerOnMap(item, { lat: item["Lat"], lng: item["Lng"] })
      );
    }

    const searchQuery = item["Adress"];
    index++;
    sleep(1000 * index).then(() => {
      geocoder.geocode(searchQuery, function(results) {
        var r = results[0];
        if (r) {
          return resolve(putDetailedMarkerOnMap(item, r.center));
        } else {
          return reject(searchQuery);
        }
      });
    });
  });
}

function putDetailedMarkerOnMap(item, coordinates) {
  return new Promise((resolve, reject) => {
    return resolve(
      L.marker(coordinates).bindPopup(
        "<b>" +
          item["Namn"] +
          "</b><br/>" +
          item["Adress"] +
          "<br/><br/>" +
          item["Information"]
      )
    );
  });
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
