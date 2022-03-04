<template>
    <div class="_app-toolbar-extension column">
        <div class="_app-toolbar-extension--container">
            <app-svg-icon name="ui/NG_CLOSE"
                          class="_app-toolbar-extension--btn-close"
                          @click="close"></app-svg-icon>
            <v-container>
                <v-layout>
                    <app-card-find v-if="findCard"
                                   :key="`findCard_${type}`"
                                   :hide-toggle-role="hideToggleRole"
                                   :role="type"
                                   @empty-result="emptyResult"
                                   title-tag="h1"
                                   icon>
                    </app-card-find>
                    <app-card-not-available v-else
                                            :type="type"
                                            :postcode="postcode"
                                            @submit="close"></app-card-not-available>
                </v-layout>
            </v-container>
            <div v-if="$vuetify.breakpoint.mdAndUp" class="_app-toolbar-extension--arrow"
                 :style="{left: arrowLeft}"></div>
        </div>
        <div class="amc-tan" @click="close"></div>
    </div>
</template>

<script>
  import AppCardFind from '../app-card/app-card-find'
  import AppCardNotAvailable from '../app-card/app-card-not-available'

  export default {
    name: 'app-toolbar-extension',
    components: {AppCardNotAvailable, AppCardFind},
    data () {
      return {
        postcode: null,
        findCard: true,
        arrowLeft: 0
      }
    },
    computed: {
      type () {
        if (this.$auth.check()) {
          return this.$auth.user().role
        }
        return this.$store.getters['toolbar/extensionType']
      },
      hideToggleRole () {
        return this.$auth.check() || this.$vuetify.breakpoint.smAndUp
      }
    },
    created () {
      this.arrowLeft = this.menuItemCoords()
      this.$store.commit('toolbar/SET_DRAWER', false)
    },
    updated () {
      this.arrowLeft = this.menuItemCoords()
      this.$store.commit('toolbar/SET_DRAWER', false)
    },
    methods: {
      close () {
        this.$store.commit('toolbar/EXTENSION', {show: false})
      },
      emptyResult (postcode) {
        this.postcode = postcode
        this.findCard = false
      },
      menuItemCoords () {
        if (!this.$auth.check() && this.$vuetify.breakpoint.mdAndUp) {
          const el = document.getElementById(`menuFindFor_${this.type}`)
          if (el) {
            const coords = el.getBoundingClientRect()
            return (coords.left + (coords.width / 2)) + 'px'
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._app-toolbar-extension
        position absolute
        height calc(100vh - 56px)
        top calc(100%)
        left 0
        width 100%
        background-color var(--sand)
        z-index 90
        border-top: 2px solid var(--grey_2)
        .amc-tan
            display: block
            height: 100vh
            position: absolute
            background: rgba(84, 84, 84, 0.8)
            width: 100%
            top: 100%
            left 0
            cursor: pointer
        @media (min-width 600px)
            height 350px

        &--btn-close
            cursor pointer
            color var(--blue)
            width 18px
            height 18px
            position absolute
            right 8px
            top 8px
            @media (min-width 600px)
                width 24px
                height 24px
                right 16px
                top 16px

        &--container
            position relative
            padding-top 40px
            z-index 80

        &--arrow
            position absolute
            width 30px
            height 30px
            border-top 2px solid var(--grey_2)
            border-left 2px solid var(--grey_2)
            background-color var(--sand)
            transform rotate(45deg)
            top -16px
            transition all .3s
</style>
