// Select Current Artboard
var onRun = function(context) {
  var sketch = require('sketch')
  var Document = sketch.Document
  var document = Document.getSelectedDocument()

  var selection = document.selectedLayers
  selection.clear()
  
  var page = document.selectedPage
  var currentArtboard = sketch.Artboard.fromNative(page._object.currentArtboard())
  currentArtboard.selected = true
}
