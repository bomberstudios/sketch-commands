// Distributes the selected elements horizontally, with the same distance beetween them.
var onRun = function(context) {
  var sketch = require('sketch')
  var Document = sketch.Document
  var UI = sketch.UI
  var document = Document.getSelectedDocument()
  var selection = document.selectedLayers

  function sort_by_position(a,b){
    return a.frame.x - b.frame.x
  }

  UI.getInputFromUser(
    "Spacing",
    {
      initialValue: 10,
    },
    (err, value) => {
      if (err) {
        return
      }
      var sorted_selection = selection.layers.sort(sort_by_position)
      var first_element = sorted_selection[0]
      var left_position = first_element.frame.x
      sorted_selection.forEach(layer => {
        layer.frame.x = left_position
        left_position = layer.frame.x + layer.frame.width + parseInt(value)
      })
    }
  )
}
