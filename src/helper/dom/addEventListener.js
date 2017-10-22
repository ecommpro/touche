export default function(el, eventNames, eventHandler) {
  eventNames.split(/\s+/).forEach((eventName) => {
    if (el.addEventListener){
      el.addEventListener(eventName, eventHandler, false); 
    } else if (el.attachEvent){
      el.attachEvent('on'+eventName, eventHandler);
    } else {
      el["on" + eventName] = eventHandler;
    }
  })
}