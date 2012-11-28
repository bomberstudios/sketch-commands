// Common library of things

// Variables for export scripts
var pages = [doc pages],
    file_url = [doc fileURL],
    file_path = [file_url path],
    file_folder = file_path.split([doc displayName])[0],
    export_folder = file_folder + "/" + ([doc displayName]).split('.sketch')[0] + "_export/";

var com = com || {};

com.bomberstudios = {
  alert: function(msg){
    var app = [JSTalk application:"Sketch"];
    [app displayDialog:msg withTitle:"Alert"];
  },
  create_folder: function(path) {
    var file_manager = [NSFileManager defaultManager];
    [file_manager createDirectoryAtPath:path withIntermediateDirectories:true attributes:nil error:nil];
  },
  export_all_slices: function(format){
    pages.each(function(page){
      [doc setCurrentPage:page];

      var layers = [[doc currentPage] allSlices];
      layers.each(function(slice){
        [doc saveArtboardOrSlice:slice toFile:export_folder + [slice name] + "." + format];
      });
    });
  },
  export_all_artboards: function(format){
    pages.each(function(page){
      [doc setCurrentPage:page];

      var layers = [[doc currentPage] artboards];
      layers.each(function(artboard){
        [doc saveArtboardOrSlice:artboard toFile:export_folder + [artboard name] + "." + format];
      });
    });
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
