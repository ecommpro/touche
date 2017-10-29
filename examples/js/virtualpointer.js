(function() {

touche.examples.push({  
  title: 'Virtual Pointer',
  go: function(el) {

    var text = document.createElement('div');
    text.innerHTML = 'You can create virtual pointers and trigger <em>start</em>, <em>move</em> and <em>end</em> events. Virtual pointers are not visible, but in those examples we will show this image:';
    text.className = 'comment';

    el.appendChild(text);
    var virtualInput = touche.input.virtual();
    var pointer = virtualInput.pointer(1)
    var pointerImg = createPointerImg();
    pointerImg.style.left = "50%";
    pointerImg.style.top = "50%";
    el.parentNode.appendChild(pointerImg);
  }
})

})()
