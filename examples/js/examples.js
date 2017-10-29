function logevent(el, text) {
  var line = document.createElement('div');
  line.className = 'event';
  el.insertBefore(line, el.firstChild);

  line.innerHTML = text

  line.offsetWidth = line.offsetWidth * 1;
  setTimeout(function() {
    line.className += ' new';
  }, 0);
}

function flogevent(el, f) {
  return function(data, event) {
    if (!data) {
      return;
    }
    
    var text;
    if (!f) {
      text = data.event;
    } else {
      text = f(data);
    }
    logevent(el, text)
  }
}

function createPointerImg() {
  var div = document.createElement('div');
  div.className = 'virtualpointer';
  var img = document.createElement('img');
  img.src = 'images/virtualpointer.png';
  div.appendChild(img)
  return div;
}
