<template>
    <v-btn flat
           class="_btn-connect"
           @click="profile"
           :ripple="false">
        <span>{{item.first_name}}</span>
    </v-btn>
</template>

<script>
  import NannyClass from '../../models/user/NannyClass'

  export default {
    name: 'app-btn-user-connect',
    props: {
      item: {
        type: NannyClass,
        required: true
      }
    },
    methods: {
      profile () {
        this.$store.commit('dialog/DIALOG_SHOW', {
          show: true,
          component: 'app-dialog-club-nanny-profile',
          data: this.item,
          options: {
            maxWidth: 770
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._btn-connect
        height auto !important
        min-width 20px !important
        padding 0
        font-size inherit
        color inherit
        margin 0 4px
        &:before
            content none
        &:hover
            opacity .8
</style>
