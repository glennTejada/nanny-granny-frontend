<template>
    <v-layout column
              text-xs-center
              _signup-parent-3>
        <v-flex class="_signup-parent-3--header">
            <h1>Payment</h1>
            <app-svg-icon name="brand/NG_DIVIDER"
                          color="var(--green)"
                          :width="$vuetify.breakpoint.xsOnly ? '100' : '139'"></app-svg-icon>
        </v-flex>
        <!--ACCOUNT FORM-->
        <v-flex>
            <v-container grid-list-xl w--max--800>
                <v-layout row wrap>
                    <v-flex xs12 sm6>
                        <v-text-field label="First name*"
                                      v-model="user.first_name"
                                      v-validate="'required'"
                                      :error-messages="errors.first('first_name')"
                                      data-vv-name="first_name"
                                      outline></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Last name*"
                                      v-model="user.last_name"
                                      v-validate="'required'"
                                      :error-messages="errors.first('last_name')"
                                      data-vv-name="last_name"
                                      outline></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Mobile phone*"
                                      v-model="user.phone"
                                      v-validate="'required'"
                                      :error-messages="errors.first('phone')"
                                      data-vv-name="phone"
                                      placeholder="0123456789"
                                      :mask="maskPhone"
                                      outline></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6> 
                        <app-input-postcode label="Postcode*"
                                            v-model="postcode"
                                            v-validate="'required'"
                                            data-vv-name="postcode"
                                            :hide-details="false"
                                            :error-messages="errors.first('postcode')"
                                            outline></app-input-postcode>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Email*"
                                      v-model="user.email"
                                      :disabled="editingEmail"
                                      v-validate="'required|email'"
                                      :error-messages="errors.first('email')"
                                      data-vv-name="email"
                                      outline></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6 text-xs-left mt-3 px-3>
                        <!--<v-btn @click="editingEmail = !editingEmail">{{ editingEmail ? 'Cancel' : 'Change email'}}</v-btn>-->
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <!--PAYMENT-->
        <v-flex xs12 tag="h2" class="my-5">Choose payment method</v-flex>
        <v-flex xs12>
            <v-container grid-list-xl w--max--800>
                <app-form-payment-credit-card ref="formCreditCard"
                                              :invoice="invoice"></app-form-payment-credit-card>
            </v-container>
        </v-flex>
        <v-flex>
            <v-container w--max--800>
                <v-layout column>
                    <app-card-order-subscription></app-card-order-subscription>
                </v-layout>
            </v-container>
        </v-flex>
        <v-flex class="text-xs-center pa-3">
            <v-btn @click="submit"
                   :loading="loading"
                   class="primary v-btn--default elevation-0 mt-5">
                Purchase
            </v-btn>
            <div class="v-text-field__details" v-if="isError()"><div class="v-messages theme--light error--text"><div class="v-messages__wrapper"><div class="v-messages__message">Missing information.</div></div></div></div>
           
        </v-flex>
        <!--BACKGROUND ELEMENTS-->
        <v-flex v-if="$vuetify.breakpoint.mdAndUp"
                class="_signup-parent-3--bg-elements">
            <app-svg-icon name="patterns/NG_Pattern-16"
                          color="none var(--orange)"
                          class="svg-icon--pattern-16"></app-svg-icon>
            <app-svg-icon name="brand/NG_JOIN_NETWORK"
                          color="var(--yellow)"
                          class="svg-icon--network"></app-svg-icon>
            <app-svg-icon name="brand/NG_ACTIVE"
                          color="var(--green)"
                          class="svg-icon--active"></app-svg-icon>
            <app-svg-icon name="brand/NG_CREATIVE_PLAY"
                          color="var(--orange)"
                          class="svg-icon--play"></app-svg-icon>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppCardOrderSubscription from '@/components/app-card/app-card-order-subscription'
  import AppFormPaymentCreditCard from '../../../../../components/app-form/app-form-payment-credit-card'

  export default {
    name: 'auth-signup-step-3-parent',
    components: {AppFormPaymentCreditCard, AppCardOrderSubscription},
    data () {
      return {
        loading: false,
        editingEmail: false,
        maskPhone: '##########',
        user: {
          first_name: null,
          last_name: null,
          phone: null,
          email: null,
          postcode_id: null
        },
        postcode: null,
        dictionary: {
          attributes: {
            first_name: 'first name',
            last_name: 'last name',
            phone: 'mobile phone'
          }
        }
      }
    },

    watch: {
      postcode () {
        this.user.postcode_id = this.$lodash.get(this.postcode, 'id', null)
      }
    },

    computed: {
      invoice () {
        return this.$store.getters['subscription/payments/invoice']
      }
    },

    mounted () {
      if (this.$lodash.isEmpty(this.$auth.user())) {
        this.$cookie.delete('rememberMe')
        this.$auth.logout()
        this.$router.push('/signup')
      }
      this.$validator.localize('en', this.dictionary)
    },

    created () {
      this.user.email = this.$auth.user().email
    },

    methods: {
      isError () {
        // console.log(this.errors.items)
        return this.errors.items.length > 0
      },
      submit () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.loading = true
            this.$refs.formCreditCard.handleSubmit()
              // Validate paymentForm
              .then((paymentForm) => {
                // Update account
                this.$store.dispatch('register/STEP_3', {data: this.user})
                  .then(() => {
                    // Purchase and finish register
                    this.$store.dispatch('subscription/payments/CREDIT_CARD', paymentForm)
                      .then(res => {
                        this.$auth.fetch({
                          enabled: true,
                          success: () => {
                            this.$cookie.set('rememberMe', 'false')
                            this.$router.push('/')
                          },
                          error: () => (this.$router.push('login'))
                        })
                      }).catch(() => (this.loading = false))
                  })
                  .catch(error => {
                    if (error.response.status === 422) {
                      this.$lodash.forEach(error.response.data.errors, (val, key) => {
                        this.errors.add({
                          field: key,
                          msg: val[0]
                        })
                      })
                    }
                    this.loading = false
                  })
              })
              .catch(() => (this.loading = false))
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .container
      z-index auto
    ._signup-parent-3
        position relative
        padding 150px 0 150px
        &--header .svg-icon
            margin 35px 0
        &--bg-elements
            .svg-icon
                position absolute
                &--pattern-16
                    width 110px
                    height 110px
                    top 80px
                    right 8%
                    transform rotate(40deg)
                &--network
                    width 90px
                    height 80px
                    top 35%
                    left 0
                    transform rotate(15deg)
                    @media (min-width 1200px)
                        left 5%
                        width 117px
                &--active
                    width 80px
                    height 116px
                    top 55%
                    right 0
                    @media (min-width 1200px)
                        right 5%
                &--play
                    width 80px
                    height 116px
                    top 85%
                    left 5%
</style>
