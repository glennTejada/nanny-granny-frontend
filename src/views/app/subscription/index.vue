<template>
    <subscription-layout>
        <v-layout>
            <v-container fill-height grid-list-xl w--max--800>
                <v-layout row wrap>
                    <v-flex xs12>
                        <app-name-page name="My Subscription"></app-name-page>
                    </v-flex>
                    <v-flex xs12>
                        <h2 class="_title text-xs-center">My current subscription</h2>
                        <div class="_status-box">
                            <p class="font--medium">
                                <app-svg-icon name="ui/NG_TICK"></app-svg-icon>
                                You are currently subscribed to the
                                <span v-if="$auth.user().subscription">{{($auth.user().plan() || {}).invoice_period}} month plan</span>
                            </p>
                            <p class="font--medium">
                                <app-svg-icon name="ui/NG_TICK"></app-svg-icon>
                                You are currently paid up to and including
                                <span v-if="$auth.user().subscription">{{$auth.user().subscription.ends_at.date | formatDate}}</span>
                            </p>
                        </div>
                    </v-flex>
                    <v-flex xs12 text-xs-center>
                        <h2 class="_title">Change/renew subscription</h2>
                        <app-btn-toggle-plan-reg class="_plan"
                                             v-model="invoice.plan_id"></app-btn-toggle-plan-reg>
                        <v-btn color="primary"
                               @click="modal = true"
                               class="elevation-0 v-btn--default">Renew subscription</v-btn>
                        <!--<v-btn color="primary" outline class="v-btn&#45;&#45;default">Cancel subscription</v-btn>-->
                    </v-flex>
                    <v-flex xs12 class="_invoice-box">
                        <h2 class="_title text-xs-center">Invoice history</h2>
                        <subscription-invoice-table></subscription-invoice-table>
                    </v-flex>
                    <v-dialog v-model="modal"
                              :fullscreen="$vuetify.breakpoint.xsOnly"
                              max-width="750">
                        <v-card flat class="py-5">
                            <v-card-text>
                                <v-container grid-list-xl>
                                    <app-form-payment-credit-card :invoice="invoice"
                                                                  ref="formCard"/>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn depressed
                                       :loading="loading"
                                       @click="purchase"
                                       class="primary ma-auto">Purchase</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </v-container>
        </v-layout>
    </subscription-layout>
</template>

<script>
  import AppBtnTogglePlanReg from '@/components/app-buttons/app-btn-toggle-plan-reg'
  import SubscriptionInvoiceTable from './subscription-invoice-table'
  import AppNamePage from '@/components/app-name-page'
  import SubscriptionLayout from './subscription-layout'
  import AppFormPaymentCreditCard from '../../../components/app-form/app-form-payment-credit-card'
  import InvoiceClass from '../../../models/InvoiceClass'
  import Parent from '../../../models/user/ParentClass'

  export default {
    name: 'subscription',

    components: {AppFormPaymentCreditCard, SubscriptionLayout, AppNamePage, SubscriptionInvoiceTable, AppBtnTogglePlanReg},

    data () {
      return {
        loading: false,
        modal: false,
        invoice: new InvoiceClass(),
        summ: 0
      }
    },

    computed: {
      currentPlan () {
        return this.$store.getters['subscription/selectedPlan']
      }
    },
    watch: {
      currentPlan (plan) {
        let price = this.$lodash.get(plan, 'price_all', 0)
        this.summ = (price === 0 ? this.$lodash.get(plan, 'price', 0) : price)
      }
    },
    created () {
      this.invoice.plan_id = (this.$auth.user().plan() || {}).id
    },
    methods: {
      purchase () {
        this.$refs.formCard.handleSubmit()
          .then(formData => {
            this.loading = true
            formData.plan_id = this.invoice.plan_id
            formData.summ = this.summ
            this.$store.dispatch('subscription/payments/CREDIT_CARD', formData)
              .then((data) => {
              //  console.log(data)
                this.$auth.user(new Parent(data))
                this.modal = false
              }).finally(() => (this.loading = false))
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._title
        margin 30px 0
    ._invoice-box
        margin-bottom 100px
    ._status-box
        color var(--blue)
        border 1px solid
        border-color  var(--grey_3) transparent
        padding 44px 0
        margin-bottom 34px
        > p
            margin-bottom 0
        .svg-icon
            width 16px
            height 16px
            margin-right 6px
    .v-btn--default
        min-width 100%

    @media (min-width: 600px)
        ._title
            margin 54px 0
        ._plan
            padding-top 20px
        ._invoice-box
            margin-top 100px
            margin-bottom 150px
        .v-btn--default
            min-width 217px
        ._status-box
            .svg-icon
                width 20px
                height 20px
                margin-right 16px
</style>
