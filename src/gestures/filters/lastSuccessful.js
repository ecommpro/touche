export default function({
  gestures,
  ngestures,
  context,
  queue,
  states,
  gesturesByInstanceId,
  handlers
}) {
  if (ngestures === queue.length) {
    let candidateId = queue[0]
    let candidate = gesturesByInstanceId[candidateId]

    if (candidateId in handlers) {
      let {handler, context, args} = handlers[candidateId]

      //console.log(handler)

      handler.call(context, ...args)
      queue.splice(0, queue.length)
    }
  }
  return true
}