import {
  POINTER_START,
  POINTER_MOVE,
  POINTER_END,
} from 'touche/input/constants'

export default ({device, id}) => {
  return {
    start(x = 0, y = 0) {
      return this._event({
        action: POINTER_START,
        x: x,
        y: y
      })
    },
    move(x, y) {
      return this._event({
        action: POINTER_MOVE,
        x: x,
        y: y
      })
    },
    end(x, y) {
      return this._event({
        action: POINTER_MOVE,
        x: x,
        y: y
      })
    },
    update(fn) {

    },
    device() {
      return device
    },
    _event(input) {
      device._handler({})
      device.handle(Object.assign(input, {
        ev: {
        },
        id: id,
        pointerType: device.options.pointerType,
        device: device.options.name
      }))
    }
  }
}