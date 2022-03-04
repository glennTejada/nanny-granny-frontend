<template>
    <v-layout class="_app-toolbar-sticky-search">
        <v-container>
            <app-card-find row
                           hide-title
                           @empty-result="showDialog"></app-card-find>
        </v-container>
    </v-layout>
</template>

<script>
  import AppCardFind from '../app-card/app-card-find'
  export default {
    name: 'app-toolbar-sticky-search',
    components: {AppCardFind},
    methods: {
      showDialog () {
        this.$store.commit('dialog/DIALOG_SHOW', {
          show: true,
          component: 'app-dialog-not-available',
          options: {
            maxWidth: 685
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._app-toolbar-sticky-search
        height 100%
        margin 0 -24px !important
        background-color var(--sand)
        border-bottom 1px solid var(--grey_2)
</style>
