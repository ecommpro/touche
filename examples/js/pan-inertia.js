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