<template>
    <v-dialog v-model="value" fullscreen>
        <v-layout class="_gallery fill-height align-center">
            <app-svg-icon name="ui/NG_CLOSE"
                          @click="$emit('input', false)"
                          class="_btn-close"></app-svg-icon>
            <v-window v-model="image"
                      class="_gallery--window">
                <v-window-item v-for="item in items"
                               :key="`img-${item.id}`">
                    <v-card class="_gallery--window__card elevation-0"
                            color="transparent">
                        <v-layout align-center
                                  justify-center
                                  fill-height
                                  pa-0
                                  tag="v-card-text">
                            <v-img :src="item.path"
                                   contain
                                   height="100%">
                                <v-layout slot="placeholder"
                                          fill-height
                                          align-center
                                          justify-center
                                          ma-0>
                                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                                </v-layout>
                            </v-img>
                        </v-layout>
                    </v-card>
                </v-window-item>
            </v-window>
            <!--NAVIGATION-->
            <div v-if="length > 1" class="_gallery--nav">
                <v-btn flat
                       icon
                       :ripple="false"
                       class="_gallery--nav__prev"
                       @click="prev">
                    <app-svg-icon name="ui/NG_NEXT_PREV_LARGE"></app-svg-icon>
                </v-btn>
                <v-item-group v-model="image"
                              class="text-xs-center _gallery--nav__dot"
                              mandatory>
                    <v-item v-for="n in length"
                            :key="`btn-${n}`">
                        <v-btn slot-scope="{ active, toggle }"
                               :input-value="active"
                               :ripple="false"
                               icon
                               @click="toggle">
                            <app-svg-icon name="ui/NG_DOT_NAV"
                                          width="12"
                                          height="12"></app-svg-icon>
                        </v-btn>
                    </v-item>
                </v-item-group>
                <v-btn flat
                       icon
                       :ripple="false"
                       class="_gallery--nav__next"
                       @click="next">
                    <app-svg-icon name="ui/NG_NEXT_PREV_LARGE"></app-svg-icon>
                </v-btn>
            </div>
        </v-layout>
    </v-dialog>
</template>

<script>
  export default {
    name: 'app-window-image-gallery',

    props: {
      value: Boolean,
      items: Array
    },

    data () {
      return {
        image: 0,
        length: this.items.length
      }
    },

    methods: {
      next () {
        this.image = this.image + 1 === this.length
          ? 0
          : this.image + 1
      },
      prev () {
        this.image = this.image - 1 < 0
          ? this.length - 1
          : this.image - 1
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._btn-close
        position absolute
        cursor pointer
        color var(--white)
        width 18px
        height 18px
        right 16px
        top 16px
        @media(min-width 600px)
            width 24px
            height 24px
            right 26px
            top 24px
    ._gallery
        position relative
        background-color rgba(74, 74, 74, 0.8)
        &--window
            width 100%
            &__card
                height 60vh
        &--nav
            &__next,
            &__prev
                position absolute
                top 45%
                color var(--white)
                &:hover:before
                    background transparent
                .svg-icon
                    width 16px
                    @media(min-width 600px)
                        width 48px
                        height 48px
            &__prev
                left 0
                transform rotate(180deg)
                @media(min-width 600px)
                    left 16px
                @media(min-width 960px)
                    left 24px
            &__next
                right 0
                @media(min-width 600px)
                    right 16px
                @media(min-width 960px)
                    right 24px
            &__dot
                position absolute
                bottom 20px
                left 0
                right 0
                @media(min-width 600px)
                    bottom 60px
                .v-btn
                    color var(--white)
                    width 12px
                    height 12px
                    &:before
                        opacity 1
</style>
