export default function(el, eventNames, eventHandler) {
  eventNames.split(/\s+/).forEach((eventName) => {
    if (el.removeEventListener){
      el.removeEventListener(eventName, eventHandler, false); 
    } else if (el.detachEvent){
      el.detachEvent('on'+eventName, eventHandler);
    } else {
      el["on" + eventName] = null;
    }
  })
}