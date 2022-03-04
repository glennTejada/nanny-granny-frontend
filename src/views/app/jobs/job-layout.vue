<template>
    <div class="overflow-hidden p-relative">
        <!--CONTENT-->
        <div>
            <slot></slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="update && $vuetify.breakpoint.mdAndUp" class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
            <app-svg-icon name="brand/NG_PARENT_REFERENCE"
                          class="_bg-element _bg-element--reference hidden-sm-and-down"
                          color="var(--orange)"></app-svg-icon>
            <app-svg-icon name="brand/NG_LIGHT_HOUSEWORK"
                          class="_bg-element _bg-element--housework hidden-sm-and-down"
                          color="var(--yellow)"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-03"
                          class="_bg-element _bg-element--pattern_03 hidden-sm-and-down"
                          color="none var(--green)"></app-svg-icon>
            <app-svg-icon name="brand/NG_COOKING_BAKING"
                          class="_bg-element _bg-element--cooking hidden-sm-and-down"
                          color="var(--blue_medium)"></app-svg-icon>
        </div>
        <div v-if="!update && $vuetify.breakpoint.mdAndUp"
             class="_bg-elements">
            <app-svg-icon name="patterns/NG_Pattern-18"
                          color="var(--yellow) none"
                          class="svg-icon--pattern-18"></app-svg-icon>
            <app-svg-icon name="brand/NG_CREATIVE_PLAY"
                          color="var(--orange)"
                          class="svg-icon--play"></app-svg-icon>
            <app-svg-icon name="brand/NG_FIRST_AID"
                          color="var(--blue_medium)"
                          class="svg-icon--aid"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-13"
                          color="none var(--green)"
                          class="svg-icon--pattern-13"></app-svg-icon>
            <app-svg-icon name="brand/NG_CRAFTY"
                          color="var(--orange)"
                          class="svg-icon--crafty"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-16"
                          color="none var(--yellow)"
                          class="svg-icon--pattern-16"></app-svg-icon>
            <app-svg-icon name="brand/NG_ENGAGED"
                          color="var(--green)"
                          class="svg-icon--engaged"></app-svg-icon>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'job-layout',
    props: {
      update: Boolean
    }
  }
</script>

<style lang="stylus" scoped>
    ._bg-element
        position absolute
        &--reference
            // top 150px
            top -2800px
            right 15%
            width 80px
            height 114px
            transform rotate(30deg)
        &--housework
            // top 33%
            top -2300px
            left -16px
            width 100px
            height 85px
            transform rotate(-18deg)
            @media (min-width 1200px)
                left 50px
        &--pattern_03
            // top 62%
            top -1300px
            right -42px
            width 115px
            height 120px
            transform: rotate(42deg)
            @media (min-width 1200px)
                right -12px
        &--cooking
            bottom 134px
            left 2px
            width 104px
            height 104px
            @media (min-width 1200px)
                left 80px
    ._bg-elements
        .svg-icon
            position absolute
            &--pattern-18
                width 170px
                height 90px
                top 100px
                right 5%
            &--play
                width 125px
                height 125px
                top 280px
                left 8%
            &--aid
                width 100px
                height 90px
                top 24%
                right -10px
                @media (min-width 1170px)
                    right 5%
            &--pattern-13
                width 180px
                height 220px
                top 40%
                left -55px
                transform rotateY(180deg) rotateZ(-45deg)
                @media (min-width 1170px)
                    right -25px
            &--crafty
                width 118px
                height 99px
                top 61%
                right -25px
                @media (min-width 1170px)
                    right 5%
            &--engaged
                width 125px
                height 50px
                bottom 190px
                right 6%
                transform rotate(-15deg)
                @media (min-width 1170px)
                    right 9%
            &--pattern-16
                width 123px
                height 100px
                top 75%
                left -30px
                @media (min-width 1170px)
                    left 4%
</style>
