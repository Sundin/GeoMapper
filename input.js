function startRead(evt) {
    var file = document.getElementById('file').files[0];
    if (file) {
        getAsText(file);
    }
}

function getAsText(readFile) {
    var reader = new FileReader();
    reader.readAsText(readFile, "UTF-8");
    reader.onload = loaded;
}

function loaded(evt) {
    processData(evt.target.result);
}

function processData(csvData) {
    const lines = readFromCsv(csvData);
    console.table(lines);

    for (var i = 0; i < lines.length; i++) {
        const item = lines[i];
        getMarker(item, geocoder).then(marker => {
            marker.addTo(map);
        });
    };
}

function readFromCsv(allText) {
    var lines = [];
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');

    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            const item = {};
            for (var j = 0; j < headers.length; j++) {
                item[headers[j].replace(/^\"+|\"+$/g, '')] = data[j].replace(/^\"+|\"+$/g, '');;
            }
            lines.push(item);
        }
    }

    return lines;
}