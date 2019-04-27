function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Actions')
  .addItem("Get the Weathahh", 'goGetWeathahh')
  .addSeparator()
  .addToUi();
}

function goGetWeathahh() {
  display();
  showToast();
}

function display() {
  
  //var ss = SpreadsheetApp.openById('1p9ry7fkgdWjaCQYrdT4T5lFs4p9wBt8M9ZlVSwfuY64');
  var ss = SpreadsheetApp.getActive()
  var name = ss.getName();
  //var sheet = ss.getActiveSheet()
  var sheet = ss.getSheetByName('Weather');
  var rangeData = sheet.getDataRange();
  var lastRow = rangeData.getLastRow();
  
  for (var i = 2; i <= lastRow; i++ ) {
    var range = sheet.getRange(i,1);
    var lat = range.getValue();
    
    var range = sheet.getRange(i,2);
    var long = range.getValue();
    
    response = getWeathah(lat,long);
    
    var json = JSON.parse(response.getContentText());
    Logger.log(json);
  
    SpreadsheetApp.getActiveSheet().getRange(i,3).setValue(json.currently.summary);
    SpreadsheetApp.getActiveSheet().getRange(i,4).setValue(json.currently.temperature);

  }
}


function getWeathah(lat,long) {
  
  var key = PropertiesService.getScriptProperties().getProperty('key');
  
  var url = "https://api.darksky.net/forecast/" + key + "/" + lat + "," + long;
  
  var options = {
    'method' : 'GET'
  };
  
  var response = UrlFetchApp.fetch(url, options);

  return response;
}


function showToast() {
  
  SpreadsheetApp.getActiveSpreadsheet().toast('Mission Complete', 'Status', 3);
}
