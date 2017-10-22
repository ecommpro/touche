import {angRange2PI} from '../helper/math'
import angdiff from 'touche/helper/math/angdiff'
import {sub2d} from '../helper/2d'

export default ({
  center0,
  pointers0,
  center,
  pointers,
}) => {
  let sangle = 0
  pointers.forEach((p, i) => {
    let p0 = pointers0[i]
    sangle += angdiff(sub2d(p, center), sub2d(p0, center0))
  })
  return sangle / pointers.length  
}