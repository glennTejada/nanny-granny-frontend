<template>
    <div class="_greeting-header fill-height"
         :class="{'_greeting-header-dashboard': dashboard}">
        <slot></slot>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp && $auth.check()"
             class="_greeting-header--bg-elements">
          <div></div>
          <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
            <app-svg-icon name="brand/NG_ACTIVE"
                          :class="`${authIsParent ? 'active-icon-parent' : 'active-icon'}`"
                          :color="dashboard ? `var(--${authIsParent ? 'green' : 'blue'})` : ``"></app-svg-icon>
          </div>
          <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
            <app-svg-icon name="brand/NG_LIGHT_HOUSEWORK"
                          class="housework-icon"></app-svg-icon>
          </div>
          <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
            <app-svg-icon name="brand/NG_HOMEWORK_SUPPORT"
                          class="support-icon"></app-svg-icon>
          </div>
          <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
            <app-svg-icon name="patterns/NG_Pattern-13"
                          class="pattern-13"
                          color="none var(--green)"></app-svg-icon>
          </div>
          <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
            <app-svg-icon name="patterns/NG_Pattern-18"
                          class="pattern-18"
                          color="var(--orange) none"></app-svg-icon>
          </div>
        </div>
        <div v-if="$vuetify.breakpoint.smAndDown && dashboard"
             class="_greeting-header--bg-elements">
            <app-svg-icon name="brand/NG_LIGHT_HOUSEWORK"
                          class="housework-icon"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-18"
                          class="pattern-18"
                          color="var(--orange) none"></app-svg-icon>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'app-layout-greeting',
    props: {
      dashboard: Boolean
    },
    computed: {
      authIsParent () {
        return this.$auth.check('parent')
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._greeting-header
        position relative
        overflow hidden
        &--bg-elements
            .svg-icon
                position absolute
                &.active-icon-parent
                    top -610px
                    right 8%
                    width 80px
                    height 80px
                    color var(--yellow) !important
                &.active-icon
                    top -610px
                    right 8%
                    width 80px
                    height 80px
                    color var(--yellow) !important
                &.housework-icon
                    // top 250px
                    top -400px
                    left 6%
                    width 90px
                    height 90px
                    transform rotate(-15deg)
                    color var(--yellow)
                &.support-icon
                    bottom 80px
                    // bottom 0px
                    right 9%
                    width 60px
                    height 60px
                    transform rotate(-10deg)
                    color var(--blue)
                &.pattern-13
                    bottom 146px
                    right -90px
                    width 170px
                    height 260px
                    transform rotate(-45deg)
                &.pattern-18
                    bottom -15px
                    left -25px
                    width 180px
                    height 100px
                    color var(--orange)
        &._greeting-header-dashboard
            ._greeting-header--bg-elements
                .svg-icon
                    &.active-icon-parent
                        top -440px
                        right 58%
                    &.active-icon
                        top -360px
                        right 58%
                        color var(--blue)
                    &.housework-icon
                        // top 110px
                        top -230px
                        left 16%
                        @media (max-width 959px)
                            top auto
                            left auto
                            bottom 120px
                            right -10px
                        @media (max-width 599px)
                            width 50px
                            bottom 40px
                    &.pattern-18
                        bottom 0
                        left -50px
                        @media (max-width 599px)
                            left -30px
                            width 100px
                            height 50px
                            bottom -10px
                    &.support-icon
                        right 20%
                    &.pattern-13
                        bottom -40px
                        right -100px
</style>
