/**
 * OpenStreetMap API has a limit of 1 request per second for reverse geocoding.
 * In order to load large datasets, you should cache the coordinates yourself in order to speed things up the next time.
 * To do this, the coordinates should be added to the Koordinater column in your Google Spreadsheet.
 * In order to make this process a bit smoother,
 * you can press the "Copy coordinates" button and the coordinates for the whole spreadsheet will be copied into your clipboard.
 *  */

// A button to trigger the copy action.
$("#copy").on("click", function() {
  var string = copyCsv(coordinates);
});

function copyCsv(rows) {
  var processRow = function(row) {
    var finalVal = "";
    for (var j = 0; j < row.length; j++) {
      var innerValue = row[j] ? row[j].toString() : "";
      if (row[j] instanceof Date) {
        innerValue = row[j].toLocaleString();
      }
      var result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
      if (j > 0) finalVal += ",";
      finalVal += result;
    }
    return finalVal + "\n";
  };

  var csvFile = "\ufeff" + "";
  for (var i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  //return csvFile;
  var $temp = $("<textarea id='temp'>").text(csvFile);
  $("body").append($temp);
  $("#temp").select();
  var result = document.execCommand("copy");
  $("#temp").remove();
  return result ? "Copied to clipboard" : "Clipboard failed...";
}
