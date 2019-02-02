function getMarker(item, geocoder) {
    const searchQuery = item['Shipping Address 1'] + ' ' + item['Shipping City'];

    return new Promise((resolve, reject) => {
        geocoder.geocode(searchQuery, function (results) {
            var r = results[0];
            if (r) {
                return resolve(L.marker(r.center).bindPopup(r.name));
            } else {
                // Fallback to only city if street address not found
                const backupSearchQuery = item['Shipping City']
                geocoder.geocode(backupSearchQuery, function (results) {
                    var r = results[0];
                    if (r) {
                        return resolve(L.marker(r.center).bindPopup(r.name));
                    } else {
                        console.log('No result found for: ' + searchQuery);
                        return reject();
                    }
                });
            }
        });
    });
}
