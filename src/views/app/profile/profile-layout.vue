<template>
    <div class="profile-layout">
        <div>
            <!--CONTENT-->
            <slot></slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp"
             class="profile-layout--bg-elements">
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
                <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                          name="brand/NG_PARENT_REFERENCE"
                          color="var(--orange)"
                          class="svg-icon--reference"></app-svg-icon>
            </div>
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
                <app-svg-icon name="patterns/NG_Pattern-18"
                          color="var(--blue_medium) none"
                          class="svg-icon--pattern-18"></app-svg-icon>
            </div>
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
                <app-svg-icon name="brand/NG_LIGHT_HOUSEWORK"
                          color="var(--yellow)"
                          class="svg-icon--housework"></app-svg-icon>
            </div>
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
                <app-svg-icon name="patterns/NG_Pattern-03"
                          color="none var(--green)"
                          class="svg-icon--pattern-03"></app-svg-icon>
            </div>
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
                <app-svg-icon name="patterns/NG_Pattern-12"
                          color="none var(--orange)"
                          class="svg-icon--pattern-12"></app-svg-icon>
            </div>
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
                <app-svg-icon name="brand/NG_HOMEWORK_SUPPORT"
                          color="var(--blue)"
                          class="svg-icon--homework"></app-svg-icon>
            </div>
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
                <app-svg-icon name="brand/NG_COOKING_BAKING"
                          color="var(--blue_medium)"
                          class="svg-icon--cooking"></app-svg-icon>
            </div>
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
                <app-svg-icon name="patterns/NG_Pattern-06"
                          color="none var(--yellow)"
                          class="svg-icon--pattern-06"></app-svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'profile-layout'
  }
</script>

<style lang="stylus" scoped>
    .profile-layout
        position relative
        overflow hidden
        @media (min-width 600px)
            padding-bottom 100px
        &--bg-elements
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            .smooth-parallax
                position absolute
                height: 100%;
                width: 100%;
                top: 350px;            
            .svg-icon
                position absolute
                &--reference
                    width 80px
                    height 116px
                    top 100px
                    right 9%
                    transform rotate(25deg)
                &--pattern-18
                    width 170px
                    height 90px
                    top 280px
                    left 4%
                &--housework
                    width 100px
                    height 90px
                    top 26%
                    left -20px
                    transform rotate(-20deg)
                    @media (min-width 1170px)
                        left 5%
                &--pattern-03
                    width 120px
                    height 120px
                    top 36%
                    right -55px
                    transform rotate(45deg)
                    @media (min-width 1170px)
                        right -25px
                &--pattern-12
                    width 190px
                    height 190px
                    top 51%
                    left -105px
                    @media (min-width 1170px)
                        left -55px
                &--homework
                    width 50px
                    height 60px
                    top 72%
                    right 1%
                    transform rotate(10deg)
                    @media (min-width 1170px)
                        right 9%
                &--cooking
                    width 100px
                    height 100px
                    top 80%
                    left -30px
                    @media (min-width 1170px)
                        left 4%
                &--pattern-06
                    width 200px
                    height 200px
                    bottom -25px
                    right 15%
</style>
