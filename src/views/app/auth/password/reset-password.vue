<template>
    <v-layout row wrap _reset-password>
        <!-- Email -->
        <v-flex class="xs12 app-bg-sand _reset-password--form d-flex">
            <v-layout column class="text-xs-center p-relative">
                <v-flex xs12 py-5>
                    <v-container>
                        <v-flex v-if="$vuetify.breakpoint.smAndDown" mb-5>
                            <app-svg-icon name="brand/NG_ENGAGED"
                                          color="var(--green)" width="80"></app-svg-icon>
                        </v-flex>
                        <v-flex tag="h2" mb-5>Please enter your email registered with us</v-flex>
                        <v-flex>
                            <v-text-field label="Email*"
                                          v-model="body.email"
                                          v-validate="'required|email'"
                                          :error-messages="errors.first('email')"
                                          data-vv-name="email"
                                          outline></v-text-field>
                            <v-btn @click="resetPassword"
                                   :loading="loading"
                                   class="primary my-3 v-btn--default elevation-0">
                                Reset password
                            </v-btn>
                        </v-flex>
                    </v-container>
                </v-flex>
                <!--BACKGROUND ELEMENTS-->
                <v-flex v-if="$vuetify.breakpoint.mdAndUp"
                        class="_reset-password--bg-elements">
                    <app-svg-icon name="brand/NG_EMAIL_FILLED"
                                  color="var(--green)"
                                  class="svg-icon--email"></app-svg-icon>
                    <app-svg-icon name="patterns/NG_Pattern-04"
                                  color="none var(--orange) none"
                                  class="svg-icon--pattern-04"></app-svg-icon>
                    <app-svg-icon name="patterns/NG_Pattern-15"
                                  color="none var(--yellow)"
                                  class="svg-icon--pattern-15"></app-svg-icon>
                    <app-svg-icon name="brand/NG_ENGAGED"
                                  color="var(--blue)"
                                  class="svg-icon--engaged"></app-svg-icon>
                </v-flex>
            </v-layout>
        </v-flex>
        <!--Benefits-->
        <v-flex xs12 py-5>
            <v-container>
                <app-auth-benefits></app-auth-benefits>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppAuthBenefits from '../components/app-auth-benefits'

  export default {
    components: {AppAuthBenefits},
    data () {
      return {
        body: {
          email: ''
        }
      }
    },

    computed: {
      loading () {
        return this.$store.getters['profile/loading']
      }
    },

    methods: {
      resetPassword () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$store.dispatch('profile/FORGOT_PASSWORD', this.body)
              .then((res) => {
                this.showSnackBar('Сheck your inbox to reset password', 'success')
              })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._reset-password
        position relative

        &--form
            align-items center
            min-height 440px
            overflow hidden

            .v-text-field
                @media (min-width 600px)
                    max-width 350px
                    margin auto

        &--bg-elements
            .svg-icon
                position absolute

                &--email
                    width 100px
                    height 66px
                    top 75px
                    transform rotate(15deg)
                    left 15%

                &--engaged
                    width 66px
                    bottom 100px
                    right 18%

                &--pattern-04
                    width 160px
                    height 160px
                    top 15px
                    transform rotate(-122deg)
                    right -77px

            &--pattern-15
                width 200px
                height 220px
                bottom -55px
                left -55px
</style>
