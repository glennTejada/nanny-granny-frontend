<template>
    <v-btn-toggle v-model="select"
                  @change="handleInput"
                  mandatory
                  class="d-block app-btn-toggle text-xs-center elevation-0 app-width-100">
        <v-btn flat
               disabled>
            I'm a
        </v-btn>
        <v-btn flat
               :ripple="false"
               value="parent">
            Parent
        </v-btn>
        <v-btn flat
               :ripple="false"
               value="nanny">
            NannyGranny
        </v-btn>
    </v-btn-toggle>
</template>

<script>
  export default {
    name: 'app-btn-toggle-role',

    props: {
      value: {
        type: String,
        default: 'parent'
      }
    },

    data () {
      return {
        select: this.value
      }
    },

    methods: {
      handleInput (e) {
        this.$emit('input', this.select)
      }
    }
  }
</script>

<style lang="stylus" scoped>
    @import "../../styles/stylus/settings/_variables.styl"
    .v-btn-toggle
        border-radius 0
        .v-btn
            opacity 1
            font-family $body-font-family
            color black
            &.v-btn--disabled
                color black !important
            &.v-btn--active
                font-family $body-font-family-medium
                color var(--blue)

    @media (max-width: 600px)
        .inverse-xs-only
            h1, h2,
            .app-btn-toggle.v-btn-toggle .v-btn--disabled,
            .v-btn
                font-weight normal
                letter-spacing .3px
                color #fff !important
                opacity 1
            .v-btn:before
                color var(--blue)
                transform translateY(1px)
            .v-btn-toggle
                border-color #fff
</style>
