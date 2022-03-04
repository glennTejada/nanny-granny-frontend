<template>
    <app-card-not-available class="_dialog-card-not-available"
                            dialog-view
                            :type="rawData.type"
                            :postcode="rawData.postcode"
                            @submit="close"></app-card-not-available>
</template>

<script>
  import AppCardNotAvailable from '../app-card/app-card-not-available'

  export default {
    name: 'app-dialog-not-available',
    components: {AppCardNotAvailable},
    props: {
      rawData: Object
    },
    methods: {
      close () {
        this.$store.commit('dialog/DIALOG_SHOW', {show: false})
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._dialog-card-not-available
        padding-top 120px !important
        @media (min-width 600px)
            padding 50px !important
    ._close-btn
        width 18px
        height 18px
        color var(--blue)
        position absolute
        z-index 15
        right 16px
        top 16px
</style>
