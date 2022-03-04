<template>
    <alerts-layout v-if="form">
        <v-layout column
                  _alerts-page>
            <v-flex>
                <app-name-page name="My Alerts"></app-name-page>
            </v-flex>
            <v-flex>
                <v-container grid-list-xl w--max--800>
                    <v-layout row wrap>
                        <v-flex xs12 tag="h2" text-xs-center>
                            Send me an email every:
                        </v-flex>
                        <v-flex xs12 my-5 text-xs-center>
                            <v-btn-toggle v-model="form.day_of_send"
                                          class="_alerts-page--toggle-day"
                                          multiple>
                                <v-btn v-for="(item, i) in days"
                                       :key="item+i"
                                       :value="i"
                                       :ripple="false"
                                       active-class="v-btn--active primary--active"
                                       color="primary"
                                       outline>
                                    {{item}}
                                </v-btn>
                            </v-btn-toggle>
                        </v-flex>
                        <!--CRITERIA-->
                        <v-flex xs12 tag="h2" text-xs-center>
                            When a profile is added that matches the following criteria:
                        </v-flex>
                        <v-flex xs12 my-5 px-4>
                            <v-layout row wrap class="border border--sand">
                                <v-flex v-for="(criteria, key) in criterias"
                                        :key="key"
                                        xs12 sm6 md4
                                        class="border border--sand">
                                    <v-card flat>
                                        <v-card-text>
                                            <p class="font--medium">{{criteria.title}}</p>
                                            <v-card-text class="select-all">
                                                <v-checkbox :ripple="false"
                                                            @click="clickSelectAll(criteria, key)"
                                                            v-model="criteria.selecAllChecked"
                                                            class="mt-1"
                                                            hide-details>
                                                    <template slot="label">
                                                        <span class="text-small text--charcoal">Select All</span>
                                                    </template>
                                                </v-checkbox>
                                            </v-card-text>
                                            <v-checkbox v-if="criteria.type === 'checkbox'"
                                                        v-for="item in criteria.items"
                                                        v-model="form[key]"
                                                        :key="'cr'+item.id"
                                                        :ripple="false"
                                                        :value="item.id"
                                                        @change="checkSelectAll(criteria, key)"
                                                        class="mt-1"
                                                        hide-details>
                                                <template slot="label">
                                                    <span class="text-small text--charcoal">{{item.name}}</span>
                                                </template>
                                            </v-checkbox>
                                            <v-radio-group v-if="criteria.type === 'radio'"
                                                           v-model="form[key]">
                                                <v-radio v-for="item in criteria.items"
                                                         :key="'rad' + item.value"
                                                         :ripple="false"
                                                         :label="item.name"
                                                         :value="item.value"></v-radio>
                                            </v-radio-group>
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <div class="d-flex">
                                <span :class="{
                                    'app-text-light d-inline-block mb-2': true,
                                    'error--text is-invalid': errors.has('postcode')
                                    }">
                                    Postcode*</span>
                            </div>
                            <app-input-postcode v-model="postcode"
                                                v-validate="'required'"
                                                ref="postcode"
                                                :cache-items="true"
                                                :error-messages="errors.first('postcode')"
                                                data-vv-name="postcode"></app-input-postcode>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <div class="d-flex mb-2">
                                <span class="app-text-light d-inline-block">Max pay per hour</span>
                                <span class="app-text-medium text-xs-right">${{form.pay_per_hour | perHour}}</span>
                            </div>
                            <v-slider v-model="form.pay_per_hour"
                                      height="48"
                                      :max="36"
                                      class="my-0"></v-slider>
                        </v-flex>
                        <v-flex v-if="$auth.check('parent')" xs12>
                            <div class="d-flex  mb-2">
                                <span class="app-text-light d-inline-block">Min years of experience</span>
                                <span class="app-text-medium text-xs-right">{{form.years_exp | yearsExp}}</span>
                            </div>
                            <v-slider v-model="form.years_exp"
                                      height="48"
                                      :max="5"
                                      class="my-0"></v-slider>
                        </v-flex>
                        <v-flex v-else xs12>
                            <div class="d-flex mb-2">
                                <span class="app-text-light d-inline-block">Distance to travel</span>
                                <span class="app-text-medium text-xs-right">{{form.work_distance || '10-70'}} km</span>
                            </div>
                            <v-slider v-model="form.work_distance"
                                      height="48"
                                      :max="70"
                                      class="my-0"></v-slider>
                        </v-flex>
                        <!--Actions-->
                        <v-flex xs12 text-xs-center>
                            <v-btn class="primary elevation-0 v-btn--default"
                                   :loading="loading"
                                   @click="save">Save
                            </v-btn>
                        </v-flex>
