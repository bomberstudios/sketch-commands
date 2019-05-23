// Set Radius
// @shortcut ctrl alt r

var onRun = function(context) {
  var sketch = require('sketch')
  var Document = sketch.Document
  var UI = sketch.UI
  var document = Document.getSelectedDocument()
  var selection = document.selectedLayers
  var radius = selection.layers.map(layer => layer.points)[0][0].cornerRadius

  UI.getInputFromUser(
    "Radius",
    {
      initialValue: radius,
    },
    (err, value) => {
      if (err) {
        return
      }
      selection.forEach(layer => {
        if (layer.type == 'ShapePath') {
          layer.points.forEach(point => {
            point.cornerRadius = value
          })
        }
      })
    }
  )
}
