<template>
    <div class="p-relative overflow-hidden" :style="{width:'100%'}">
        <div>
            <slot></slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp"
                class="_safety_top--bg-elements">
          <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
            <app-svg-icon name="brand/NG_ONLINE_SAFETY"
                          color="var(--yellow)"
                          class="svg-icon--onlinesafety"></app-svg-icon>
          </div>
          <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
            <app-svg-icon name="patterns/NG_Pattern-13"
                          color="none var(--orange)"
                          class="svg-icon--pattern-13"></app-svg-icon>
          </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'safety-layout-top'
  }
</script>

<style lang="stylus" scoped>
    ._safety_top--bg-elements
        .svg-icon
            position absolute
            &--onlinesafety
                width 120px
                height 210px
                // top 140px
                top -580px
                right calc(50% - 30%);
                @media (max-width 1440px) {
                  right: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  right: calc(50% - 50%);
                }
            &--pattern-13
                width 180px
                height 250px
                // top 220px
                top -490px
                left -2.7em
                transform rotate(121deg)
</style>
