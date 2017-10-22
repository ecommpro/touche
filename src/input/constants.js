const
  MOUSE_DEVICE = 1,
  TOUCH_DEVICE = 2,
  POINTER_DEVICE = 4,
  VIRTUAL_DEVICE = 8

const
  MOUSE_POINTER_ID = 'mouse'

const
  POINTER_START = 1,
  POINTER_MOVE = 2,
  POINTER_END = 4,
  POINTER_CANCEL = 8

const ACTION_MAP = {
  [POINTER_START]: 'start',
  [POINTER_MOVE]: 'move',
  [POINTER_END]: 'end',
  [POINTER_CANCEL]: 'cancel'
}

const EVENT_MAP = {
  pointerdown: POINTER_START,
  pointermove: POINTER_MOVE,
  pointerup: POINTER_END,
  pointercancel: POINTER_CANCEL,
  
  MSPointerDown: POINTER_START,
  MSPointerMove: POINTER_MOVE,
  MSPointerUp: POINTER_END,
  MSPointerCancel: POINTER_CANCEL,

  touchstart: POINTER_START,
  touchmove: POINTER_MOVE,
  touchend: POINTER_END,
  touchcancel: POINTER_CANCEL,

  mousedown: POINTER_START,
  mousemove: POINTER_MOVE,
  mouseup: POINTER_END,
  mousecancel: POINTER_CANCEL
}

export {
  MOUSE_DEVICE,
  TOUCH_DEVICE,
  POINTER_DEVICE,
  VIRTUAL_DEVICE,

  MOUSE_POINTER_ID,

  POINTER_START,
  POINTER_MOVE,
  POINTER_END,
  POINTER_CANCEL,
  
  ACTION_MAP,
  EVENT_MAP
};