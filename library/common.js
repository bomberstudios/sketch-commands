#import 'library/sandbox.js'
#import 'library/sandbox-sketch-utils.js'

var com = {};

com.bomberstudios = {
  alert: function (msg, title) {
    if (title == undefined) { title = "Whoops" };
    var app = [NSApplication sharedApplication];
    [app displayDialog:msg withTitle:title];
  },
  create_folder: function(path) {
    var file_manager = [NSFileManager defaultManager];
    if (in_sandbox()) {
      sandboxAccess.accessFilePath_withBlock_persistPermission(path, function(){
        [file_manager createDirectoryAtPath:path withIntermediateDirectories:true attributes:nil error:nil];
      }, true)
    } else {
      [file_manager createDirectoryAtPath:path withIntermediateDirectories:true attributes:nil error:nil];
    }
  },
  getFileFolder: function(){
    var file_url = [doc fileURL],
        file_path = [file_url path],
        file_folder = file_path.split([doc displayName])[0];
    return file_folder;
  },
  getExportPath: function(){
    var file_folder = com.bomberstudios.getFileFolder(),
        export_folder = file_folder + ([doc displayName]).split('.sketch')[0] + "_export/";
    return export_folder;
  },
  export_all_slices: function(format,path){
    log("com.bomberstudios.export_all_slices()")
    if (path == undefined) {
      path = com.bomberstudios.getExportPath();
    }

    var pages = [doc pages];

    for(var i=0; i < [pages count]; i++){
      var page = [pages objectAtIndex:i]
      [doc setCurrentPage:page];
      var pagename = [[doc currentPage] name],
          layers = [[doc currentPage] exportableLayers];

      for (var j=0; j < [layers count]; j++) {
        var slice = [layers objectAtIndex:j]
        if (in_sandbox()) {
          sandboxAccess.accessFilePath_withBlock_persistPermission(path + "/" + pagename, function(){
            [doc saveArtboardOrSlice:slice toFile:path + "/" + pagename + "/" + [slice name] + "." + format];
          }, true)
        } else {
          [doc saveArtboardOrSlice:slice toFile:path + "/" + pagename + "/" + [slice name] + "." + format];
        }
      }
    }
  },
  export_all_artboards: function(format,path){
    if (path == undefined) {
      path = com.bomberstudios.getExportPath();
    }
    log("com.bomberstudios.export_all_artboards() to " + path)
    var pages = [doc pages]
    for(var i=0; i < [pages count]; i++){
      var page = [pages objectAtIndex:i]
      [doc setCurrentPage:page]
      var pagename = [[doc currentPage] name],
          layers = [[doc currentPage] artboards]

      for (var j=0; j < [layers count]; j++) {
        var artboard = [layers objectAtIndex:j]
        if (in_sandbox()) {
          sandboxAccess.accessFilePath_withBlock_persistPermission(path + "/" + pagename, function() {
            [doc saveArtboardOrSlice:artboard toFile:path + "/" + pagename + "/" + [artboard name] + "." + format];
          }, true)
        } else {
          log("We are NOT sandboxed")
          [doc saveArtboardOrSlice:artboard toFile:path + "/" + pagename + "/" + [artboard name] + "." + format];
        }
      }
    }
  },
  export_item: function(item,format,path){
    var sel = item;
    var rect = [sel rectByAccountingForStyleSize:[[sel absoluteRect] rect]];
    if (in_sandbox()) {
      sandboxAccess.accessFilePath_withBlock_persistPermission(path, function(){
        [doc saveArtboardOrSlice:[GKRect rectWithRect:rect] toFile:path + "/" + [sel name] + "." + format];
      }, true)
    } else {
      [doc saveArtboardOrSlice:[GKRect rectWithRect:rect] toFile:path + "/" + [sel name] + "." + format];
    }
  },
  export_item_to_desktop: function(item,format){
    var desktop = [NSSearchPathForDirectoriesInDomains(NSDesktopDirectory, NSUserDomainMask, true) objectAtIndex:0];
    com.bomberstudios.export_item(item,format,desktop);
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
    if ([selection count] < min) {
      if([selection count] === 0) {
        title = "Nihilism alert"
      }
      alert("You need to select at least " + number_to_words(min) + " object" + (min === 1 ? '' : 's') + ", but you selected " + number_to_words([selection count]) + ".", title)
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
  },
  open_finder_in: function(path) {
    var open_finder = [[NSTask alloc] init],
        open_finder_args = [NSArray arrayWithObjects:".", nil];

    [open_finder setCurrentDirectoryPath:path];
    [open_finder setLaunchPath:"/usr/bin/open"];
    [open_finder setArguments:open_finder_args];
    [open_finder launch];
  },
  reveal_finder_in: function(path) {
    var open_finder = [[NSTask alloc] init],
        open_finder_args = [NSArray arrayWithObjects:"-R", path, nil];

    [open_finder setLaunchPath:"/usr/bin/open"];
    [open_finder setArguments:open_finder_args];
    [open_finder launch];
  }
};

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


// Aliases
alert = com.bomberstudios.alert
number_to_words = com.bomberstudios.number_to_words
selection_count_is = com.bomberstudios.selection_count_is
