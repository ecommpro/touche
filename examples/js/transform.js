(function() {
  
touche.examples.push({

title: 'Multitouch transformation! Use all your fingers, toes or even your nose',
class: 'wide',

go: function(el) {

  var
    scale = 1,
    rotation = 0,
    tx = 0, ty = 0,
    cx = 0, cy = 0,
    transform = touche.transform(),
    rs = touche.transform(),
    pivot = touche.transform().setId()
  ;

  el.style["touch-action"] = "none";

  var shape = document.createElement('div');
  shape.className = 'transformable';
  el.appendChild(shape);


  function refresh() {
    rs
      .setId()
      .rotate(rotation)
      .scale(scale)
    ;

    transform
      .setId()
      .translate(cx, cy)
      .multiply(rs)
      .translate(-cx, -cy)
      .translate(tx, ty)
      .multiply(pivot)
    ;

    shape.style['transform-origin'] = '0 0';
    shape.style.transform = transform.toCSS3MatrixString();
  }
  
  touche(el)
    .addGesture(touche.gestures.pan())
    .addGesture(touche.gestures.pinch())
    .addGesture(touche.gestures.rotate())
    .on('touche.input', function(input) {
      input.stopEvent();
    })
    .on('panmove', function(result, input, session, calculator) {
      tx = input.deltaPosition.x;
      ty = input.deltaPosition.y;
    })
    .on('rotatemove', function(result, input, session, calculator) {
      rotation = -input.deltaRotation;
    })
    .on('pinchmove', function(result, input, session, calculator) {
      scale = input.deltaScale;
    })
    .on('touche.recentered', function(result, input, session) {
      pivot.copy(transform);
      scale = 1;
      rotation = 0;
      tx = 0;
      ty = 0;
    })
    .on('touche.post', function(input, session) {
      
      if (!session.npointers) {
        return;
      }

      var clientRect = el.getBoundingClientRect();
      
      cx = input.centerX - clientRect.left;
      cy = input.centerY - clientRect.top;
      refresh();
    })
    ;
}

})

})()
  