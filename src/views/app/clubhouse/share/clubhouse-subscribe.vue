<template>
    <v-layout _clubhouse-subscribe column>
        <v-flex text-xs-center my-5>
            <app-svg-icon name="brand/NG_DIVIDER"
                          class="svg-icon--divider"></app-svg-icon>
        </v-flex>
        <v-flex tag="h2" class="text-xs-center mb-4">Subscribe to receive the latest feed</v-flex>
        <v-flex class="_clubhouse-subscribe--actions d-flex align-baseline pa-4">
            <v-text-field placeholder="Email address"
                          v-model="email"
                          v-validate="'required|email'"
                          :error-messages="errors.first('email')"
                          data-vv-name="email"
                          solo></v-text-field>
            <v-btn class="primary elevation-0"
                   :loading="loading"
                   @click="submit">Subscribe</v-btn>
        </v-flex>
        <v-flex text-xs-center my-1>
            <app-svg-icon name="brand/NG_DIVIDER"
                          class="svg-icon--divider"></app-svg-icon>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'clubhouse-subscribe',
    data () {
      return {
        loading: false,
        email: null
      }
    },
    methods: {
      submit () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.loading = true
            this.$store.dispatch('articles/SUBSCRIBE_RECEIVE', {email: this.email})
              .then(() => {
                this.email = null
                this.showSnackBar('You have successfully subscribed', 'success')
              })
              .finally(() => (this.loading = false))
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._clubhouse-subscribe
        max-width 600px
        .v-btn
            max-width 128px
        &--actions
            @media (max-width 599px)
                flex-direction column
                .v-text-field
                    min-width 100%
                .v-btn
                    min-width 100%
                    margin 16px 0
        .svg-icon--divider
            width 139px
            color var(--green)

</style>
