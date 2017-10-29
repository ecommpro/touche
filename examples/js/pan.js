(function() {

touche.examples.push({
  title: 'Pan',
  go: function(el) {
    el.style["touch-action"] = "pan-y";

    var panner = document.createElement('div');
    panner.className = 'panner';
    panner.innerHTML = '<p><strong>Touché</strong> (<em>French pronunciation: ​[tuˈʃe]</em>): the French word for "touched" is used to acknowledge a hit, called out by the fencer who is hit.</p>';
    el.appendChild(panner)

    var ox = tx = 0;

    var ev1;
    
    touche(el)
    .addGesture(touche.gestures.pan({
      pointers: 0
    }))
    .on('panstart', function(a, input) {
      //input.stopEvent();
      ox = tx
    })
    .on('panmove', function(a, input, c) {
      tx = ox + input.deltaX;
      if (tx > 0) {
        tx = 0;
      } else if (tx < -(panner.offsetWidth - el.offsetWidth)) {
        tx = -(panner.offsetWidth - el.offsetWidth)
      }

      panner.style['transform'] = 'translate3d(' + tx + 'px, 0, 0)';
    });
  }
})
  
})()