<!--                        
                        <v-flex xs12 text-xs-center>
                            <router-link :to="`/${$auth.check('parent') ? 'nannies' : 'jobs'}?filters=alerts`"
                                         flat
                                         class="link-small"
                                         tag="a">
                                Run this as search now
                            </router-link>
                        </v-flex>
-->                        
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </alerts-layout>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AppNamePage from '../../../components/app-name-page'
  import Alerts from '../../../models/AlertsClass'
  import AlertsLayout from './alerts-layout'

  export default {
    name: 'alerts',
    components: {AlertsLayout, AppNamePage},
    filters: {
      yearsExp (val) {
        switch (val) {
          case 0:
            return '1-5+ years'
          case 1:
            return '1 year'
          case 5:
            return '5+ years'
          default:
            return val + ' years'
        }
      },
      perHour (val) {
        switch (val) {
          case 0:
            return '15-35'
          case 36:
            return '35+'
          default:
            return val
        }
      }
    },
    data () {
      return {
        postcode: null,
        form: null,
        days: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
      }
    },

    computed: {
      ...mapGetters('catalogs', [
        'workTypes',
        'availability',
        'childAge',
        'qualifications',
        'preferences',
        'gender'
      ]),
      loading () {
        return this.$store.getters['profile/loading']
      },
      criterias () {
        let data = {
          'type_work_list': {
            title: 'Type of work',
            type: 'checkbox',
            selecAllChecked: false,
            items: this.workTypes
          },
          'availability_list': {
            title: 'Availability',
            type: 'checkbox',
            selecAllChecked: false,
            items: this.availability
          },
          'child_age_list': {
            title: 'Provides care for ages',
            type: 'checkbox',
            selecAllChecked: false,
            items: this.childAge
          },
          'personal_questions_list': {
            title: 'Personal qualifications',
            type: 'checkbox',
            selecAllChecked: false,
            items: this.qualifications
          },
          'work_preferences_list': {
            title: 'Work preferences',
            type: 'checkbox',
            selecAllChecked: false,
            items: this.preferences
          },
          'gender_list': {
            title: 'Gender',
            type: 'checkbox',
            selecAllChecked: false,
            items: this.gender
          }
        }
/*
        if (this.$auth.check('nanny')) {
          delete data['gender_list']
          data['child_count'] = {
            title: 'Children at time',
            type: 'radio',
            items: [
              {name: '1', value: 1},
              {name: '2', value: 2},
              {name: '3', value: 3},
              {name: '4', value: 4},
              {name: '5+', value: 5}
            ]
          }
        }
*/
        return data
      }
    },

    watch: {
      postcode () {
        if (this.form) {
          this.form.postcode_id = (this.postcode || {}).id
        }
      }
    },

    mounted () {
      this.$store.dispatch('profile/ALERTS').finally(() => {
        this.form = this.$store.getters['profile/alerts'] || new Alerts()
        if (this.form.postcode) {
          this.postcode = this.form.postcode
        } else {
          this.postcode = this.$auth.user().postcode
        }
      })
    },

    beforeDestroy () {
      this.$store.commit('profile/ALERTS', null)
    },

    methods: {
      clickSelectAll (criteria, key) {
        if (criteria.selecAllChecked) {
          this.form[key] = []
          criteria.selecAllChecked = false
        } else {
          this.form[key] = criteria.items.map(e => {
            return e.id
          })
          criteria.selecAllChecked = true
        }
      },
      checkSelectAll (criteria, key) {
        if (!Array.isArray(this.form[key])) {
          return false
        }
        criteria.selecAllChecked = this.form[key].length === criteria.items.length
        return this.form[key].length === criteria.items.length
      },
      save () {
        this.$validator.validateAll().then(result => {
          if (result) {
            delete this.form['postcode']
            this.$store.dispatch('profile/UPDATE_ALERTS', this.form)
                .then(() => (this.showSnackBar('Alerts have saved successfully', 'success')))
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .select-all
        padding 6px 0
        span
            font-weight 600
    ._alerts-page
        &--toggle-day
            background-color #fff
            box-shadow none
            position relative
            z-index 10
            > .v-btn
                width 38px
                height 39px
                opacity 1
                @media (min-width 600px)
                    width 80px
                    height 82px
                @media (min-width 960px)
                    width 108px
                    height 90px
                &.primary--text
                    border-color var(--blue)
                &--active:before
                    background-color var(--blue)
</style>
