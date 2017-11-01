(function() {
  
  touche.examples.push({  
    title: 'Rotate (w/ Virtual Pointers)',
    go: function(el) {

      el.style["touch-action"] = "none";

      var virtualInput = touche.input.virtual();
      var pointer = virtualInput.pointer(1)
      var pointerImg = createPointerImg();
      pointerImg.style.left = "50%";
      pointerImg.style.top = "50%";
      el.parentNode.appendChild(pointerImg);

      var shape = document.createElement('div');
      shape.className = 'rotable';
      el.appendChild(shape);

      touche(el)
      .addInput(virtualInput)
      .addGesture(touche.gestures.rotate({
        threshold: 0,
        pointers: 2
      }))
      .on('beforeinput', function() {
        var rect = pointerImg.getBoundingClientRect();
        pointer.move(rect.left, rect.top);
      })
      .on('rotatemove', function(data, input) {
        shape.style.transform = 'rotate(' + (input.rotation) + 'deg)';
      });
      
      pointer.start();
    }
  })
  
  })()
  
