var com = {};

com.bomberstudios = {
  alert: function (msg, title) {
    if (title === undefined) { title = "Whoops"; }
    var app = NSApplication.sharedApplication();
    app.displayDialog_withTitle_(msg, title);
  },
  create_folder: function(path) {
    var file_manager = NSFileManager.defaultManager();
    file_manager.createDirectoryAtPath_withIntermediateDirectories_attributes_error_(path, true, nil, nil);
  },
  getFileFolder: function(){
    var doc = context.document,
        file_url = doc.fileURL(),
        file_path = file_url.path(),
        file_folder = file_path.split(doc.displayName())[0];
    return file_folder;
  },
  getExportPath: function(){
    var doc = NSApplication.sharedApplication().orderedDocuments().firstObject(),
        file_folder = com.bomberstudios.getFileFolder(),
        export_folder = file_folder + doc.displayName().split('.sketch')[0] + "_export/";
    return export_folder;
  },
  export_all_slices: function(format,path){
    log("com.bomberstudios.export_all_slices()");
    if (path === undefined) {
      path = com.bomberstudios.getExportPath();
    }

    var doc = context.document,
        pages = doc.pages();

    for(var i=0; i < pages.count(); i++){
      var page = pages.objectAtIndex(i);
      doc.setCurrentPage(page);
      var pagename = doc.currentPage().name(),
          layers = doc.currentPage().exportableLayers();

      for (var j=0; j < layers.count(); j++) {
        var slice = layers.objectAtIndex(j);
        doc.saveArtboardOrSlice_toFile_(slice, path + "/" + pagename + "/" + slice.name() + "." + format);
      }
    }
  },
  export_all_artboards: function(format,path){
    if (path === undefined) {
      path = com.bomberstudios.getExportPath();
    }
    log("com.bomberstudios.export_all_artboards() to " + path);
    var doc = context.document,
        pages = doc.pages();
    for(var i=0; i < pages.count(); i++){
      var page = pages.objectAtIndex(i);
      doc.setCurrentPage(page);
      var pagename = doc.currentPage().name(),
          layers = doc.currentPage().artboards();

      for (var j=0; j < layers.count(); j++) {
        var artboard = layers.objectAtIndex(j);
        doc.saveArtboardOrSlice_toFile_(artboard, path + "/" + pagename + "/" + artboard.name() + "." + format);
      }
    }
  },
  export_item: function(item,format,path){
    var doc = NSApplication.sharedApplication().orderedDocuments().firstObject(),
        sel = item,
        rect = sel.absoluteInfluenceRect();
    doc.saveArtboardOrSlice_toFile_(MSRect.rectWithRect(rect), path + "/" + sel.name() + "." + format);
  },
  export_item_to_desktop: function(item,format){
    var desktop = [@"~/Desktop" stringByExpandingTildeInPath]
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
  selection_count_is: function(min, context){
    var selection = context.selection,
        min = min || 1,
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

@import 'utils.js'

// Aliases
alert = com.bomberstudios.alert
number_to_words = com.bomberstudios.number_to_words
selection_count_is = com.bomberstudios.selection_count_is
