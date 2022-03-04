<template>
    <v-layout>
        <v-container grid-list-xl>
            <v-layout row wrap>
                <v-flex v-if="item.isChooseLocation"
                        xs12>
                    <v-layout row wrap>
                        <v-flex xs12 sm6>
                            <v-select label="Choose location*"
                                      placeholder="Select state"
                                      v-model="form.location"
                                      :items="locations"
                                      item-value="id"
                                      item-text="name"
                                      v-validate="'required'"
                                      data-vv-name="locations"
                                      :error-messages="errors.first('locations')"
                                      :menu-props="{offsetY: true}"
                                      class="choose-location"
                                      attach=".choose-location"
                                      outline>
                                <template slot="selection"
                                          slot-scope="{item, index}">
                                    <span class="text--black">{{item.name}}</span>
                                </template>
                            </v-select>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex v-else
                        xs12
                        tag="p"
                        class="text-small font--medium">{{wwcForm.form_name}}</v-flex>
                <v-flex xs12 sm6>
                    <v-text-field label="First name* (exactly as shown on certificate)"
                                  v-model="form.first_name"
                                  v-validate="'required'"
                                  :error-messages="errors.first('first_name')"
                                  data-vv-name="first_name"
                                  outline></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-text-field label="Middle name (exactly as shown on certificate)"
                                  v-model="form.givin_name"
                                  data-vv-name="givin_name"
                                  outline></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-text-field label="Family name* (exactly as shown on certificate)"
                                  v-model="form.last_name"
                                  v-validate="'required'"
                                  :error-messages="errors.first('last_name')"
                                  data-vv-name="last_name"
                                  outline></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                    <app-input-datepicker label="Date of birth*"
                                          v-model="form.date_birth"
                                          v-validate="'required'"
                                          :error-messages="errors.first('date_birth')"
                                          data-vv-name="date_birth"></app-input-datepicker>
                </v-flex>

                <v-flex xs12 sm6>
                    <v-text-field label="WWC number*"
                                  v-model="form.wwc_number"
                                  ref="wwc_number"
                                  v-validate="'required'"
                                  :error-messages="errors.first('wwc_number')"
                                  data-vv-name="wwc_number"
                                  outline></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-text-field label="Confirm WWC number*"
                                  v-model="form.confirmed_wwc_number"
                                  v-validate.disbaled="'confirmed:wwc_number'"
                                  :error-messages="errors.first('confirmed_wwc_number')"
                                  data-vv-name="confirmed_wwc_number"
                                  outline></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                    <app-input-datepicker label="Expiry date*"
                                          v-model="form.date_exp"
                                          v-validate="'required'"
                                          :error-messages="errors.first('date_exp')"
                                          data-vv-name="date_exp"
                                          expiry></app-input-datepicker>
                </v-flex>
                <v-flex xs12>
                    <v-checkbox
                            label="I give permission for NannyGranny to verify my qualifications (your permission is required)"
                            v-model="form.give_permission"
                            v-validate="'required'"
                            data-vv-name="give_permission"
                            :error-messages="errors.first('give_permission')"
                            value="1"
                            class="mt-0"
                            :ripple="false"></v-checkbox>
                </v-flex>
                <v-flex xs12 text-xs-center>
                    <v-btn class="primary v-btn--default elevation-0"
                           @click="$emit('close', false)">Cancel
                    </v-btn>
                    <v-btn color="primary"
                           class="v-btn--default"
                           :loading="loading"
                           @click="submit"
                           outline>Submit
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
</template>

<script>
  import AppInputDatepicker from '../../../../../components/app-input/app-input-datepicker'

  export default {
    name: 'wwc-form-A',
    components: {AppInputDatepicker},
    props: ['value', 'wwcForm', 'item'],
    data () {
      return {
        form: {
          wwc_formtemplate_id: this.item.pivot.wwc_formtemplate_id,
          wwc_formtype_id: this.item.pivot.wwc_formtype_id,
          first_name: '',
          givin_name: '',
          last_name: '',
          date_birth: null,
          wwc_number: '',
          confirmed_wwc_number: '',
          give_permission: null,
          date_exp: null,
          location: null
        },
        dictionary: {
          attributes: {
            first_name: 'First name',
            last_name: 'Family name',
            givin_name: 'Given name',
            date_birth: 'Date birth',
            date_exp: 'Expire date',
            wwc_number: 'WWC number',
            confirmed_wwc_number: 'Confirmed WWC number',
            give_permission: 'permission'
          }
        }
      }
    },
    computed: {
      loading () {
        return this.$store.getters['wwc/loading']
      },
      locations () {
        return this.$store.getters['wwc/locations']
      }
    },
    created () {
      this.$store.dispatch('wwc/LOCATIONS')
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)
    },
    methods: {
      submit () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$store.dispatch('wwc/UPDATE', this.form)
              .then(() => {
                this.$auth.user().is_wwcverify = 1 // <- status pending
              })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .xs12 {
    padding: 12px 12px 0 12px;
  }
  .v-input__slot {
    padding-bottom: 0;
  }

</style>
