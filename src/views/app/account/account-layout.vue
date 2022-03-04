<template>
    <div class="p-relative overflow-hidden">
        <!--Content-->
        <div>
            <slot></slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <app-svg-icon name="brand/NG_COOKING_BAKING"
                      class="_bg-element _bg-element--cooking hidden-sm-and-down"></app-svg-icon>
        <app-svg-icon name="patterns/NG_Pattern-16"
                      color="none var(--yellow)"
                      class="_bg-element _bg-element--pattern_16 hidden-sm-and-down"></app-svg-icon>
        <app-svg-icon name="patterns/NG_Pattern-13"
                      color="none var(--green)"
                      class="_bg-element _bg-element--pattern_13 hidden-sm-and-down"></app-svg-icon>
    </div>
</template>

<script>
  export default {
    name: 'account-layout'
  }
</script>

<style lang="stylus" scoped>
    ._bg-element
        position absolute
        &--cooking
            width 104px
            height 104px
            color var(--blue_medium)
            top 300px
            left 8%
            @media (min-width: 1200px)
                left 10%
        &--pattern_16
            width 130px
            height 130px
            bottom 172px
            left -56px
            @media (min-width: 1200px)
                left -16px
        &--pattern_13
            width 180px
            height 220px
            bottom -120px
            right 10%
            transform rotate(-45deg)
</style>
