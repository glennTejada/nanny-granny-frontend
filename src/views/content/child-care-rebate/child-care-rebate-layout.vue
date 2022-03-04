<template>
    <div class="p-relative overflow-hidden">
        <div>
            <slot></slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp"
                class="_child-care-rebate--bg-elements">
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="patterns/NG_Pattern-04"
                          color="none var(--yellow) none"
                          class="svg-icon--pattern-04"></app-svg-icon>
            </div>

            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="brand/NG_ACTIVE_PLAY"
                          color="var(--blue_medium)"
                          class="svg-icon--activeplay"></app-svg-icon>
            </div>

            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="brand/NG_HAS_CAR"
                          color="var(--orange)"
                          class="svg-icon--hascar"></app-svg-icon>
            </div>

            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="patterns/NG_Pattern-07"
                          color="none var(--green)"
                          class="svg-icon--pattern-07"></app-svg-icon>
            </div>

        </div>
    </div>
</template>

<script>
  export default {
    name: 'child-care-rebate-layout'
  }
</script>

<style lang="stylus" scoped>
    ._child-care-rebate--bg-elements
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
            &--pattern-04
                width 150px
                height 150px
                top 160px
                left -3.5em
                transform rotate(0deg)
            &--activeplay
                width 100px
                height 90px
                top 520px
                right calc(50% - 30%);
                transform rotate(-15deg)
                @media (max-width 1440px) {
                  right: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  right: calc(50% - 50%);
                }

            &--hascar
                width 100px
                height 110px
                top 820px
                left calc(50% - 30%);
                transform rotate(0deg)
                @media (max-width 1440px) {
                  left: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  left: calc(50% - 50%);
                }
            &--pattern-07
                width 175px
                height 100px
                bottom -1.7em 
                right calc(50% - 35%);
                z-index 5
                transform rotate(25deg)
                @media (max-width 1440px) {
                  right: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  right: calc(50% - 50%);
                }

</style>
