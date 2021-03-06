# TableClass

I have created this class because at Ironhack we use a lot Spreadsheets and excels and Google App Script to automate several background operations. This class helps us to access directly to rows and columns using for example their Column Name, the selected row or by a row id. 

Here I've create a [test spreadsheet](https://docs.google.com/a/ironhack.com/spreadsheets/d/1X4MGBHEH9r-QsvFM0jA2rDDNp_EDS-20W3w19xZCcUI/edit#gid=0).

## Constructor

```javascript
var myTable = new TableClass("1X4MGBHEH9r-QsvFM0jA2rDDNp_EDS-20W3w19xZCcUI", 
                "Sheet1", 1);  
```

+ **spreadSheetID** : You can find the the Spreadsheet ID in the Document URL

      >![Google Spreadsheet ID](img/googledrive-url-example.png)

+ **sheetName** : Sheet that contains the table you want to use

+ **headersRow** : In which row are the headers. Sometimes you can put the headers in the row 2 or 3, and use the above rows to metadata related to the column


## Properties

This are the properties for each object. For sure the three properties you pass by parameters: 

+ **spreadSheetID**
+ **sheetName** 
+ **headersRow**

And then some extra properties:

+ **sheet** : Linking to the SpreadsheetApp object that Google App Script provide you.

```javascript
SpreadsheetApp.openById(this.spreadSheetID).getSheetByName(this.sheetName);
```

## Main Methods

### orderTable (columnName, ascendingBool)

It orders the table by the name of the column ``columnName`` and in ascending order if the second parameter is ``true``.

```javascript
  myTable.orderTable("Names",false);

```
----------------
### getActiveRow ( )

Get the row selected on the spreadsheet. Basically what it does is: 

```javascript
  return SpreadsheetApp.getActiveRange().getRow();
```

----------------
### getActiveColumn ( )

Get the column selected on the spreadsheet. Basically what it does is:

```javascript
  return SpreadsheetApp.getActiveRange().getColumn();
```

----------------
### getColumnIndexByName (columnName)

It's a really useful function because you have to work with the ``Column Number`` in all the Spreadsheet API functions. This method ``return`` the Column Number [1 - Max number of columns].

```javascript 
  var columnNumber = myTable.getColumnIndexByName("Names");

```


----------------
### getCellValueByRowAndColumnName( * )

Parameters (*)

  + row (``Integer``)
  + columnName (``String``)
  + allowBlankValue (``Boolean`)

This method return the content of a cell if you give him the ``Row Number`` and a ``Column Name``. By default this methods throws an error if the cell value is void, but you can avoid this error by passing a third boolean parameter ``true``. 

```javascript

var cellContent = myTable.getCellValueByRowAndColumnName(
  myTable.getActiveRow(),
  "Names",
  true,
);

``` 
---------

# Advance and main methods

### getCellValueByPairAndColumnName ( * )

Parameters (*)

  + pairColumnValue (Object)
    + value (String)
    + column (String)
  + columnName (String)

----------
