<template>
    <div class="p-relative overflow-hidden">
        <div>
            <slot></slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp"
                class="_favourites--bg-elements">
            <app-svg-icon name="patterns/NG_Pattern-10"
                          color="none var(--yellow)"
                          class="svg-icon--pattern-10"></app-svg-icon>
            <app-svg-icon name="brand/NG_CHILDCARE_QUAL"
                          color="var(--green)"
                          class="svg-icon--childcare"></app-svg-icon>
            <app-svg-icon name="brand/NG_HOMEWORK_SUPPORT"
                          color="var(--blue)"
                          class="svg-icon--homework"></app-svg-icon>
            <app-svg-icon name="brand/NG_COOKING_BAKING"
                          color="var(--orange)"
                          class="svg-icon--cooking"></app-svg-icon>
            <app-svg-icon name="brand/NG_ACTIVE"
                          color="var(--green)"
                          class="svg-icon--active"></app-svg-icon>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'favourites-layout'
  }
</script>

<style lang="stylus" scoped>
    ._favourites--bg-elements
        .svg-icon
            position absolute
            &--pattern-10
                width 190px
                height 210px
                top 70px
                right -48px
            &--childcare
                width 90px
                height 120px
                top 130px
                left 10%
                transform rotate(-25deg)
            &--pattern-13
                width 200px
                height 230px
                bottom -80px
                right 20%
                transform rotate(40deg)
            &--homework
                width 50px
                height 60px
                top 600px
                right  5%
                transform rotate(-13deg)
            &--cooking
                width 104px
                height 104px
                top 750px
                left 3%
                transform rotateY(180deg)
            &--active
                width 88px
                height 76px
                bottom -20px
                right 13%
                z-index 5
</style>
