<template>
    <div class="p-relative overflow-hidden">
        <div>
            <slot></slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp"
                class="_privacy-policy--bg-elements">
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="brand/NG_ENGAGED"
                          color="var(--yellow)"
                          class="svg-icon--engaged"></app-svg-icon>
            </div>
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="brand/NG_REGISTERED_CARERS"
                          color="var(--blue)"
                          class="svg-icon--registeredcarers"></app-svg-icon>
            </div>
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="patterns/NG_Pattern-02"
                          color="none var(--green)"
                          class="svg-icon--pattern-02"></app-svg-icon>
            </div>
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="brand/NG_ACTIVE"
                          color="var(--blue_medium)"
                          class="svg-icon--active"></app-svg-icon>
            </div>
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="patterns/NG_Pattern-16"
                          color="none var(--orange)"
                          class="svg-icon--pattern-16"></app-svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'privacy-policy-layout'
  }
</script>

<style lang="stylus" scoped>
    ._privacy-policy--bg-elements
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
            &--engaged
                width 120px
                height 210px
                top 140px
                right calc(50% - 30%);
                @media (max-width 1440px) {
                  right: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  right: calc(50% - 50%);
                }
            &--registeredcarers
                width 105px
                height 105px
                top 360px
                left calc(50% - 35%);
                transform rotate(0deg)
                @media (max-width 1440px) {
                  left: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  left: calc(50% - 50%);
                }
            &--pattern-02
                width 180px
                height 250px
                bottom: 350px
                left -4.2em
                transform rotate(35deg)
            &--active
                width 90px
                height 80px
                bottom 210px
                right  calc(50% - 35%);
                transform rotate(80deg)
                @media (max-width 1440px) {
                  right: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  right: calc(50% - 50%);
                }
            &--pattern-16
                width 120px
                height 100px
                top 820px
                right -1em
                z-index 5

</style>
