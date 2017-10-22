import {PI2} from './constants'

export default (angle) => (angle < 0 ? (angle + PI2) : angle) % PI2