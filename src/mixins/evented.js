export default {
  _handlers: {},
  _delegates: [],
  initialize() {
    this._handlers = {}
    this._delegates = []
    return this
  },
  onall(handler = () => {}) {
    return this.on('*', handler)
  },
  on(eventName, handler = () => {}) {
    
    if (arguments.length === 1) {
      handler = eventName
      eventName = '*'
    }

    let _handlers = this._handlers, self = this
    eventName.split(/\s+/).forEach((eventName) => {
      if (!(eventName in _handlers)) {
        _handlers[eventName] = []
      }
      _handlers[eventName].push(handler)
    })
    return this
  },

  trigger(eventName, ...args) {
    let _handlers = this._handlers

    let _eventName = eventName
    
    if (!(eventName in _handlers) && '*' in _handlers) {
      eventName = '*'
    }

    if ((eventName in _handlers)) {
      let self = this
      _handlers[eventName].forEach((handler) => {
        if (this._delegates.length) {
          this._delegates.forEach((delegate) => delegate.call(self, self, _eventName, handler, ...args))
        } else {
          if (eventName === '*') {
            handler.call(self, _eventName, ...args)
          } else {
            handler.call(self, ...args)
          }          
        }
      })
    }
    return this
  },

  off(eventName, handler = undefined) {
    let _handlers = this._handlers
    let self = this
    eventName.split(/\s+/).forEach((eventName) => {
      if (eventName in _handlers) {
        let handlers = _handlers[eventName]
        if (!handler) {
          delete _handlers[eventName]
        } else {
          const index = handlers.indexOf(handler)
          if (index >= 0) {
            handlers.splice(index, 1)
          }
        }
      }
    })
    return this
  },

  addDelegate(delegate) {
    this._delegates.push(delegate)
    return this
  },

  removeDelegate(delegate) {
    let index = this._delegates.indexOf(delegate)
    if (index >= 0) {
      this._delegates.splice(index, 1)
    }
    return this
  }

}

