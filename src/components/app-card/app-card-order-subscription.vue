<template>
    <v-card flat>
        <v-card-title class="justify-center">
            <h3 class="mb-4">Order summary</h3>
        </v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-card-actions v-if="plan">
            <div class="">{{ plan.invoice_period }} {{ plan.invoice_interval }} membership</div>
            <v-spacer></v-spacer>
            <div class="">${{invoice.amount}}</div>
        </v-card-actions>
        <v-card-actions>
            <h3 class="primary--text">Total</h3>
            <v-spacer></v-spacer>
            <h3>${{invoice.amount}}</h3>
        </v-card-actions>
        <v-divider class="mt-4"></v-divider>
    </v-card>
</template>

<script>
  import Invoice from '../../models/InvoiceClass'

  export default {
    name: 'app-card-order-subscription',

    props: ['value'],

    computed: {
      plan () {
        return this.$store.getters['subscription/selectedPlan']
      },
      invoice () {
        return this.$store.getters['subscription/payments/invoice']
      }
    },

    watch: {
      plan (val) {
        console.log('dsfdsfs')
        this.$store.commit('subscription/payments/SET_INVOICE', new Invoice({
          plan_id: this.$lodash.get(val, 'id', 0),
          transactionAmount: (this.$lodash.get(val, 'price_all', 0) === null ? this.$lodash.get(val, 'price', 0) : this.$lodash.get(val, 'price_all', 0))
        }))
      }
    }
  }
</script>

<style scoped>

</style>
