<template>
    <v-layout column _signup-parent-2>
        <v-flex class="p-relative">
            <v-container fill-height w--max--800 _signup-parent-2--header-container>
                <v-layout row wrap justify-center text-xs-center>
                    <v-flex tag="h1" class="_signup-parent-2--header">Choose a plan</v-flex>
                    <v-flex xs12>
                        <app-btn-toggle-plan-reg></app-btn-toggle-plan-reg>
                    </v-flex>
                </v-layout>
            </v-container>
            <!--BACKGROUND ELEMENTS-->
            <v-flex v-if="$vuetify.breakpoint.mdAndUp"
                    class="_signup-parent-2--bg-elements">
                <app-svg-icon name="brand/NG_CRAFTY"
                              color="var(--yellow)"
                              class="svg-icon--crafty"></app-svg-icon>
                <app-svg-icon name="brand/NG_HOMEWORK_SUPPORT"
                              color="var(--blue)"
                              class="svg-icon--homework"></app-svg-icon>
                <app-svg-icon name="patterns/NG_Pattern-13"
                              color="none var(--orange)"
                              class="svg-icon--pattern-13"></app-svg-icon>
                <app-svg-icon name="patterns/NG_Pattern-18"
                              color="var(--orange) none"
                              class="svg-icon--pattern-18"></app-svg-icon>
                <app-svg-icon name="brand/NG_ACTIVE"
                              color="var(--yellow)"
                              class="svg-icon--active"></app-svg-icon>
            </v-flex>
        </v-flex>
        <v-flex>
            <v-container fill-height w--max--800>
                <v-layout row wrap justify-center text-xs-center>
                    <v-flex xs6 d-flex my-4 align-baseline>
                        <v-text-field label="Apply promo"
                                      v-model="form.codenumber"
                                      v-validate="'required'"
                                      :error-messages="errors.first('promo')"
                                      data-vv-name="promo"
                                      outline></v-text-field>
                        <v-btn class="primary elevation-0"
                               :loading="checkingPromo"
                               @click="applyPromocode">Apply
                        </v-btn>
                    </v-flex>
                    <v-flex xs12 my-5>
                        <app-card-order-subscription></app-card-order-subscription>
                    </v-flex>
                    <v-flex _signup-parent-2--actions>
                        <v-btn :loading="loading"
                               class="ma-0 primary v-btn--default elevation-0"
                               @click="submit">
                            Continue to payment
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppBtnTogglePlanReg from '@/components/app-buttons/app-btn-toggle-plan-reg'
  import AppCardOrderSubscription from '@/components/app-card/app-card-order-subscription'

  export default {
    name: 'auth-signup-step-2-parent',

    components: {AppCardOrderSubscription, AppBtnTogglePlanReg},

    data () {
      return {
        checkingPromo: false,
        form: {
          summ: null,
          codenumber: null
        }
      }
    },

    computed: {
      loading () {
        return this.$store.getters['register/loading']
      },
      currentPlan () {
        return this.$store.getters['subscription/selectedPlan']
      }
    },

    watch: {
      currentPlan (plan) {
        let price = this.$lodash.get(plan, 'price_all', 0)
        this.form.summ = (price === 0 ? this.$lodash.get(plan, 'price', 0) : price)
      }
    },

    mounted () {
      this.$cookie.delete('rememberMe')
      if (this.$auth.user() && !this.$auth.user().email) {
        this.$router.push('/signup?role=parent')
      }
    },

    methods: {
      applyPromocode () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.checkingPromo = true
            this.$store.dispatch('subscription/payments/APPLY_PROMOCODE', this.form)
              .catch(error => {
                if (error.response.status === 404) {
                  this.errors.add({
                    field: 'promo',
                    msg: 'Promo not found.'
                  })
                }
              })
              .finally(() => (this.checkingPromo = false))
          }
        })
      },
      submit () {
        this.$store.dispatch('register/STEP_2', {data: this.user})
          .then(() => (this.$router.push('/signup/step-3/parent')))
          .catch(error => (console.log(error)))
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._signup-parent-2
        &--header-container
            position relative
            z-index 20

        &--header
            margin 50px 0 50px
            @media (min-width 960px)
                margin 130px 0 100px

        &--actions
            margin 50px 0 150px

        &--bg-elements
            position absolute
            overflow hidden
            background-color var(--sand)
            width 100%
            height 65%
            top 0
            left 0

            .svg-icon
                position absolute

                &--crafty
                    width 100px
                    height 100px
                    top -30px
                    left 15%
                    transform rotate(10deg)

                &--homework
                    width 50px
                    height 70px
                    top 80px
                    right 20%
                    transform rotate(-15deg)

                &--pattern-13
                    width 160px
                    height 200px
                    top 30px
                    right -80px
                    transform rotate(-45deg)

                &--pattern-18
                    width 180px
                    height 116px
                    top 250px
                    left -20px

                &--active
                    width 80px
                    height 116px
                    top 300px
                    right 8%
</style>
