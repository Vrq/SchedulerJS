function handleFiles(files) {
  if (window.FileReader) {
      getAsText(files[0]);
  } else {
      alert('FileReader not supported in this browser.');
  }
}

function getAsText(fileToRead) {
  var reader = new FileReader();
  // Read file into memory as UTF-8
  reader.readAsText(fileToRead);
  // Handle errors load
  reader.onload = loadHandler;
  reader.onerror = errorHandler;
}

function loadHandler(event) {
  var csv = event.target.result;
  processData(csv);
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    for (var i=0; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
            var tarr = [];
            for (var j=0; j<data.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
    }
  console.log(lines);
  writeCSVinHTML(lines);
  testConsole();
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
      alert("File reading error");
  }
}

function writeCSVinHTML(dataInCSV) {
  $( "#importedCSV" ).append( "<p>Test</p>" );
  var table = $('<table border="1" align="center"></table>')
  for(i=0; i<dataInCSV.length; i++){
    var row = $('<tr></tr>')
    for(j=0; j<dataInCSV[i].length; j++) {
      row.append("<td>" + dataInCSV[i][j] + "</td>")
    }
    table.append(row);
  }
  $('#importedCSV').append(table);
}
