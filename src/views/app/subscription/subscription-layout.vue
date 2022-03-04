<template>
    <div class="p-relative overflow-hidden">
        <div>
            <slot></slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp"
                class="_subscription--bg-elements">
            <app-svg-icon name="patterns/NG_Pattern-18"
                          color="var(--orange) none"
                          class="svg-icon--pattern-18"></app-svg-icon>
            <app-svg-icon name="brand/NG_CRAFTY"
                          color="var(--yellow)"
                          class="svg-icon--crafty"></app-svg-icon>
            <app-svg-icon name="brand/NG_ACTIVE"
                          color="var(--green)"
                          class="svg-icon--active"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-16"
                          color="none var(--yellow)"
                          class="svg-icon--pattern-16"></app-svg-icon>
            <app-svg-icon name="brand/NG_COOKING_BAKING"
                          color="var(--blue_medium)"
                          class="svg-icon--cooking"></app-svg-icon>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'subscription-layout'
  }
</script>

<style lang="stylus" scoped>
    ._subscription--bg-elements
        .svg-icon
            position absolute
            &--pattern-18
                width 170px
                height 100px
                top 120px
                right 8%
            &--crafty
                width 116px
                height 97px
                top 320px
                left 10%
            &--active
                width 88px
                height 76px
                top 38%
                right 5%
            &--pattern-16
                width 122px
                height 101px
                top 1900px
                left -40px
                @media(min-width 1170px)
                    left 0
            &--cooking
                width 104px
                height 104px
                bottom -10px
                right 8%
                transform rotateY(180deg) rotateZ(13deg)
</style>
