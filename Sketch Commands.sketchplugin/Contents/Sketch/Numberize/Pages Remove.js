var onRun = function(context) {
  var sketch = require('sketch')
  var document = sketch.Document.getSelectedDocument()
  document.pages.forEach(page => {
    var regex = /^(\d\d)_/;
    if (regex.test(page.name)) {
      page.name = page.name.replace(regex,'')
    }
  })
}
