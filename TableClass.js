var TableClass = function(spreadSheetID, SheetName, headersRow) {
  
  if(spreadSheetID == undefined)
    throw ("Error: you have to define a Spreadsheet ID");
  
  if(sheetName == undefined)
    throw ("Error: you have to define a SheetName");
    
  this.sheet = null;
  this.spreadSheetID = spreadSheetID;
  this.sheetName = sheetName;  
  this.headersRow = 1;
  
  if(headersRow != undefined)
    this.headersRow = headersRow;
  
  this.initialize = function () {
    this.sheet = SpreadsheetApp.openById(this.spreadSheetID).getSheetByName(this.sheetName);
  }

  // extra-functions

  this.orderTable = function() {
    var tableRange = this.sheet.getRange(this.headersRow+1,1,this.sheet.getLastRow(),this.sheet.getLastColumn());
    tableRange.sort(1);
  }
  
  this.getActiveRow = function() {
    return SpreadsheetApp.getActiveRange().getRow();
  }
  
  this.getActiveColumn = function() {
    return SpreadsheetApp.getActiveRange().getColumn();
  }

  // columns
  
  this.getColumnIndexByName = function(columnName) {

    var values       = this.sheet.getDataRange().getValues();
    var columnNumber = values[this.headersRow - 1].indexOf(columnName);
             
    if (columnNumber === -1)
      throw("Error: you have given a Column Name that doesn't exist (" +columnName + ")");

    return columnNumber + 1;

  }
  
  this.getColumnMetaData = function(columnName, offset) {
    return this.sheet.getRange(this.headersRow - 1 - offset, this.getColumnIndexByName(columnName)).getValue();
  }

  

  // cells

  this.getValueFromCell = function(row,column) {
    return this.sheet.getRange(row, column).getValue();
  }
  
  this.getValuesFromColumnByName = function(columnName) {
    
    var columnNumber = this.getColumnIndexByName(columnName);
    var elements = this.sheet.getSheetValues(this.headersRow + 1, columnNumber, this.sheet.getLastRow() - this.headersRow, 1);
    var values = [];
    
    for (var i = 0; i < elements.length ; i++)
      values.push(elements[i][0]);
    
    return values;
  }
 
  this.getValueAndFormatFromCell = function(row, columnName) {
    
    var variable = {};
    
    var columnNumber = this.getColumnIndexByName(columnName); 
    
    variable.value  = this.sheet.getRange(row, columnNumber).getValue();
    variable.format = this.sheet.getRange(row, columnNumber).getNumberFormat();
    
    return variable;
    
  }
  
  this.getCellValueByRowAndColumnName = function (row, columnName,allowBlankValue) {
    
    if(allowBlankValue == null)
      allowBlankValue = false;
    
    var columnNumber = this.getColumnIndexByName(columnName);
    var value = this.getValueFromCell(row,columnNumber); 
    
    if(value.length<=0 && allowBlankValue == false)
       throw("The value for "+ columnName +" its blank");
    
    return value;
  
  }
  
  /* BACKGROUNDS */
  
  this.setBackground = function(row,columnName,backgroundColor) {
    var columnNumber = this.getColumnIndexByName(columnName);
    this.sheet.getRange(row,columnNumber).setBackground(backgroundColor);
  }
  
  this.getActiveCellValueByColumn = function(columnName) {
    
    var columnNumber = this.getColumnIndexByName(columnName),
        activeRow    = this.getActiveRow();
    
    return this.getValueFromCell(activeRow,columnNumber);

  }
  
  this.getValuesFromForAListOfColumns = function(row,listOfColumns) {

    var collectionColumnsAndValues = {};
    
    for (var i in listOfColumns) {
      var columnName = listOfColumns[i];
      var value = this.getCellValueByRowAndColumnName(row,columnName); 
      collectionColumnsAndValues[columnName] = value;
    }
        
    return collectionColumnsAndValues;    

  }

  this.setValue = function(row,column,value) {
    this.sheet.getRange(row, column).setValue(value);  
  }
  
  this.setValueByColumnName = function(row,columnName,value) {
    var column = this.getColumnIndexByName(columnName);
    this.sheet.getRange(row, column).setValue(value);
  }
  
  // values just assigned to the column if it has not value before
  this.setValuesToAColumnsCollection = function(row,columnsCollection) {
    
    var collectionColumnsAndValues = columnsCollection;
    var columnsNames = Object.keys(columnsCollection);
    
    for (var i in columnsNames) {
      var columnName = columnsNames[i];
      if (columnsCollection[columnName].length == 0) {
        var value = this.getCellValueByRowAndColumnName(row,columnName); 
        collectionColumnsAndValues[columnName] = value;
      }
    }
        
    return collectionColumnsAndValues;  
  }
  
  // Aguments for pairColumnValue are 'value' and 'column'
  this.getCellValueByPairAndColumnName = function(pairColumnValue, columnName) {
    
    var columnValues = this.getValuesFromColumnByName(pairColumnValue.column);
    var row = columnValues.indexOf(pairColumnValue.value);
    
    if (row == -1)
      throw "Error: value ("+ pairColumnValue.value +") not found on that table"
      
    row = row + this.headersRow + 1;
    column = this.getColumnIndexByName(columnName);
    
    return this.getValueFromCell(row,column);    
    
  }
  
  // Aguments for pairColumnValue are 'value' and 'column'
  this.setCellValueByPairAndColumnName = function(pairColumnValue, columnName, value) {
    
    var columnValues = this.getValuesFromColumnByName(pairColumnValue.column);
    var row = columnValues.indexOf(pairColumnValue.value) + 1;
    
    if (row == -1)
      throw "Error: value not found on that table"
      
    row = row + this.headersRow;
    column = this.getColumnIndexByName(columnName);
    
    this.setValue(row,column,value);
  
  }
  
  this.getRowValues = function(row) {
    
    var collection = {};
    var headers = this.getHeaders();
    
    for (var i = 0; i < headers.length; i++) {
      collection[headers[i]] = this.getCellValueByRowAndColumnName(row,headers[i]);
    }
    
    return collection;
    
  }
  
  this.getHeaders = function() {
    return this.sheet.getSheetValues(this.headersRow, 1 , 1, this.sheet.getLastColumn())[0];  
  }
  
  this.getFirstRow = function() {
    return this.headersRow + 1;  
  }
  
  this.getLastRow = function() {
    return this.sheet.getLastRow();
  }
  
  this.insertRowBeforeLast = function () {
    this.sheet.insertRowBefore(this.sheet.getLastRow());
  }
  
  this.insertRowAfterLast = function () {
    this.sheet.insertRowAfter(this.sheet.getLastRow());
  }
  

  this.initialize();     

};