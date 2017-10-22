import hasClassName from './hasClassName';

export default function(e, className) {
  if (!this.hasClassName(el, className)) {
    el.className = el.className ? [el.className, className].join(' ') : className;
  }
}