<template>
    <v-dialog v-model="dialog"
              :fullscreen="fullscreen"
              :transition="transition"
              :hide-overlay="options.hideOverlay"
              :max-width="options.maxWidth"
              content-class="_app-dialog elevation-0">
        <v-layout>
            <app-svg-icon name="ui/NG_CLOSE"
                          class="_close hidden-sm-and-up"
                          @click="close"></app-svg-icon>
            <component :is="component"
                       :rawData="data"/>
        </v-layout>
    </v-dialog>
</template>

<script>
  import Vue from 'vue'

  const DEFAULT_TRANSITION = 'dialog-transition'

  export default {
    name: 'app-dialog',

    data () {
      return {
        component: null
      }
    },

    computed: {
      dialog: {
        get: function () {
          return this.$store.getters['dialog/show']
        },
        set: function (val) {
          this.$store.commit('dialog/DIALOG_SHOW', {show: val})
        }
      },
      data () {
        return this.$store.getters['dialog/data']
      },
      componentInput () {
        return this.$store.getters['dialog/component']
      },
      options () {
        return this.$store.getters['dialog/options']
      },
      transition () {
        return this.$store.getters['dialog/options'].transition || DEFAULT_TRANSITION
      },
      fullscreen () {
        return this.$store.getters['dialog/options'].fullscreen || this.$vuetify.breakpoint.xsOnly
      }
    },

    watch: {
      componentInput (componentName) {
        if (!componentName) {
          this.component = null
          return
        }
        Vue.component(componentName, () => import(`./${componentName}`))
        this.component = componentName
      }
    },

    methods: {
      close () {
        this.$store.commit('dialog/DIALOG_SHOW', {show: false})
      }
    }
  }
</script>

<style lang="stylus">
    ._app-dialog
        position relative

        ._close
            position absolute
            right 16px
            top 16px
            width: 18px
            height: 18px
            z-index 10
            cursor pointer
            color var(--blue)
</style>
