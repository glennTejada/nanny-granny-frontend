<template>
    <v-layout row wrap>
        <v-flex xs12 sm6 md3>
            <app-input-postcode v-model="postcodeInput"></app-input-postcode>
        </v-flex>
        <v-flex xs12 sm6 md3>
            <v-select placeholder="Type of work"
                      v-model="filters.type_work_list"
                      :items="workTypes"
                      item-value="id"
                      item-text="name"
                      multiple
                      hide-details
                      @input="selecAllChecked.type_work_list = checkSelectAll('type_work_list', 'workTypes')"
                      :menu-props="{offsetY: true}"
                      solo>
                    <template slot="prepend-item">
                      <v-checkbox
                          :ripple="false"
                          @change="clickSelectAll('type_work_list', 'workTypes')"
                          v-model="selecAllChecked.type_work_list"
                          class="ml-3 mt-1 mb-2"
                          hide-details>
                          <template slot="label">
                              <span class="text-small text--charcoal">Select All</span>
                          </template>                    
                      </v-checkbox>                          
                    </template>
                    <template slot="selection" slot-scope="{item, index}">
                      <span v-if="index === 0" class="text--black">
                        {{ item.name | capitalize }}
                      </span>
                      <span v-if="index === 1" class="mx-1">
                        ...(+{{ filters.type_work_list.length - 1 }})
                      </span>
                    </template>
            </v-select>
        </v-flex>
        <v-flex xs12 sm6 md3>
            <v-select :placeholder="job ? 'My availability' : 'Availability'"
                      v-model="filters.availability_list"
                      :items="availability"
                      item-value="id"
                      item-text="name"
                      multiple
                      hide-details
                      @input="selecAllChecked.availability_list = checkSelectAll('availability_list', 'availability')"
                      :menu-props="{offsetY: true}"
                      solo>
                    <template slot="prepend-item">
                      <v-checkbox
                          :ripple="false"
                          @change="clickSelectAll('availability_list', 'availability')"
                          v-model="selecAllChecked.availability_list"
                          class="ml-3 mt-1 mb-2"
                          hide-details>
                          <template slot="label">
                              <span class="text-small text--charcoal">Select All</span>
                          </template>                    
                      </v-checkbox>                          
                    </template>

                <template slot="selection"
                          slot-scope="{item, index}">
                                        <span v-if="index === 0"
                                              class="text--black">{{ item.name | capitalize }}</span>
                    <span v-if="index === 1" class="mx-1">
                                            ...(+{{ filters.availability_list.length - 1 }})</span>
                </template>
            </v-select>
        </v-flex>
        <v-flex v-show="refine" xs12 sm6 md3>
            <v-select :placeholder="job ? 'My personal qualifications' : 'Personal qualifications'"
                      v-model="filters.personal_questions_list"
                      :items="qualifications"
                      item-value="id"
                      item-text="name"
                      multiple
                      hide-details
                      @input="selecAllChecked.personal_questions_list = checkSelectAll('personal_questions_list', 'qualifications')"
                      :menu-props="{offsetY: true}"
                      solo>
                    <template slot="prepend-item">
                      <v-checkbox
                          :ripple="false"
                          @change="clickSelectAll('personal_questions_list', 'qualifications')"
                          v-model="selecAllChecked.personal_questions_list"
                          class="ml-3 mt-1 mb-2"
                          hide-details>
                          <template slot="label">
                              <span class="text-small text--charcoal">Select All</span>
                          </template>                    
                      </v-checkbox>                          
                    </template>
                <template slot="selection"
                          slot-scope="{item, index}">
                                        <span v-if="index === 0"
                                              class="text--black">{{ item.name | capitalize }}</span>
                    <span v-if="index === 1" class="mx-1">
                                            ...(+{{ filters.personal_questions_list.length - 1 }})</span>
                </template>
            </v-select>
        </v-flex>
        <v-flex v-show="refine" xs12 sm6 md3>
            <v-select :placeholder="job ? 'My work preferences':'Work preferences'"
                      v-model="filters.work_preferences_list"
                      :items="preferences"
                      item-value="id"
                      item-text="name"
                      multiple
                      hide-details
                      @input="selecAllChecked.work_preferences_list = checkSelectAll('work_preferences_list', 'preferences')"
                      :menu-props="{offsetY: true}"
                      solo>
                    <template slot="prepend-item">
                      <v-checkbox
                          :ripple="false"
                          @change="clickSelectAll('work_preferences_list', 'preferences')"
                          v-model="selecAllChecked.work_preferences_list"
                          class="ml-3 mt-1 mb-2"
                          hide-details>
                          <template slot="label">
                              <span class="text-small text--charcoal">Select All</span>
                          </template>                    
                      </v-checkbox>                          
                    </template>
                <template slot="selection"
                          slot-scope="{item, index}">
                                        <span v-if="index === 0"
                                              class="text--black">{{ item.name | capitalize }}</span>
                    <span v-if="index === 1" class="mx-1">
                                            ...(+{{ filters.work_preferences_list.length - 1 }})</span>
                </template>
            </v-select>
        </v-flex>
        <v-flex v-show="refine" xs12 sm6 md3>
            <v-select :placeholder="job ? 'I provides care for ages':'Provides care for'"
                      v-model="filters.child_age_list"
                      :items="childAge"
                      item-value="id"
                      item-text="name"
                      multiple
                      hide-details
                      @input="selecAllChecked.child_age_list = checkSelectAll('child_age_list', 'childAge')"
                      :menu-props="{offsetY: true}"
                      solo>
                    <template slot="prepend-item">
                      <v-checkbox
                          :ripple="false"
                          @change="clickSelectAll('child_age_list', 'childAge')"
                          v-model="selecAllChecked.child_age_list"
                          class="ml-3 mt-1 mb-2"
                          hide-details>
                          <template slot="label">
                              <span class="text-small text--charcoal">Select All</span>
                          </template>                    
                      </v-checkbox>                          
                    </template>
                <template slot="selection"
                          slot-scope="{item, index}">
                                        <span v-if="index === 0"
                                              class="text--black">{{ item.name | capitalize }}</span>
                    <span v-if="index === 1" class="mx-1">
                                            ...(+{{ filters.child_age_list.length - 1 }})</span>
                </template>
            </v-select>
        </v-flex>
