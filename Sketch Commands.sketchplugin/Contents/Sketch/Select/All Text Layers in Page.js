// Select All Text Layers

var onRun = function(context) {
  var sketch = require('sketch')
  var Document = sketch.Document
  var document = Document.getSelectedDocument()

  var selection = document.selectedLayers
  selection.clear()
  
  var page = document.selectedPage
  
  page.layers
    .filter(layer => layer.type == 'Text')
    .forEach(layer => layer.selected = true)
}
