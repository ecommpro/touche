//import eventEmitter from 'solido-eventemitter';
import {hypo} from 'touche/helper/math'

const self = {
  set(x, y) {
    this.x = x
    this.y = y
    this.deltax = 0
    this.deltay = 0
    this.distance = 0
  },
  moveTo(x, y) {
    this.x = x
    this.y = y
    this.deltax = x - this.x0
    this.deltay = y - this.y0
    this.distance = hypo(this.deltax, this.deltay)
  },
  talive() {
    return Date.now() - this.t
  }
};

export default ({
  x, y
}) => {

  const object = Object.assign(Object.create(self), {
    t: Date.now(),
    dirty: false,
    moved: false,
    x0: x,
    y0: y,
    x,
    y,
    deltax: 0,
    deltay: 0
  });

  return object;
}