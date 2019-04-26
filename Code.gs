function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Actions')
  .addItem("Get the Weathahh", 'goGetWeathahh')
  .addSeparator()
  .addToUi();
}
