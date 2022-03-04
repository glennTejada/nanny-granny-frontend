<template>
  <div class="scroll_element">
        <div :id="[this.getContainerId()]" :class="[getContainerClass()]">
            <app-svg-icon :id="[this.getIconId()]" v-if="$vuetify.breakpoint.mdAndUp"
                           :name="svgName"
                           :color='svgColor'></app-svg-icon>
        </div>
  </div>
</template>
<script>
  export default {
    name: 'app-scroll-patterns',
    props: {
      svgClass: String,
      svgName: String,
      svgTop: String,
      svgLeft: String,
      svgRight: String,
      svgButtom: String,
      svgWidth: String,
      svgHeight: String,
      svgTransform: String,
      svgColor: String,
      duration: String,
      moveX: String,
      moveY: String
    },
    data () {
      return {
        scrolled: false,
        moveByX: true,
        moveByY: true,
        work: false,
        workX: 0,
        workY: 0,
        oldY: 0,
        scrollUpDown: 0
      }
    },
    methods: {
      handleScroll () {
        if (this.work) return
        this.work = true
        this.scrollUpDown = 0
        if (this.oldY > window.scrollY) {
          this.scrollUpDown = 1
        } else {
          this.scrollUpDown = -1
        }
        this.oldY = window.scrollY
        this.setStyle()
        this.work = false
      },
      setStyle () {
        const scrollEl = document.getElementById(this.getContainerId())
        if (scrollEl == null) return
        this.workX = scrollEl.offsetLeft
        this.workY = scrollEl.offsetTop
        this.workX = this.workX + this.scrollUpDown * parseFloat(this.duration) * parseFloat(this.moveX)
        this.workY = this.workY + this.scrollUpDown * parseFloat(this.duration) * parseFloat(this.moveY)
        scrollEl.style.top = this.workY + 'px'
        scrollEl.style.left = this.workX + 'px'
        scrollEl.style.right = ''
        scrollEl.style.bottom = ''
      },
      getContainerClass () {
        return this.svgClass ? this.svgClass : 'svg-container'
      },
      getContainerId () {
        return this.getContainerClass() + '_container'
      },
      getIconId () {
        return this.getContainerClass()
      }
    },
    mounted: function () {
      let elementSvg = document.getElementById(this.getContainerId())
      if (this.svgTop) {
        elementSvg.style.top = this.svgTop
      }
      if (this.svgButtom) {
        elementSvg.style.buttom = this.svgButtom
      }
      if (this.svgLeft) {
        elementSvg.style.left = this.svgLeft
      }
      if (this.svgRight) {
        elementSvg.style.right = this.svgRight
      }
      if (this.svgTransform) {
        elementSvg.style.transform = this.svgTransform
        elementSvg.style.webkitTransform = this.svgTransform
        elementSvg.style.msTransform = this.svgTransform
      }
      if (this.svgWidth) {
        elementSvg.style.width = this.svgWidth
      }
      if (this.svgHeight) {
        elementSvg.style.height = this.svgHeight
      }
      elementSvg.style.position = 'absolute'
    },
    beforeMount () {
      window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>
<style lang="stylus" scoped>
    .scroll_element
        -webkit-transition: -webkit-transform 0.1s ease-out
        transition: -webkit-transform 0.1s ease-out
        transition: transform 0.1s ease-out
        transition: transform 0.1s ease-out, -webkit-transform 0.1s ease-out
        position: relative
        z-index: 90
    .svg-container
        position absolute
    .svg-icon
        width: 100%;
        height: 100%;

</style>>
