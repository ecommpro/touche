import { hypo } from '../helper/math'
import { sub2d } from '../helper/2d'

export default ({
  center,
  pointers,  
}) => {
  let smean = 0  
  pointers.forEach(pointer => 
    smean += hypo(pointer.x - center.x, pointer.y - center.y)
  )
  return smean / pointers.length
}