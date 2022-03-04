export const ScrollAnimation = {
  inViewport (elem, offsetBottom) {
    // const offSet = offset || 200
    const offSetBottom = offsetBottom || 0
    const coords = elem.getBoundingClientRect()
    const coordsBottom = coords.bottom - offSetBottom
    const windowHeight = document.documentElement.clientHeight
    // const topVisible = coords.top > 0 && (coords.top + offSet) < windowHeight
    const topVisible = coords.top > 0 && coords.top < windowHeight
    if ((coordsBottom - coords.top) >= windowHeight) {
      return topVisible
    } else {
      const bottomVisible = coordsBottom > 0 && coordsBottom < windowHeight
      return topVisible && bottomVisible
    }
  },
  inserted (el, binding) {
    binding.value.bEnt.split(' ').forEach(c => el.classList.add(c))
    el.$onScroll = function () {
      // console.log('in onscroll', el);
      let hasRun = false
      if (!hasRun && binding.def.inViewport(el, binding.value.offsetBottom)) {
        hasRun = true
        // console.log('start animation', el)
        const ind = binding.value.ind || 0
        setTimeout(function () {
          binding.value.enter.split(' ').forEach(c => el.classList.add(c))
          binding.value.bEnt.split(' ').forEach(c => el.classList.remove(c))
          // el.setAttribute('style', 'opacity: 1; transform: translate3d(0, 0, 0)')
          // console.log(el)
          // console.log(200 * ind)
        }, 200 * ind)
        binding.def.unbind(el, binding)
      }
      // if (window.scrollY > binding.value.end) {
      // //  console.log("window.removeEventListener");
      //   window.removeEventListener("scroll", el.$onScroll);
      // }
    }
    // console.log('window.addEventListener')
    window.addEventListener('scroll', el.$onScroll)
  },
  unbind (el, binding) {
    // console.log('unbind')
    // console.log('window.removeEventListener')
    window.removeEventListener('scroll', el.$onScroll)
    delete el.$onScroll
  }
}

export const ScrollParallax = {
  inserted (el, binding, vnode) {
    el.classList.add('before-fadein')

    el.$onScroll = function () {
      if (!window) return
      const value = binding.value
      // const arg = binding.arg
      const style = el.currentStyle || window.getComputedStyle(el)
      // const mod = binding.modifiers

      if (style.display === 'none') return

      // const sT = this.container ? this.container.scrollTop : window.scrollY || window.pageYOffset
      const sT = window.pageYOffset
      const wH = window.innerHeight
      // const scrollHeight = Math.max(
      //   document.body.scrollHeight, document.documentElement.scrollHeight,
      //   document.body.offsetHeight, document.documentElement.offsetHeight,
      //   document.body.clientHeight, document.documentElement.clientHeight
      // )

      // const height = mod.absY ? window.innerHeight : el.clientHeight || el.scrollHeight
      const elH = el.clientHeight || el.scrollHeight
      const iOT = el.offsetTop + el.offsetParent.offsetTop - parseInt(style.marginTop)
      // console.log(el.offsetParent.offsetParent)
      // console.log(el.offsetParent)
      // console.log(el)
      // console.log(el.offsetParent.offsetParent.offsetTop, el.offsetParent.offsetTop, el.offsetTop, scrollHeight)

      const offset = iOT
      const centerWindowView = (sT + wH) - (elH / 2) - (wH / 2)
      const posY = (centerWindowView - offset) * value.y
      const posX = (centerWindowView - offset) * value.x
      // console.log(sT, wH, elH, offset, posY)

      window.requestAnimationFrame(() => {
        const props = `translate3d(${posX.toFixed(3)}px,${posY.toFixed(3)}px,0px)`
        // console.log(props)
        el.style.transform = props
      })
    }
    // to init position of element with tranlate3d()
    // el.$onScroll()
    setTimeout(() => {
      if (el.$onScroll) {
        el.$onScroll()
      }
      el.classList.remove('before-fadein')
      el.classList.add('fadein-slow')
    }, 1500)

    window.addEventListener('scroll', el.$onScroll)
  },
  unbind (el, binding, vnode) {
    // console.log('window.removeEventListener')
    window.removeEventListener('scroll', el.$onScroll)
    // console.log('cancelAnimationFrame')
    // cancelAnimationFrame(el.$onScroll)
    delete el.$onScroll
  }
}
