var onRun = function(context) {
  function pad_number(n){
    if ( n < 10 ) {
      return "0" + n
    } else {
      return n.toString()
    }
  }

  var sketch = require('sketch')
  var document = sketch.Document.getSelectedDocument()
  var currentPage = document.selectedPage
  var artboardNumber = 1
  currentPage.layers.filter(layer => layer.type == 'Artboard').reverse().forEach(artboard => {
    var regex = /^(\d\d)_/;
    if (regex.test(artboard.name)) {
      artboard.name = artboard.name.replace(regex,pad_number(artboardNumber) + "_")
    } else {
      artboard.name = pad_number(artboardNumber) + "_" + artboard.name
    }
    artboardNumber++
  })
}
