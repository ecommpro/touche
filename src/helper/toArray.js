export default function toArray(obj) {
  return Array.prototype.slice.call(obj, 0);
}
