<template>
    <div class="d-flex _box">
        <h1>{{name}}</h1>
        <div v-if="!hideDivider"
             class="_box--divider">
            <app-svg-icon name="brand/NG_DIVIDER"
                          class="_box--divider--icon"
                          :color="color"></app-svg-icon>
        </div>
        <slot></slot>
        <div v-if="icon" class="_box--bg_element hidden-sm-and-down">
            <slot name="icon">
                <app-svg-icon name="brand/NG_HAS_CAR" color="var(--orange)"></app-svg-icon>
            </slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'app-name-page',
    props: {
      name: String,
      icon: Boolean,
      hideDivider: Boolean,
      color: {
        type: String,
        default: 'var(--green)'
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._box
        height 150px
        flex-direction column
        justify-content center
        align-items center
        position relative

        h1,
        ._box--divider
            max-height 30px
            ._box--divider--icon
                width 110px

        &--bg_element
            position absolute
            right 10%
            bottom 33%
            width 110px
            height 100px
            .svg-icon
                width 100%
                height 100%
                transform rotate(23deg)

    @media (min-width: 600px)
        ._box
            height 200px

            h1,
            ._box--divider
                max-height 50px
                ._box--divider--icon
                    margin-top 30px
                    width 139px

</style>
