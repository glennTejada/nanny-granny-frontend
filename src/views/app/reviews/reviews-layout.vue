<template>
    <div class="p-relative overflow-hidden">
        <div>
            <slot></slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp"
                class="_review--bg-elements">
            <app-svg-icon name="patterns/NG_Pattern-12"
                          color="none var(--orange)"
                          class="svg-icon--pattern-12"></app-svg-icon>
            <app-svg-icon name="brand/NG_FAVOURITES_FILL"
                          color="var(--yellow)"
                          class="svg-icon--favourites"></app-svg-icon>
            <app-svg-icon name="brand/NG_CONTACT"
                          color="var(--green)"
                          class="svg-icon--contact"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-13"
                          color="none var(--blue_medium)"
                          class="svg-icon--pattern-13"></app-svg-icon>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'reviews-layout'
  }
</script>

<style lang="stylus" scoped>
    ._review--bg-elements
        .svg-icon
            position absolute
            &--favourites
                width 80px
                height 80px
                top 250px
                right 5%
                transform rotate(15deg)
            &--pattern-12
                width 200px
                height 200px
                top -80px
                left 11%
                transform rotate(8deg)
            &--pattern-13
                width 200px
                height 230px
                bottom -80px
                right 20%
                transform rotate(40deg)
            &--contact
                width 80px
                height 80px
                top 550px
                left 4%
                transform rotateY(180deg) rotate(-23deg)
</style>
