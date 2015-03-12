function CALCULATEPROPORTIONS(range) {
  
  var collection = {};
  
  for(var i = 0; i < range.length; ++i) {
    if (collection[range[i]] == undefined)
      collection[range[i]] = 1;
    else
      collection[range[i]] += 1;
  }
  
  var keys = Object.keys(collection);
  var string = "";
  
  for (var i = 0; i < keys.length; ++i) {
    string += keys[i] + ":" + collection[keys[i]] + "/";
  }
  
  return string + "Total:" + range.length
  
}