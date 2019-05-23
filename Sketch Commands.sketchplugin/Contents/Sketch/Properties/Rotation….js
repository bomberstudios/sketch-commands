// Custom Rotation

var onRun = function(context) {
  var sketch = require('sketch')
  var Document = sketch.Document
  var UI = sketch.UI
  var document = Document.getSelectedDocument()
  var selection = document.selectedLayers
  var rotation = (selection.length === 1) ? selection.layers[0].transform.rotation : 0

  UI.getInputFromUser(
    "Rotation",
    {
      initialValue: rotation.toString(),
    },
    (err, value) => {
      if (err) {
        return
      }
      selection.forEach(layer => {
        layer.transform.rotation = value
      })
    }
  )
}
