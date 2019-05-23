// Make Pill

var onRun = function(context) {
  var sketch = require('sketch')
  var Document = sketch.Document
  var document = Document.getSelectedDocument()

  var selection = document.selectedLayers
  selection.forEach(layer => {
    if (layer.type == 'ShapePath') {
      var frame = layer.frame
      var radius = (frame.width >= frame.height ) ? frame.height / 2 : frame.width / 2
      layer.points.forEach(point => {
        point.cornerRadius = radius
      })
    }
  })
}
