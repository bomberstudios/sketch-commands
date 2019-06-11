// Move Down 100px

var onRun = function(context) {
  var sketch = require('sketch')
  var document = sketch.Document.getSelectedDocument()
  var selection = document.selectedLayers
  selection.forEach(layer => {
    layer.frame.y += 100
    if (layer.parent.type == 'Group') {
      layer.parent.adjustToFit()
    }
  })
}
