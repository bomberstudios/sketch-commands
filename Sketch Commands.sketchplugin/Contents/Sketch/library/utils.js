Array.prototype.each = function(callback){
  var count = 0;
  for (var i = 0; i < this.length; i++){
    var el = this[i];
    callback.call(this,el,count);
    count++;
  }
}

Number.prototype.times = function(callback){
  for (var s = this - 1; s >= 0; s--){
    callback.call(this,s);
  };
}

Date.prototype.isoDate = function(){
  var d = this;
  return d.year();
}

function toJSArray(arr) {
  var len = [arr count],
      res = [];

  while(len--){
    res.push(arr[len]);
  }
  return res;
}
