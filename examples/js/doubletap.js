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
