function exampleRotate() {
  var el = Example('Rotate');
  touche(el)
    .addGesture(touche.gestures.rotate({
      threshold: 10,
      pointers: 0
    }));
}
