import {PI2} from './constants'

export default (a0, a1) => {
  let da = (a1 - a0) % PI2;
  return 2*da % PI2 - da;
}