<template>
    <v-container _review-container>
        <slot></slot>
        <!--ICON-->
        <!-- <div class="_review-container--bg-elements smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()"> -->
        <div class="_review-container--bg-elements smooth-parallax" v-parallaxxy="{ x : 0.25, y: -0.25 }">
            <slot name="icon">
                <app-svg-icon name="brand/NG_CREATIVE_PLAY"
                              color="var(--yellow)"
                              height="100%"
                              width="100%"></app-svg-icon>
            </slot>
        </div>
    </v-container>
</template>

<script>
  export default {
    name: 'app-container-review'
  }
</script>

<style lang="stylus" scoped>
    ._review-container
        position relative
        &--bg-elements
            position absolute
            width 68px
            height 68px
            bottom 80px
            left 0
            @media (min-width 600px)
                left 80px
                width 91px
                height 91px
                bottom 40px
</style>
