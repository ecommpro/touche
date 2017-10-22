export default function(e, className) {
  return new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)").test(el.className);
}