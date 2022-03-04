<template>
    <div class="horizontal-scroll-container"
         @wheel="scrollHorizontal"
         :style="{
            height: finalHeight
         }">
        <div class="horizontal-scroll-wrapper d-flex"
             ref="wrapperScroll">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'app-horizontal-scrolling',

    data () {
      return {
        finalHeight: 0
      }
    },

    created () {
      this.$nextTick(() => {
        if (this.$refs['wrapperScroll']) {
          const el = this.$refs['wrapperScroll'].children[0].getBoundingClientRect()
          this.finalHeight = el.height + 'px'
        }
      })
    },

    methods: {
      scrollHorizontal (e) {
        e = e || window.event
        if (e.preventDefault) {
          e.preventDefault()
        }
        e.returnValue = false

        if (e.wheelDelta > 0) {
          this.$refs['wrapperScroll'].scrollLeft += 50
        } else {
          this.$refs['wrapperScroll'].scrollLeft -= 50
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .horizontal-scroll-container
        overflow hidden
        padding-left: 5%
        .horizontal-scroll-wrapper
            overflow-x: auto
            overflow-y hidden
            position relative
            z-index 5
</style>
