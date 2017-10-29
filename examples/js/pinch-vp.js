(function() {
  
  touche.examples.push({  
    title: 'Pinch (w/ Virtual Pointers)',
    go: function(el) {
      el.style["touch-action"] = "none";
      var virtualInput = touche.input.virtual();
      var pointer = virtualInput.pointer(1)
      var pointerImg = createPointerImg();
      pointerImg.style.left = "0%";
      pointerImg.style.top = "0%";
      el.parentNode.appendChild(pointerImg);

      var scalable = document.createElement('div');
      scalable.className = 'scalable'
      scalable.style['transform-origin'] = '0 0'
      el.appendChild(scalable);

      touche(el)
      .addInput(virtualInput)
      .addGesture(touche.gestures.pinch({
        threshold: 0,
        pointers: 2
      }))
      .on('beforeinput', function() {
        var rect = pointerImg.getBoundingClientRect();
        pointer.move(rect.left, rect.top)
      })
      .on('pinchmove', function(data, input) {
        scalable.style.transform = 'scale(' + input.scale + ')';
      });
      
      pointer.start();
    
    }
  })
  
  })()
  
