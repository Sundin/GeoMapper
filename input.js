function startRead(evt) {
  var file = document.getElementById("file").files[0];
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

// window.addEventListener("DOMContentLoaded", loadFromGoogleSheets);

let categories = {};
let coordinates = [];

function loadFromGoogleSheets(data) {
  document.getElementById("warning-section").style.display = "none";
  document.getElementById("warning-list").innerHTML = "";

  document.getElementById("info-section").innerHTML =
    "Loaded 0 of " + data.length + " locations";

  addMarkersToMap(data).then(processedData => {
    L.control.layers({}, categories).addTo(map);
    document.getElementById("info-section").innerHTML = "";
    coordinates = processedData.map(item => {
      return [item["Lat"], item["Lng"]];
    });
  });
}

function addMarkersToMap(data) {
  return new Promise((resolve, reject) => {
    data.forEach((item, index) => {
      if (item["Kategori"]) {
        const categoryName = item["Kategori"];
        if (!categories[categoryName]) {
          categories[categoryName] = L.layerGroup([]);
          // Add layer to map in order to show it by default:
          map.addLayer(categories[categoryName]);
        }
      }
      getMarkerWithGoogleSheetsData(item, geocoder, index)
        .then(marker => {
          if (item["Kategori"]) {
            marker.addTo(categories[item["Kategori"]]);
          } else {
            marker.addTo(map);
          }
          const loadedItems = index + 1;
          document.getElementById("info-section").innerHTML =
            "Loaded " + loadedItems + " of " + data.length + " locations";
          if (index === data.length - 1) {
            resolve(data);
          }
        })
        .catch(searchQuery => {
          document.getElementById("warning-section").style.display = "";
          const warningHtml = "♠ " + searchQuery + "<br/>";
          document.getElementById("warning-list").innerHTML += warningHtml;
        });
    });
  });
}

function processData(csvData) {
  document.getElementById("warning-section").style.display = "none";
  document.getElementById("warning-list").innerHTML = "";

  const lines = readFromCsv(csvData);

  lines.forEach(item => {
    getMarker(item, geocoder)
      .then(marker => {
        marker.addTo(map);
      })
      .catch(searchQuery => {
        document.getElementById("warning-section").style.display = "";
        const warningHtml = "♠ " + searchQuery + "<br/>";
        document.getElementById("warning-list").innerHTML += warningHtml;
      });
  });
}

function readFromCsv(allText) {
  var lines = [];
  var allTextLines = allText.split(/\r\n|\n/);
  var headers = allTextLines[0].split(",");

  for (var i = 1; i < allTextLines.length; i++) {
    var data = allTextLines[i].split(",");
    if (data.length == headers.length) {
      const item = {};
      for (var j = 0; j < headers.length; j++) {
        item[headers[j].replace(/^\"+|\"+$/g, "")] = data[j].replace(
          /^\"+|\"+$/g,
          ""
        );
      }
      lines.push(item);
    }
  }

  return lines;
}
