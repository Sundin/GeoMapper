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