import {ANIMATION_UP, ANIMATION_DOWN} from '@/config/constants'
const helpers = {
  getImageUrl (path = '') {
    return path
  },
  getSpeedAnimationUp (coeff = 1) {
    return ANIMATION_UP * coeff
  },
  getSpeedAnimationDown (coeff = 1) {
    return ANIMATION_DOWN * coeff
  },
  moveOnScroll (el) {
  //  console.log(el)
  }
}

export default {
  install (Vue) {
    Vue.helpers = helpers
    Vue.prototype.$helpers = helpers
  }
}
