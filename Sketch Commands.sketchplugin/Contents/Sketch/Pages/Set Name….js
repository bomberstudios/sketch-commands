// Set Page Name

var onRun = function(context) {
  var sketch = require('sketch')
  var document = sketch.Document.getSelectedDocument()
  var currentPage = document.selectedPage

  sketch.UI.getInputFromUser(
    "Page Name",
    {
      initialValue: currentPage.name,
    },
    (err, value) => {
      if (err) {
        return
      }
      currentPage.name = value
    }
  )
}
