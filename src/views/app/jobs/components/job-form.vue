<template>
    <v-layout column mb-5>
        <v-flex tag="h2" class="text-xs-center mb-5">Tell about the job</v-flex>
        <v-flex>
            <v-layout>
                <v-flex xs12>
                      <span :class="{'app-text-light d-inline-block mb-2': true, 'error--text is-invalid': errors.has('type_work_list')}">
                                    Type of work*</span>
                    <v-select placeholder="Please choose"
                              v-model="job.type_work_list[0]"
                              :items="workTypes"
                              item-value="id"
                              item-text="name"
                              v-validate="'required'"
                              data-vv-name="type_work_list"
                              :menu-props="{offsetY: true}"
                              flat
                              solo>
                        <template slot="selection"
                                  slot-scope="{item, index}">
                            <span class="text--black">{{ item.name | capitalize }}</span>
                        </template>
                    </v-select>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex>
            <span :class="{'app-text-light d-inline-block mb-2': true, 'error--text is-invalid': errors.has('availability_list')}">
                                    I specifically need care on*</span>
            <app-table-availability-rates v-model="job.availability_list"
                                          v-validate="'required'"
                                          :error-messages="errors.first('availability_list')"
                                          data-vv-name="close_date"></app-table-availability-rates>
        </v-flex>
        <!--Job date-->
        <v-flex>
            <v-layout row wrap grid-list-lg mt-3>
                <v-flex xs12 md6>
                    <v-menu ref="menu"
                            :close-on-content-click="false"
                            v-model="datePicker2"
                            :nudge-top="30"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            attach="#datePicker2"
                            id="datePicker2"
                            min-width="100%">
                        <v-text-field
                                slot="activator"
                                v-model="computedDateStart"
                                v-validate="'required'"
                                :error-messages="errors.first('start_date')"
                                data-vv-name="start_date"
                                label="Job start date*"
                                persistent-hint
                                outline></v-text-field>
                        <v-date-picker v-model="job.date_start"
                                       width="100%"
                                       no-title @input="datePicker2 = false"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs12 md6>
                    <v-menu ref="menu"
                            :close-on-content-click="false"
                            v-model="datePicker1"
                            :nudge-top="30"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            attach="#datePicker1"
                            id="datePicker1"
                            min-width="100%">
                        <v-text-field
                                slot="activator"
                                v-model="computedDateClose"
                                label="Application close date*"
                                v-validate="'required'"
                                :error-messages="errors.first('close_date')"
                                data-vv-name="close_date"
                                persistent-hint
                                outline></v-text-field>
                        <v-date-picker v-model="job.date_close"
                                       width="100%"
                                       no-title
                                       :min="job.date_start"
                                       @input="datePicker1 = false"></v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex tag="h2" my-5 text-xs-center>
            Ages of the children who need care
        </v-flex>
        <!--list of child age-->
        <v-flex>
            <span :class="{'app-text-light d-inline-block mb-2': true, 'error--text is-invalid': errors.has('child_age_list')}">
                                    Age of the children that need caring for*</span>
            <app-btn-toggle-qualifications v-model="job.child_age_list"
                                           icon-dir="brand"
                                           v-validate="'required'"
                                           data-vv-name="child_age_list"
                                           :items="childAge"></app-btn-toggle-qualifications>
        </v-flex>
<!--        
        <v-flex xs12>
            <div class="d-flex">
                                <span :class="{'app-text-light d-inline-block mb-2': true, 'error--text is-invalid': errors.has('child_count')}">
                                    Children to be cared for at a time*</span>
                <span class="app-text-medium text-xs-right">{{ job.child_count || '1-5+'}}</span>
            </div>
            <v-slider v-model="job.child_count"
                      v-validate="'required|min_value:1'"
                      data-vv-name="child_count"
                      :max="5"
                      class="my-0"></v-slider>
        </v-flex>
