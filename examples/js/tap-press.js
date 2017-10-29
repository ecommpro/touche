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
