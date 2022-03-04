<template>
    <v-layout class="_club-header column">
        <v-flex class="d-flex align-center">
            <v-container>
                <v-layout>
                    <v-flex text-xs-center>
                        <slot name="text"></slot>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <!--BACKGROUND ELEMENTS-->
        <v-flex class="_club-header--bg-elements">
            <app-svg-icon name="brand/NG_ACTIVE"
                          color="var(--green)"
                          class="svg-icon--active">
            </app-svg-icon>
            <app-svg-icon name="brand/NG_LIGHT_HOUSEWORK"
                          color="var(--yellow)"
                          class="svg-icon--light_housework"></app-svg-icon>
            <app-svg-icon name="brand/NG_HOMEWORK_SUPPORT"
                          color="var(--blue)"
                          class="svg-icon--housework"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-18"
                          color="var(--orange) none"
                          class="svg-icon--pattern-18"></app-svg-icon>
            <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                          name="patterns/NG_Pattern-13"
                          color="none var(--green)"
                          class="svg-icon--pattern-13"></app-svg-icon>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'clubhouse-club-header'
  }
</script>

<style lang="stylus" scoped>
    ._club-header
        background-color var(--pink)
        min-height 160px
        overflow hidden
        position relative
        @media (min-width 600px)
            min-height 260px
        &--bg-elements
            max-height 1px
            .svg-icon
                position absolute
                &--active
                    width 47px
                    height 47px
                    top 5px
                    right -5px
                    @media (min-width 600px)
                        width 90px
                        height 90px
                    @media (min-width 960px)
                        top -24px
                        left 35%
                        right auto
                &--light_housework
                    width 44px
                    height 44px
                    top 0
                    left 6%
                    transform rotate(-10deg)
                    @media (min-width 600px)
                        width 90px
                        height 90px
                    @media (min-width 960px)
                        top 30px
                &--housework
                    width 33px
                    height 33px
                    bottom 16px
                    right 11%
                    transform rotate(33deg)
                    @media (min-width 600px)
                        width 50px
                        height 50px
                        right 19%
                    @media (min-width 960px)
                        top 50px
                        bottom auto
                        transform rotate(-10deg)
                &--pattern-18
                    width 120px
                    height 90px
                    bottom -20px
                    left -43px
                    @media (min-width 600px)
                        width 180px
                    @media (min-width 960px)
                        left 20%
                &--pattern-13
                    width: 180px
                    height: 220px
                    bottom: -116px
                    right: -56px
                    transform rotate(-48deg)
</style>
