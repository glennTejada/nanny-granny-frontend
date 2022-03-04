<template>
    <div class="_alerts-layout">
        <!--CONTENT-->
        <div>
            <slot></slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp"
                class="_alerts-layout--bg-elements">
            <app-svg-icon name="patterns/NG_Pattern-12"
                          color="none var(--blue_medium)"
                          class="svg-icon--pattern-12"></app-svg-icon>
            <app-svg-icon name="brand/NG_FAST_RESPONDER"
                          color="var(--orange)"
                          class="svg-icon--responder"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-18"
                          color="var(--yellow) none"
                          class="svg-icon--pattern-18"></app-svg-icon>
            <app-svg-icon name="brand/NG_EMAIL_FILLED"
                          color="var(--yellow)"
                          class="svg-icon--email"></app-svg-icon>
            <app-svg-icon name="brand/NG_HOMEWORK_SUPPORT"
                          color="var(--blue)"
                          class="svg-icon--homework"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-13"
                          color="none var(--green)"
                          class="svg-icon--pattern-13"></app-svg-icon>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'alerts-layout'
  }
</script>

<style lang="stylus" scoped>
    ._alerts-layout
        overflow hidden
        padding-bottom 100px
        position relative
        &--bg-elements
            .svg-icon
                position absolute
                &--pattern-12
                    width 200px
                    height 200px
                    top -48px
                    left 11%
                    transform rotateY(180deg)
                &--responder
                    width 90px
                    height 90px
                    top 250px
                    right 10%
                    transform rotate(-23deg)
                &--pattern-18
                    width 170px
                    height 95px
                    top 31%
                    right -42px
                &--email
                    width 100px
                    height 100px
                    top 50%
                    left -20px
                    transform rotate(-23deg)
                    @media (min-width: 1170px)
                        left 5%
                &--homework
                    width 50px
                    height 55px
                    top 65%
                    right 0
                    transform rotate(-13deg)
                    @media (min-width: 1170px)
                        right 8%
                &--pattern-13
                    width 170px
                    height 230px
                    bottom 180px
                    left -126px
                    transform rotate(-45deg)
                    @media (min-width: 1170px)
                        left -86px
</style>
