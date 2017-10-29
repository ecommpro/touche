(function() {
  
touche.examples.push({  
  title: 'Swipe',
  go: function(el) {
    el.style["touch-action"] = "pan-y";
    touche(el)
      .addGesture(touche.gestures.swipe())
      .on(function(event) {
        var text = {
          swipe1: 'up',
          swipe2: 'right',
          swipe4: 'down',
          swipe8: 'left'
        }
        if (event in text) {
          logevent(el, text[event]);
        }
      });

      /*
      .on('ntap', logevent(el, function(data) {
        return(data.taps + '-tap ' + data.pointers + '-pointers');
      }))    
      */
    ;
  }
})

})()
  
function exampleSwipe() {
  var el = Example('Swipe')
}
