const
  SUPPORTS_POINTER = window.PointerEvent || window.MSPointerEvent,
  SUPPORTS_TOUCH = !SUPPORTS_POINTER && 'ontouchstart' in window,
  SUPPORTS_MOUSE = !SUPPORTS_POINTER && 'onmousedown' in window
  
export {
  SUPPORTS_POINTER,
  SUPPORTS_TOUCH,
  SUPPORTS_MOUSE
}