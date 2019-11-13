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

function loadFromGoogleSheets(data) {
  console.log(data);

  document.getElementById("warning-section").style.display = "none";
  document.getElementById("warning-list").innerHTML = "";

  data.forEach((item, index) => {
    console.log("enter loop");
    sleep(1000 * index).then(() => {
      getMarkerWithGoogleSheetsData(item, geocoder)
        .then(marker => {
          console.log("placing on map");
          marker.addTo(map);
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

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
