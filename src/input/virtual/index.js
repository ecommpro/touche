import baseInput from 'touche/input/base'
import createPointer from 'touche/input/virtual/pointer'

export default function({
  callback,
  ...options
} = {
  callback: () => {}
}) {
  let pointers = {}
  
  options = Object.assign({}, {
    name: 'virtual',
    pointerType: 'virtual'
  }, options)

  const virtual = Object.assign(Object.create(baseInput({callback})), {
    options,
    inputType: 'virtual',
    handler() {},
    pointer(id) {
      let pointer
      if (!(id in pointers)) {
        pointer = createPointer({
          device: this,
          id: id,
          pointerType: options.pointerType
        })
        pointers[id] = pointer
      }
      return pointer
    },
    init() {
      return this
    }
  })
  return virtual
}