<!--        
        <v-flex v-show="refine" xs12 sm6 md3>
            <div class="d-flex">
                <span class="app-text-light d-inline-block">Number of children</span>
                <span class="app-text-medium text-xs-right">
                    {{ filters.child_count || '1-5+'}}{{filters.child_count > 4 ? '+':''}}
                </span>
            </div>
            <v-slider v-model="filters.child_count"
                      :max="5"
                      hide-details
                      class="my-0 px-2"></v-slider>
        </v-flex>
-->        
        <v-flex v-show="refine" xs12 sm6 md3>
            <div class="d-flex">
                <span class="app-text-light d-inline-block">Pay per hour</span>
                <span class="app-text-medium text-xs-right">${{ filters.pay_hour | perHour}}</span>
            </div>
            <v-slider v-model="filters.pay_hour"
                      :min="pay_min"
                      :max="36"
                      hide-details
                      class="my-0 px-2"></v-slider>
        </v-flex>
        <!--Only for nanny-->
        <v-flex v-if="!job" v-show="refine" xs12 sm6 md3>
            <div class="d-flex">
                <span class="app-text-light d-inline-block">Years of experience</span>
                <span class="app-text-medium text-xs-right">
                    {{ filters.years_exp || '0-30+ years'}}{{filters.years_exp > 29 ? '+':''}}
                </span>
            </div>
            <v-slider v-model="filters.years_exp"
                      :max="30"
                      hide-details
                      class="my-0 px-2"></v-slider>
        </v-flex>
        <!--end: only for nanny-->
        <!--Only for job-->
        <v-flex v-if="job" v-show="refine" xs12 sm6 md3>
            <div class="d-flex">
                <span class="app-text-light d-inline-block">Distance to travel</span>
                <span class="app-text-medium text-xs-right">{{ filters.work_distance || '10-70'}} km</span>
            </div>
            <v-slider v-model="filters.work_distance"
                      :max="70"
                      :step="10"
                      hide-details
                      class="my-0 px-2"></v-slider>
        </v-flex>
        <v-flex v-if="job" v-show="refine" xs12 sm6 md3>
            <v-select placeholder="My gender"
                      v-model="filters.gender"
                      :items="gender"
                      item-value="id"
                      item-text="name"
                      hide-details
                      @input="selecAllChecked.gender = checkSelectAll('gender', 'gender')"
                      :menu-props="{offsetY: true}"
                      solo>
                    <template slot="prepend-item">
                      <v-checkbox
                          :ripple="false"
                          @change="clickSelectAll('gender', 'gender')"
                          v-model="selecAllChecked.gender"
                          class="ml-3 mt-1 mb-2"
                          hide-details>
                          <template slot="label">
                              <span class="text-small text--charcoal">Select All</span>
                          </template>                    
                      </v-checkbox>                          
                    </template>
                <template slot="selection"
                          slot-scope="{item}">
                    <span class="text--black">{{ item.name | capitalize }}</span>
                </template>
            </v-select>
        </v-flex>
        <!--end: only for job-->
        <v-flex v-show="refine" xs12 sm6 md3>
            <v-text-field v-model="filters.keyword"
                          placeholder="Keyword"
                          hide-details
                          outline
                          class="ma-0 _input--solo"></v-text-field>
        </v-flex>

        <!--ACTIONS-->
        <v-flex v-if="refine && !job" xs12 sm6 md3></v-flex>
        <v-flex xs12 sm6 md3>
            <div class="d-flex align-center">
                <a href="#"
                   @click.stop.prevent="refineFilters(!refine)"
                   class="link-small mr-2 text-xs-center">
                    {{refine?'Less filters':'Refine search'}}
                </a>
                <v-btn @click="$emit('apply', postcodeInput)"
                       :disabled="!filters.postcode_id"
                       :loading="loading"
                       class="primary ma-0 elevation-0">
                    Apply
                </v-btn>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'app-filters-listing',

    model: {
      prop: 'value',
      event: 'change'
    },
    filters: {
      perHour (val) {
        switch (val) {
          case 14:
            return '15-35'
          case 36:
            return '35+'
          default:
            return val
        }
      }
    },
    props: {
      value: Object,
      postcode: Object,
      loading: Boolean,
      job: Boolean
    },

    data () {
      return {
        refine: false,
        postcodeInput: this.postcode,
        filters: this.value,
        pay_min: 14,
        selecAllChecked: {
          type_work_list: this.checkSelectAll('type_work_list', 'workTypes'),
          availability_list: this.checkSelectAll('availability_list', 'availability'),
          personal_questions_list: this.checkSelectAll('personal_questions_list', 'qualifications'),
          work_preferences_list: this.checkSelectAll('work_preferences_list', 'preferences'),
          child_age_list: this.checkSelectAll('child_age_list', 'childAge'),
          gender: this.checkSelectAll('gender', 'gender')
        }
      }
    },

    computed: {
      ...mapGetters('catalogs', [
        'workTypes',
        'childAge',
        'qualifications',
        'preferences',
        'residenceStatuses',
        'availability',
        'gender'
      ])
    },

    watch: {
      postcodeInput () {
        this.filters.postcode_id = (this.postcodeInput || {}).id
      }
    },

    methods: {
      clickSelectAll (list, data) {
        if (!this.selecAllChecked[list]) {
          this.filters[list] = []
          this.selecAllChecked[list] = false
        } else {
          this.filters[list] = this[data].map(e => {
            return e.id
          })
          this.selecAllChecked[list] = true
        }
      },
      checkSelectAll (list, data) {
        if (!this.filters) {
          return false
        }
        if (!Array.isArray(this.filters[list])) {
          return false
        }
        return this[data].length === this.filters[list].length
      },
      refineFilters (val) {
        if (!val) {
          this.pay_min = 14
          let _this = this
          this.$lodash.forOwn(_this.filters, (item, key) => {
            if (!['postcode_id', 'type_work_list', 'availability_list'].includes(key)) {
              delete this.filters[key]
            }
          })
        }
        this.refine = val
      }
    }
  }
</script>

<style lang="stylus">
    .v-menu__content.menuable__content__active
            z-index 1000 !important
    .v-select
        .menuable__content__active
            z-index 1000 !important
        .v-input__slot
            cursor pointer !important
    ._input--solo
        .v-input__slot
            margin-top 0 !important
</style>
