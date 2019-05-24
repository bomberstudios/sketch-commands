var onRun = function(context) {
  function pad_number(n){
    if ( n < 10 ) {
      return "0" + n
    } else {
      return n.toString()
    }
  }

  var sketch = require('sketch')
  var document = sketch.Document.getSelectedDocument()
  var pageNumber = 1
  document.pages.forEach(page => {
    var regex = /^(\d\d)_/;
    if (regex.test(page.name)) {
      page.name = page.name.replace(regex,pad_number(pageNumber) + "_")
    } else {
      page.name = pad_number(pageNumber) + "_" + page.name
    }
    pageNumber++
  })
}
