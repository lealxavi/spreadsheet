var CustomEmailClass = function(text) {

  this.text = text;
  this.regularExp = /(%%)(\w|\s)*(%%)/g;
  
  // return a list of tokens
  this.getListOfTokens = function () {
    return text.match(this.regularExp);
  }

  this.transformNameInToken = function(name) {
    return "%%"+name+"%%";
  }

  this.getListOfTokenNames = function () {
    var tokensList = this.getListOfTokens(),
        tokensNameList = [];

    for (var i in tokensList) {
      tokensNameList.push(tokensList[i].slice(2,-2));
    }
    
    return tokensNameList;

  }
  
  this.getEmptyCollectionOfTokensNames = function() {
    
    var collection = {};
    
    var tokensList = this.getListOfTokens(),
        tokensNameList = [];

    for (var i in tokensList) {
      var tokenName = tokensList[i].slice(2,-2);
      collection[tokenName] = "";
    }
    
    return collection; 
  }

  this.getTextWithReplacements = function (collection) {
    
    var newText = this.text;
    var listOfNames = Object.keys(collection);;
    
    for (var i = 0; i < listOfNames.length; i++) {
      var token = this.transformNameInToken(listOfNames[i]);
      var value = collection[listOfNames[i]];
      
      if(value.length <= 0)
        throw("The value for "+ listOfNames[i] +" its blank");
      
      newText = newText.replace(token,value);
    }

    return newText;
  }

}