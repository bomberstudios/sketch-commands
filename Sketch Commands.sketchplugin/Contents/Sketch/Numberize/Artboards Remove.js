var onRun = function(context) {
  var sketch = require('sketch')
  var document = sketch.Document.getSelectedDocument()
  var currentPage = document.selectedPage
  currentPage.layers.filter(layer => layer.type == 'Artboard').reverse().forEach(artboard => {
    var regex = /^(\d\d)_/;
    if (regex.test(artboard.name)) {
      artboard.name = artboard.name.replace(regex,'')
    }
  })
}
