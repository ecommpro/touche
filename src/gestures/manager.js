export default ({instanceId}) => {
  
  let gestures = []
  let callback = () => {}

  return {
    add(gesture) {
      gestures.push(
        gesture
          .onall((event, state, data) => {
            callback(data, event, state)
          })
      )
    },

    process(input, session) {
      gestures.forEach((gesture) => {
        gesture.doCheck(input, session)
      })
    },

    callback(fn) {
      callback = fn
      return this
    }
  }

}