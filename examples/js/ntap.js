(function() {
  
touche.examples.push({  
  title: 'n-Tap',
  go: function(el) {
    touche(el)
      .addGesture(touche.gestures.tap({
        event: 'ntap',
        pointers: 0,
        taps: 0
      }))
      .on('ntap', flogevent(el, function(data) {
        return(data.taps + '-tap ' + data.pointers + '-pointers');
      }))    
    ;
  }
})

})()
  