-->        
        <v-flex tag="h2" my-5 text-xs-center>
            Any required credentials for the carer?
        </v-flex>
        <!--personal qualifications-->
        <v-flex xs12>
            <div>
                                <span :class="{'app-text-light d-inline-block mb-2': true, 'error--text is-invalid': errors.first('personal_questions_list')}">
                                    Select personal qualifications*</span>
            </div>
            <app-btn-toggle-qualifications v-model="job.personal_questions_list"
                                           icon-dir="brand"
                                           v-validate="'required'"
                                           data-vv-name="personal_questions_list"
                                           :items="qualifications"></app-btn-toggle-qualifications>
        </v-flex>
        <!--work preferences-->
        <v-flex xs12>
            <div>
                                <span :class="{'app-text-light d-inline-block mb-2': true, 'error--text is-invalid': errors.first('work_preferences_list')}">
                                    Select work preferences*</span>
            </div>
            <app-btn-toggle-qualifications v-model="job.work_preferences_list"
                                           icon-dir="brand"
                                           v-validate="'required'"
                                           data-vv-name="work_preferences_list"
                                           :items="preferences"></app-btn-toggle-qualifications>
        </v-flex>
        <v-flex xs12>
            <v-checkbox label="NannyGranny must have valid Working With Children Check"
                        v-model="job.is_wwcverify"
                        :ripple="false"></v-checkbox>
        </v-flex>
        <!--Job descriptions-->
        <v-flex tag="h2" my-5 text-xs-center>
            Job description
        </v-flex>
        <v-flex xs12>
            <v-textarea
                    label="A brief statement about the position* (100 characters is recommended)"
                    v-model="job.description"
                    v-validate="'required'"
                    data-vv-name="description"
                    :error-messages="errors.first('description')"
                    maxlength="500"
                    height="128"
                    outline
                    no-resize
                    class="app-textarea"></v-textarea>
        </v-flex>
        <v-flex xs12>
            <v-text-field label="Job title*"
                          v-model="job.name"
                          v-validate="'required'"
                          maxlength="45"
                          data-vv-name="title"
                          :error-messages="errors.first('title')"
                          flat
                          solo
                          class="app-text-field"></v-text-field>
        </v-flex>
        <v-flex>
            <span class="app-text-light d-inline-block mb-2">Job listing background</span>
            <app-card-job-select-bg v-model="job.theme_body"></app-card-job-select-bg>
        </v-flex>
        <v-flex xs12>
            <div>
                <span class="app-text-light">Job visibility*</span>
            </div>
            <v-radio-group v-model="job.is_visible">
                <v-radio
                        label="Visible - your job is live on our website. NannyGrannies can view and apply for this job."
                        :value="1"
                        :ripple="false"></v-radio>
                <v-radio
                        label="Hidden - your job is hidden on our website and will not be found by NannyGrannies."
                        :value="0"
                        :ripple="false"></v-radio>
            </v-radio-group>
        </v-flex>
        <!--Actions-->
        <v-flex text-xs-center my-5>
            <v-btn v-if="update"
                   :loading="loading"
                   @click="submit('UPDATE')"
                   color="primary"
                   class="v-btn--default elevation-0">
                Update
            </v-btn>
            <v-btn v-else
                   :loading="loading"
                   @click="submit('STORE')"
                   color="primary"
                   class="v-btn--default elevation-0">
                Post a Job
            </v-btn>
            <app-btn-view-profile :item="job"
                                  hide-bottom-panel
                                  class="d-link d-block mx-auto mt-3 _btn-preview">Preview</app-btn-view-profile>
        </v-flex>
    </v-layout>
</template>

<script>
  import Job from '@/models/JobClass'
  import { mapGetters } from 'vuex'
  import AppTableAvailabilityRates from '../../../../components/app-table/app-table-availability-rates'
  import AppBtnToggleQualifications from '../../../../components/app-buttons/app-btn-toggle-qualifications'
  import AppCardJobSelectBg from '../../../../components/app-card/app-card-job-select-bg'
  import AppBtnViewProfile from '../../../../components/app-buttons/app-btn-view-profile'

  export default {
    name: 'app-job-form',
    components: {AppBtnViewProfile, AppCardJobSelectBg, AppBtnToggleQualifications, AppTableAvailabilityRates},
    props: {
      value: {
        type: Job,
        default: () => new Job({type_work_list: [], is_visible: 1})
      },
      update: Boolean
    },

    data () {
      return {
        job: this.value,
        maskDate: '####-##-##',
        datePicker1: false,
        datePicker2: false,
        dictionary: {
          attributes: {
            type_work_list: 'type of work',
            looking_available: ' ',
            close_date: 'close date',
            start_date: 'start date'
          }
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
        'availability'
      ]),
      ...mapGetters('jobs', [
        'loading'
      ]),
      computedDateStart () {
        return this.formatDate(this.job.date_start)
      },
      computedDateClose () {
        return this.formatDate(this.job.date_close)
      }
    },

    mounted () {
      this.$validator.localize('en', this.dictionary)
    },

    methods: {
      submit (action) {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$store.dispatch(`jobs/JOBS_${action}`, this.job)
                .then(() => {
                  if (action === 'UPDATE') {
                    this.showSnackBar('The Job has updated successfully', 'success')
                  } else {
                    this.$router.push({name: 'job-listing'})
                  }
                })
          } else {
            this.goToError()
          }
        })
      },
      goToError () {
        try {
          this.$vuetify.goTo(`[data-vv-name="${this.errors.items[0].field || 'type_work_list'}"]`, {offset: -150})
        } catch (e) {
          console.warn(e)
        }
      },
      formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._btn-preview
        font-size 1rem !important
        text-decoration underline
</style>
