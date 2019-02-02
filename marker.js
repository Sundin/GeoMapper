function getMarker(item, geocoder) {
    const searchQuery = item['Shipping Address 1'] + ' ' + item['Shipping City'];

    return new Promise((resolve, reject) => {
        geocoder.geocode(searchQuery, function (results) {
            console.table(results);
            var r = results[0];
            if (r) {
                return resolve(L.marker(r.center).bindPopup(r.name));
            } else {
                console.log('No result found for: ' + searchQuery);
                return reject();
            }
        });
    });
}
