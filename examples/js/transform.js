(function() {

const createInertiaController = ({
  ms = 100,
} = {}) => {
  let history = []

  const clear = (t = Date.now()) => {
    const threeshold = t - ms
    let i = 0;    
    while(history.length && history[i] && history[i].t < threeshold) i++;
    i && history.splice(0, i)
  }

  return {
    push(v) {
      const t = Date.now()
      clear(t)
      history.push({
        t,
        v
      })
    },
    values() {
      clear()
      return history.slice()
    }
  }
}

const createAnimator = () => {

  let animations = []
  let running = 0
  let t0

  const start = t => (t0 = t) && requestAnimationFrame(step)

  const step = t => {
    const dt = t - t0
    t0 = t
    animations = animations.filter(animation => animation(dt))
    animations.length && requestAnimationFrame(step) || (running = 0)
  }

  const go = () => running || requestAnimationFrame(start) && (running = 1)

  return {
    add(animation) {
      (animations.indexOf(animation) < 0) && animations.push(animation)
      go()
    }
  }
}
  
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
    pivot = touche.transform().setId(),

    startInertiaTimeout = 0,
    inertiaController = createInertiaController(),
    centerInertiaController = createInertiaController(),
    animator = createAnimator(),
    vx, vy, w
  ;

  el.style["touch-action"] = "none";

  var shape = document.createElement('div');
  shape.className = 'transformable';
  shape.style['transform-origin'] = '0 0';
  el.appendChild(shape);

  const panInertia = dt => {

    tx += vx * dt
    ty += vy * dt
    cx += vx * dt
    cy += vy * dt

    vx *= .90
    vy *= .90

    refresh()

    return Math.sqrt(vx * vx + vy * vy) > .01
  }

  const rotationInertia = dt => {
    rotation += w * dt    
    w *= .90
    refresh()
    return Math.abs(w) > .0001
  }


  function refresh() {

    rs
      .setId()
      .rotate(-rotation)
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
      session.npointers >= 2 && (rotation = input.deltaRotation)
    })
    .on('pinchmove', function(result, input, session, calculator) {
      scale = input.deltaScale;
    })
    .on('touche.recentered', function(result, input, session) {
      centerInertiaController.push({cx, cy})

      if (input.action === 4 && session.npointers < 2) {
        let values = inertiaController.values()
        if (values.length > 1) {
          let v0 = values.shift(), v1 = values.pop()
          const dt = v1.t - v0.t
          
          if (session.npointers === 0) {
            
            let centers = centerInertiaController.values()
            if (centers.length > 1) {
              cx = centers[0].v.cx
              cy = centers[0].v.cy
            }
            
            vx = (v1.v.tx - v0.v.tx) / dt
            vy = (v1.v.ty - v0.v.ty) / dt
            animator.add(panInertia)
          }
          if (session.npointers === 1) {
            w = touche.math.angdiff(v0.v.rotation, v1.v.rotation) / dt
            animator.add(rotationInertia)
          }
        }
      } else {
        if (session.npointers > 0) {
          vx = 0
          vy = 0
        }
  
        if (session.npointers > 1) {
          w = 0;
        }
      }
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

      inertiaController.push({
        tx: input.deltaX, ty: input.deltaY, rotation: input.rotationRad, scale: input.scale
      })

      refresh();
    })
    ;
}

})

})()
  