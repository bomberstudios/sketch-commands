// Set position
// @shortcut ctrl shift p

var onRun = function(context) {
  var sketch = require('sketch')
  var Document = sketch.Document
  var UI = sketch.UI
  var document = Document.getSelectedDocument()
  var selection = document.selectedLayers

  var first_item = selection.layers[0]
  var parentArtboard = first_item.getParentArtboard()

  var pageFrame = first_item.frame.changeBasis({
    from: first_item.parent,
    to: parentArtboard
  })

  var x_pos = pageFrame.x
  var y_pos = pageFrame.y

  UI.getInputFromUser(
    "Position (x,y pair)",
    {
      initialValue: `${x_pos},${y_pos}`,
    },
    (err, value) => {
      if (err) {
        return
      }
      selection.forEach(layer => {
        var xPos = value.split(',')[0]
        var yPos = value.split(',')[1]
        var newRect = new sketch.Rectangle(xPos, yPos, layer.frame.width, layer.frame.height)
        layer.frame = newRect.changeBasis({
          from: parentArtboard,
          to: layer.parent
        })
        if (layer.parent.type == 'Group') {
          layer.parent.adjustToFit()
        }
      })
    }
  )
}
