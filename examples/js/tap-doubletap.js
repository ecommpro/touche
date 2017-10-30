(function() {

touche.examples.push({  
  title: 'Tap / Double Tap',
  go: function(el) {
    var doubletap = touche.gestures.tap({
      event: 'doubletap',
      taps: 2
    });
  
    var tap = touche.gestures.tap()
  
    tap.addCondition(function() {
      return doubletap.isFailed()
    })
  
    doubletap.on('fail', function() {
      tap.doCheck({})
    })

    touche(el)
    .addGesture(tap)
    .addGesture(doubletap)
    .on('tap', flogevent(el, function(data) {
      return 'tap';
    }))
    .on('doubletap', flogevent(el, function(data) {
      return 'doubletap';
    }))

  }
})
  
})()
  
