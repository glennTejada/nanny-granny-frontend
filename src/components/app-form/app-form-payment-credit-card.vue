<template>
    <v-layout row wrap>
        <v-flex xs12 sm6>
            <v-select label="Type of card*"
                      placeholder="Please choose"
                      v-model="formData.card_type"
                      :items="typeCards"
                      v-validate="'required'"
                      data-vv-name="card_type"
                      :error-messages="errors.first('card_type')"
                      :menu-props="{offsetY: true}"
                      outline>
            </v-select>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field label="Name on card*"
                          v-model="formData.card_name"
                          v-validate="'required'"
                          :error-messages="errors.first('card_name')"
                          data-vv-name="card_name"
                          outline></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field label="Card number*"
                          v-model="formData.card_number"
                          v-validate="'required'"
                          :error-messages="errors.first('card_number')"
                          data-vv-name="card_number"
                          :mask="mask"
                          outline></v-text-field>
        </v-flex>
        <v-flex xs12 sm4>
           <app-input-datepicker label="Date expire*"
                                 v-model="formData.card_exp"
                                 v-validate="'required'"
                                 :error-messages="errors.first('card_exp')"
                                 name="card_exp"
                                 hide-day
                                 expiry></app-input-datepicker>
        </v-flex>
        <v-flex xs12 sm2>
            <v-text-field label="CCV*"
                          type="password"
                          v-model="formData.card_ccv"
                          v-validate="'required'"
                          :error-messages="errors.first('ccv')"
                          data-vv-name="ccv"
                          :mask="maskCVV"
                          outline></v-text-field>
        </v-flex>
    </v-layout>
</template>

<script>
  import InvoiceClass from '../../models/InvoiceClass'
  import AppInputDatepicker from '../app-input/app-input-datepicker'

  export default {
    name: 'app-form-payment-credit-card',
    components: {AppInputDatepicker},
    props: {
      invoice: {
        type: InvoiceClass,
        required: true
      }
    },

    data () {
      return {
        mask: 'credit-card',
        maskCVV: '###',
        formData: {
          plan_id: this.invoice.plan_id,
          codenumber: this.invoice.promocode,
          summ: this.invoice.amount,
          card_type: null,
          card_name: null,
          card_number: null,
          card_exp: null
        },
        typeCards: ['Mastercard', 'Visa'],
        dictionary: {
          attributes: {
            card_type: 'card type',
            card_name: 'name',
            card_number: 'number',
            card_exp: 'date expire'
          }
        }
      }
    },

    mounted () {
      this.$validator.localize('en', this.dictionary)
    },

    methods: {
      async handleSubmit (e) {
        let _res = this.formData
        await this.$validator.validateAll().then(result => {
          if (!result) {
            _res = Promise.reject(result)
          }
        })
        return _res
      }
    }
  }
</script>

<style lang="stylus">
    .v-menu__content.menuable__content__active
            z-index 1000 !important
</style>
