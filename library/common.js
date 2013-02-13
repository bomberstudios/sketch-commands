// Common library of things

var com = com || {};

com.bomberstudios = {
  alert: function(msg,title){
    if (title == undefined) { title = "Whoops" };
    var app = [JSTalk application:"Sketch"];
    [app displayDialog:msg withTitle:title];
  },
  create_folder: function(path) {
    var file_manager = [NSFileManager defaultManager];
    [file_manager createDirectoryAtPath:path withIntermediateDirectories:true attributes:nil error:nil];
  },
  getFileFolder: function(){
    var pages = [doc pages],
        file_url = [doc fileURL],
        file_path = [file_url path],
        file_folder = file_path.split([doc displayName])[0];
    return file_folder;
  },
  getExportPath: function(){
    var file_folder = com.bomberstudios.getFileFolder(),
        export_folder = file_folder + "/" + ([doc displayName]).split('.sketch')[0] + "_export/";
    return export_folder;
  },
  export_all_slices: function(format,path){
    if (path == undefined) {
      path = com.bomberstudios.getExportPath();
    }
    [doc pages].each(function(page){
      [doc setCurrentPage:page];

      var layers = [[doc currentPage] allSlices];
      layers.each(function(slice){
        [doc saveArtboardOrSlice:slice toFile:path + [slice name] + "." + format];
      });
    });
  },
  export_all_artboards: function(format,path){
    if (path == undefined) {
      path = com.bomberstudios.getExportPath();
    }
    [doc pages].each(function(page){
      [doc setCurrentPage:page];

      var layers = [[doc currentPage] artboards];
      layers.each(function(artboard){
        [doc saveArtboardOrSlice:artboard toFile:path + [artboard name] + "." + format];
      });
    });
  },
  padNumber: function(num){
    num = num.toString();
    if (num.length < 2) {
      num = "0" + num;
    };
    return num;
  },
  isodate: function(){
    var now = new Date();
    var year = now.getFullYear();
    var month = com.bomberstudios.padNumber((now.getMonth() + 1));
    var day = com.bomberstudios.padNumber(now.getDate());
    var hour = com.bomberstudios.padNumber(now.getHours());
    var minute = com.bomberstudios.padNumber(now.getMinutes());
    return year + month + day + hour + minute;
  },
  selection_count_is: function(min){
    var min = min || 1,
        title = "Whoops";
    if ([selection length] < min) {
      if([selection length] === 0) {
        title = "Nihilism alert"
      }
      alert("You need to select at least " + number_to_words(min) + " object" + (min === 1 ? '' : 's') + ", but you selected " + number_to_words([selection length]) + ".", title)
      return false;
    } else {
      return true;
    }
  },
  number_to_words: function(num){
    switch (num){
      case 0:
        return 'none';
      case 1:
        return 'one';
      case 2:
        return 'two';
      case 3:
        return 'three';
      case 4:
        return 'four';
      default:
        return num;
    }
  }
};

Array.prototype.each = function(callback){
  var count = 0;
  for (var i = 0; i < this.length(); i++){
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

// Aliases
alert = com.bomberstudios.alert
number_to_words = com.bomberstudios.number_to_words
selection_count_is = com.bomberstudios.selection_count_is