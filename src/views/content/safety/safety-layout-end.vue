<template>
    <div class="p-relative overflow-hidden" :style="{width:'100%'}">
        <div>
            <slot></slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp"
                class="_safety_end--bg-elements smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
            <app-svg-icon name="brand/NG_CHILDCARE_QUAL"
                          color="var(--blue_medium)"
                          class="svg-icon--childcarequal"></app-svg-icon>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'safety-layout-end'
  }
</script>

<style lang="stylus" scoped>
    ._safety_end--bg-elements
        .svg-icon
            position absolute
            &--childcarequal
                width 105px
                height 115px
                bottom 250px
                right calc(50% - 20%)
                transform rotate(-35deg)
                @media (max-width 1440px) {
                  right: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  right: calc(50% - 50%);
                }
</style>
