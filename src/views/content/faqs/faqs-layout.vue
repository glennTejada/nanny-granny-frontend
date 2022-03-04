<template>
    <div class="p-relative overflow-hidden">
        <div>
            <slot></slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp"
                class="_faqs--bg-elements">
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="brand/NG_PARENT_REFERENCE"
                            color="var(--blue_medium)"
                            class="svg-icon--parentreferenc"></app-svg-icon>
            </div>
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
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
                            color="var(--orange)"
                            class="svg-icon--engaged"></app-svg-icon>
            </div>

            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown(0.5)">
              <app-svg-icon name="brand/NG_PETS"
                            color="var(--green)"
                            class="svg-icon--pets"></app-svg-icon>
            </div>

            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
              <app-svg-icon name="patterns/NG_Pattern-16"
                            color="none var(--orange)"
                            class="svg-icon--pattern-16"></app-svg-icon>
            </div>

        </div>
    </div>
</template>

<script>
  export default {
    name: 'faqs-layout'
  }
</script>

<style lang="stylus" scoped>
    ._faqs--bg-elements
        .svg-icon
            position absolute
            &--parentreferenc
                width 90px
                height 140px
                // top 140px
                top -2000px
                right calc(50% - 30%);
                transform rotate(20deg)
                @media (max-width 1440px) {
                  right: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  right: calc(50% - 50%);
                }
            &--pattern-16
                width 140px
                height 140px
                // top 125px
                top -1000px
                left -1.5em
                transform rotate(0deg)
            &--activities
                width 105px
                height 105px
                // top 860px
                top -850px
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
                // bottom 440px
                bottom 200px
                left calc(50% - 35%);
                transform rotate(-20deg)
                @media (max-width 1440px) {
                  left: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  left: calc(50% - 50%);
                }
            &--pets
                width 90px
                height 80px
                // bottom 150px
                bottom 300px
                right  calc(50% - 35%);
                transform rotate(20deg)
                @media (max-width 1440px) {
                  right: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  right: calc(50% - 50%);
                }
            &--pattern-04
                width 150px
                height 150px
                // top 820px
                top -780px
                right -1.4em
                z-index 5

</style>
