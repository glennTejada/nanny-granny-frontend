<template>
    <v-layout row wrap _exemption-layout>
        <v-flex xs12>
            <v-card flat>
                <v-card-title>
                    <p class="font--medium ma-0">I qualify for an exemption</p>
                </v-card-title>
                <v-card-text>
                    <v-radio-group v-model="form.wwc_qualityexemption_id"
                                   v-validate="'required'"
                                   :error-messages="errors.first('wwc_qualityexemption_id')"
                                   data-vv-name="wwc_qualityexemption_id"
                                   class="ma-0 d-block">
                        <template v-for="(item, i) in wwcForm.qualityexemptions">
                            <v-radio :key="'type_' + item.id"
                                     :ripple="false"
                                     :value="item.id">
                                <template slot="label">{{item.name | stateName(wwcForm.state)}}</template>
                            </v-radio>
                            <v-text-field v-if="form.wwc_qualityexemption_id === item.id"
                                          v-model="form.wwc_number"
                                          v-validate="'required'"
                                          :error-messages="errors.first('wwc_number')"
                                          data-vv-name="wwc_number"
                                          class="d-block"
                                          outline>
                                <template slot="label">{{item.name | inputLabelName | stateName(wwcForm.state)}}</template>
                            </v-text-field>
                        </template>
                    </v-radio-group>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn class="primary v-btn--default elevation-0 justify-center"
                           @click="$emit('close', false)">Cancel
                    </v-btn>
                    <v-btn color="primary"
                           class="v-btn--default my-5"
                           :loading="loading"
                           @click="submit"
                           outline>Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'wwc-form-B',
    filters: {
      stateName (val, name) {
        if (!val) return ''
        return val.toString().replace(/\[state\]/, name)
      },
      inputLabelName (val) {
        if (!val) return ''
        let string = val.toString().toLowerCase()
        if (string.indexOf('teacher') !== -1) {
          return 'Enter Teacher Registration Number*'
        } else if (string.indexOf('[state] police') !== -1) {
          return 'Enter [state] Police ID Number*'
        } else if (string.indexOf('federal police') !== -1) {
          return 'Enter Federal Police ID Number*'
        }
        return ''
      }
    },
    props: ['value', 'wwcForm', 'item'],
    data () {
      return {
        form: {
          wwc_formtype_id: this.item.pivot.wwc_formtype_id,
          wwc_formtemplate_id: this.item.pivot.wwc_formtemplate_id,
          wwc_qualityexemption_id: null,
          wwc_number: null
        }
      }
    },
    computed: {
      loading () {
        return this.$store.getters['wwc/loading']
      }
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

<style lang="stylus" scoped>
    ._exemption-layout
        .v-text-field
            max-width 400px
            padding 16px 30px
</style>
