<template>
    <v-layout class="_app-window fill-height align-center column">
        <v-window v-model="activeWindow"
                  class="_app-window--window">
            <v-window-item v-for="(item, index) in items"
                           :key="`${salt}_win_${item.id}`">
                <slot name="item"
                      :item="item" :ind="index"></slot>
            </v-window-item>
        </v-window>
        <!--NAVIGATION-->
        <div class="_app-window--nav"
             :style="{marginTop: nudgeNavTop}">
            <v-item-group v-model="activeWindow"
                          class="text-xs-center _app-window--nav__dot"
                          mandatory>
                <v-item v-for="n in length"
                        :key="`${salt}_btn-${n}`">
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
        </div>
    </v-layout>
</template>

<script>
  export default {
    name: 'app-window-base',

    props: {
      value: Boolean,
      items: Array,
      nudgeNavTop: {
        type: String,
        default: '0'
      }
    },

    data () {
      return {
        salt: this.makeSalt(),
        activeWindow: 0
      }
    },

    computed: {
      length () {
        return this.items ? this.items.length : 0
      }
    },

    methods: {
      makeSalt () {
        let text = ''
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._app-window
        position relative

        &--window
            width 100%

        &--nav
            &__dot
                .v-btn
                    color var(--blue)
                    width 11px
                    height 11px
                    margin 4px
                    @media (min-width 600px)
                        width 12px
                        height 12px
                        margin 6px
                    &:before
                        opacity 1
</style>

