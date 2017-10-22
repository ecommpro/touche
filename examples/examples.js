/*
touche(document)
  .addGesture(touche.gestures.tap())
  .on('tap', function(ev) {
    console.log('TAP IN DOCUMENT')
    console.log(ev)
  });
*/

function logevent(el, f) {
  return function(data, event) {

    if (!data) {
      return;
    }
    
    var line = document.createElement('div');
    line.className = 'event';

    if (!f) {
      line.innerHTML = data.event;
    } else {
      line.innerHTML = f(data);
    }

    el.insertBefore(line, el.firstChild);

    line.offsetWidth = line.offsetWidth * 1;

    setTimeout(function() {
      line.className += ' new';
    }, 0);
  }
}

function createPointerImg() {
  var div = document.createElement('div');
  div.className = 'virtualpointer';
  var img = document.createElement('img');
  img.src = 'virtualpointer.png';
  div.appendChild(img)
  return div;
}

function exampleTap() {
  var el = Example('Tap')

  var tap = touche.gestures.tap();
  //tap.addDelegate(function(emitter, eventName, handler, args) {
  //})
  touche(el)
    .addGesture(tap)
    .on('tap', logevent(el, function(data) {
      return(data.taps + '-tap ' + data.pointers + '-pointers');
    }));
}

function exampleDoubleTap() {
  var el = Example('Double Tap')
  touche(el)
    .addGesture(touche.gestures.tap({
      event: 'doubletap',
      taps: 2
    }))
    .on('doubletap', function(a, b, c) {
      console.log('DOUBLETAP');
      console.log(a, b, c);
    })
    .on('*', function(a, b, c) {
      console.log(a, b, c);
    })
}

function examplePress() {
  var el = Example('Press')
  touche(el)
    .addGesture(touche.gestures.press())
    .callback(logevent(el));
}

function exampleSwipe() {
  var el = Example('Swipe')
  touche(el)
    .addGesture(touche.gestures.swipe())
    .callback(logevent(el));
}

function exampleTapPress() {
  var el = Example('Tap / Press', {
    //desc: 'This is the explanation'
  });

  var tap = touche.gestures.tap();
  var press = touche.gestures.press();

  /*
  var filter = touche.gestures.filter([
    tap,
    press
  ]).lastSuccessful();
  */
  
  touche(el)
    .addGesture(tap)
    .addGesture(press)
    .on('tap', logevent(el, function(data) {
      return 'tap';
    }))
    .on('press', logevent(el, function(data) {
      return 'press';
    }))
}

function exampleTapDoubleTap() {
  var el = Example('Tap / Double Tap');

  var tap = touche.gestures.tap();
  var doubletap = touche.gestures.tap({
    event: 'doubletap',
    taps: 2
  })

  
  /*
  var filter = touche.gestures.filter([
    tap,
    doubletap
  ]).lastSuccessful();
  */
  
  touche(el)
    .addGesture(tap)
    .addGesture(doubletap)
    .on('tap', logevent(el, function(data) {
      return 'tap';
    }))
    .on('doubletap', logevent(el, function(data) {
      return 'doubletap';
    }))
}

function exampleNTap() {
  var el = Example('N Tap');
  touche(el)
    .addGesture(touche.gestures.tap({
      event: 'ntap',
      pointers: 0,
      taps: 0
    }))
    .on('ntap', logevent(el, function(data) {
      return(data.taps + '-tap ' + data.pointers + '-pointers');
    }))
    .on('up', function(a, b, c) {
      console.log(a, b, c);
    })
    ;
}

function examplePan() {
  var el = Example('Pan');
  touche(el)
    .addGesture(touche.gestures.pan({
      pointers: 0
    }))
    .callback(function(a, b, c) {
      console.log(a, b, c)
    });
}

function examplePanWithThreshold() {
  var el = Example('Pan With Threshold');
  touche(el)
    .addGesture(touche.gestures.pan({
      threshold: 20,
      pointers: 1
    }))
    .callback(function(a, b, c) {
      console.log(a, b, c)
    });
}

function examplePinch() {  
  var ex = {}
  var el = Example('Pinch', null, ex);

  var virtualInput = touche.input.virtual();
  var pointer = virtualInput.pointer(1)

  var pointerImg = createPointerImg();
  pointerImg.style.left = "12.5%"
  pointerImg.style.top = "12.5%"
  ex.elements.outer.appendChild(pointerImg);

  var scalable = document.createElement('div');
  scalable.className = 'scalable'
  el.appendChild(scalable);

  touche(el)
    .addInput(virtualInput)
    .addGesture(touche.gestures.pinch({
      threshold: 0,
      pointers: 2
    }))
    .on('input', function() {
      var rect = pointerImg.getBoundingClientRect();
      pointer.move(rect.left, rect.top)
    })
    .on('pinch', function(ev) {
      /*
      if(ev.input.pointerType !== 'virtual') {
        ev.input.srcEvent.preventDefault()
      }*/
      var scale = ev.session.calculations.deltadistance / 10
      scalable.style['transform-origin'] = '0 0'
      scalable.style.transform = 'scale(' + scale + ')';
    });
    
    pointer.start();
}

function exampleRotate() {
  var el = Example('Rotate');
  touche(el)
    .addGesture(touche.gestures.rotate({
      threshold: 10,
      pointers: 0
    }))
    .callback(logevent(el));
}

function exampleVirtualPointers() {
  var ex = {}
  var el = Example('Rotate with Virtual Pointer', null, ex);

  var virtualInput = touche.input.virtual();
  var pointer = virtualInput.pointer(1)

  var pointerImg = createPointerImg();
  pointerImg.style.left = "50%"
  pointerImg.style.top = "50%"
  ex.elements.outer.appendChild(pointerImg);

  var rotable = document.createElement('div');
  rotable.className = 'rotable'
  el.appendChild(rotable);

  var inertiaGenerator = touche.inertiaGenerator();
  
  touche(el)
    .addInput(virtualInput)
    .addGesture(touche.gestures.rotate({
      threshold: 0,
      pointers: 2
    }))
    .on('input', function() {
      var rect = pointerImg.getBoundingClientRect();
      pointer.move(rect.left, rect.top)
    })
    .on('start', function() {
      inertiaGenerator.stop();
      console.log('stop inertia')
    })
    .on('end', function() {
      inertiaGenerator.start();
      console.log('start inertia')
    })
    .on('rotate', function(ev) {
      if(ev.input.pointerType !== 'virtual') {
        console.log(ev.input)
        ev.input.srcEvent.preventDefault()
      }
      rotable.style.transform = 'rotate(' + ev.angle + 'deg) translateZ(0)';
      inertiaGenerator.add(ev.angle);
    });

    

    //console.log('VIRTUAL START')
    pointer.start();
}

function examplePanWithInertia() {
  var el = Example('Pan With Inertia');
  var inertiaGenerator = touche.inertiaGenerator();
  
  touche(el)
    .addGesture(touche.gestures.pan({
      threshold: 10,
      pointers: 0
    }))
    // REVIEW THIS: in gestureManager, we will not capture only "change" event, but all events with a callback
    .on('pan', function(e) {inertiaGenerator.add(e.x);})
    .on('end', function() {inertiaGenerator.start();})
    .on('start', function() {inertiaGenerator.stop();})
    
}