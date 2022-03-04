<template>
    <div class="connections-layout">
        <div>
            <!--CONTENT-->
            <slot></slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp"
                class="connections-layout--bg-elements">
            <app-svg-icon name="brand/NG_JOIN_NETWORK"
                          color="var(--yellow)"
                          class="svg-icon--network"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-12"
                          color="none var(--blue_medium)"
                          class="svg-icon--pattern-12"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-01"
                          color="none var(--green)"
                          class="svg-icon--pattern-01"></app-svg-icon>
            <app-svg-icon name="brand/NG_ACTIVITIES"
                          color="var(--orange)"
                          class="svg-icon--activities"></app-svg-icon>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'connections-layout'
  }
</script>

<style lang="stylus" scoped>
    .connections-layout
        position relative
        overflow hidden
        @media (min-width 600px)
            padding-bottom 100px
        &--bg-elements
                .svg-icon
                    position absolute
                    &--network
                        width 116px
                        height 116px
                        top 120px
                        left 9%
                        transform rotate(-23deg)
                    &--pattern-12
                        width 210px
                        height 200px
                        top -60px
                        right 13%
                        transform rotateY(180deg)
                    &--pattern-01
                        width 200px
                        height 200px
                        top 75%
                        left -109px
                    &--activities
                        width 116px
                        height 116px
                        top 51%
                        right -50px
                        transform rotate(46deg)
                        @media (min-width 1170px)
                            right 2%
</style>
