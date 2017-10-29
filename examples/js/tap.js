(function() {

touche.examples.push({  
  title: 'Tap',
  go: function(el) {
    var tap = touche.gestures.tap();
    touche(el)
      .addGesture(tap)
      .on('tap', flogevent(el, function(data) {
        return('tap');
      }));
  }
})

})()
