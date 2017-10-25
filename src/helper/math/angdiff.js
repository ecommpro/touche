import { PI2 } from './constants'

export default (v1, v2) => {
  const diff = 
    (isNaN(v2) ? Math.atan2(v2.y, v2.x) : v2) -
    (isNaN(v1) ? Math.atan2(v1.y, v1.x) : v1)
  return diff < -Math.PI ? diff + PI2 : (diff > Math.PI ? diff - PI2 : diff)
}
