<template>
    <div class="p-relative overflow-hidden">
        <div>
            <slot></slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp"
                class="_legal--bg-elements">
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="brand/NG_CREATIVE_PLAY"
                          color="var(--orange)"
                          class="svg-icon--creativeplay"></app-svg-icon>
            </div>

            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="patterns/NG_Pattern-01"
                          color="none var(--blue_medium) none"
                          class="svg-icon--pattern-01"></app-svg-icon>
            </div>

            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="patterns/NG_Pattern-04"
                          color="none var(--yellow) none"
                          class="svg-icon--pattern-04"></app-svg-icon>
            </div>

            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="brand/NG_ACTIVITIES"
                          color="var(--green)"
                          class="svg-icon--activities"></app-svg-icon>
            </div>

            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="brand/NG_ENGAGED"
                          color="var(--blue_medium)"
                          class="svg-icon--engaged"></app-svg-icon>
            </div>

            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="brand/NG_ACTIVE"
                          color="var(--orange)"
                          class="svg-icon--active"></app-svg-icon>
            </div>

        </div>
    </div>
</template>

<script>
  export default {
    name: 'legal-layout'
  }
</script>

<style lang="stylus" scoped>
    ._legal--bg-elements
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        .smooth-parallax
            position absolute
            height: 100%;
            width: 100%;
            top: -50px;            
        .svg-icon
            position absolute
            &--creativeplay
                width 90px
                height 140px
                top 140px
                right calc(50% - 30%);
                transform rotate(0deg)
                @media (max-width 1440px) {
                  right: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  right: calc(50% - 50%);
                }
            &--pattern-01
                width 215px
                height 250px
                top 70px
                left -7.9em
                transform rotate(0deg)
            &--pattern-04
                width 150px
                height 150px
                top 820px
                right -1.4em
                z-index 5
            &--activities
                width 105px
                height 105px
                top 860px
                left calc(50% - 35%);
                transform rotate(20deg)
                @media (max-width 1440px) {
                  left: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  left: calc(50% - 50%);
                }
            &--engaged
                width 100px
                height 80px
                bottom 440px
                right calc(50% - 35%);
                transform rotate(0deg)
                @media (max-width 1440px) {
                  right: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  right: calc(50% - 50%);
                }
            &--active
                width 90px
                height 80px
                bottom -1.4em
                left  calc(50% - 30%);
                transform rotate(90deg)
                @media (max-width 1440px) {
                  left: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  left: calc(50% - 50%);
                }

</style>
