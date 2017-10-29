(function() {
  
touche.examples.push({  
  title: 'Press',
  go: function(el) {
    touche(el)
      .addGesture(touche.gestures.press())
      .on('press', function() {
        logevent(el, 'press')
      })
  }
})

})()
