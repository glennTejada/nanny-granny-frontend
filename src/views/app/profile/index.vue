<template>
    <profile-layout v-if="user">
        <v-layout row wrap>
            <v-flex xs12>
                <v-container fill-height w--max--800>
                    <v-layout row wrap>
                        <!--header-->
                        <v-flex xs12 class="text-xs-center">
                            <app-name-page :name="isFromSignup ? 'Your qualifications' : 'My Profile'"
                                           color="var(--green)"></app-name-page>
                        </v-flex>
                        <!--list of the work type-->
                        <v-flex xs12>
                            <div>
                                <v-select label="Looking for work that is*"
                                          placeholder="Please choose"
                                          v-model="user.type_work_list[0]"
                                          :items="workTypes"
                                          item-value="id"
                                          item-text="name"
                                          v-validate="'required'"
                                          data-vv-name="type_work_list"
                                          :menu-props="{offsetY: true}"
                                          outline>
                                    <template slot="selection"
                                              slot-scope="{item, index}">
                                        <span class="text--black">{{ item.name | capitalize }}</span>
                                    </template>
                                </v-select>
                            </div>
                        </v-flex>
                        <!--child age-->
                        <v-flex xs12 mt-3>
                            <div>
                                <span :class="{'app-text-light d-inline-block mb-2': true, 'error--text is-invalid': errors.has('child_age_list')}">
                                    What ages do you feel comfortable caring for?*</span>
                            </div>
                            <app-btn-toggle-qualifications v-model="user.child_age_list"
                                                           icon-dir="brand"
                                                           v-validate="'required'"
                                                           data-vv-name="child_age_list"
                                                           :items="childAge"></app-btn-toggle-qualifications>
                        </v-flex>
                        <!--
                        <v-flex xs12 mt-5>
                            <div class="d-flex">
                                <span :class="{'app-text-light d-inline-block mb-2': true, 'error--text is-invalid': errors.has('child_count')}">
                                    How many children do you feel comfortable caring for at a time*</span>
                                <span class="app-text-medium text-xs-right _count-span">{{ user.child_count || '1-5+'}}{{user.child_count === 5 ? '+':''}}</span>
                            </div>
                            <v-slider v-model="user.child_count"
                                      v-validate="'required|min_value:1'"
                                      data-vv-name="child_count"
                                      :max="5"
                                      class="my-0"></v-slider>
                        </v-flex>
                        -->
                        <!--personal qualifications-->
                        <v-flex xs12 mt-3>
                            <div>
                                <span :class="{'app-text-light d-inline-block mb-2': true, 'error--text is-invalid': errors.first('personal_questions_list')}">
                                    Select personal qualifications*</span>
                            </div>
                            <app-btn-toggle-qualifications v-model="user.personal_questions_list"
                                                           icon-dir="brand"
                                                           v-validate="'required'"
                                                           data-vv-name="personal_questions_list"
                                                           :items="qualifications"></app-btn-toggle-qualifications>
                        </v-flex>
                        <!--work preferences-->
                        <v-flex xs12 mt-5>
                            <div>
                                <span :class="{'app-text-light d-inline-block mb-2': true, 'error--text is-invalid': errors.first('work_preferences_list')}">
                                    Select work preferences*</span>
                            </div>
                            <app-btn-toggle-qualifications v-model="user.work_preferences_list"
                                                           icon-dir="brand"
                                                           v-validate="'required'"
                                                           data-vv-name="work_preferences_list"
                                                           :items="preferences"></app-btn-toggle-qualifications>
                        </v-flex>
                        <!--WWC-->
                        <v-flex xs12 mt-5>
                            <app-profile-wwc></app-profile-wwc>
                        </v-flex>
                        <!--travel for work-->
                        <v-flex xs12 mt-5>
                            <div class="d-flex">
                                <span :class="{'app-text-light d-inline-block mb-2': true, 'error--text is-invalid': errors.first('work_distance')}">
                                    How far are you willing to travel for work?*</span>
                                <span class="app-text-medium text-xs-right _count-span">{{ user.work_distance || '10-70'}} km.</span>
                            </div>
                            <v-slider v-model="user.work_distance"
                                      v-validate="'required|min_value:1'"
                                      data-vv-name="work_distance"
                                      :step="10"
                                      :max="70"
                                      class="my-0"></v-slider>
                        </v-flex>
                        <!--residency status-->
                        <v-flex xs12 mt-3>
                            <div>
                                <v-select label="Australian residency status*"
                                          placeholder="Please choose"
                                          v-model="user.residence_status_list[0]"
                                          :items="residenceStatuses"
                                          v-validate="'required'"
                                          data-vv-name="residence_status_list"
                                          item-value="id"
                                          item-text="name"
                                          :menu-props="{offsetY: true}"
                                          outline>
                                    <template slot="selection"
                                              slot-scope="{item, index}">
                                        <span class="text--black">{{ item.name | capitalize }}</span>
                                    </template>
                                </v-select>
                            </div>
                        </v-flex>
                        <v-flex xs12 mt-3>
                            <v-checkbox v-model="user.recent_police_check"
                                        class="ma-0"
                                        label="I have a recent police check"
                                        :ripple="false"></v-checkbox>
                        </v-flex>
                        <!--Availability & rates-->
                        <v-flex xs12>
                            <h2 class="my-5 text-xs-center">Availability & rates</h2>
                        </v-flex>
                        <v-flex xs12>
                            <div>
                            <span :class="{'app-text-light d-inline-block mb-2': true, 'error--text is-invalid': errors.first('availability_list')}">
                                    My weekly availability*</span>
                                <app-table-availability-rates
                                        v-model="user.availability_list"
                                        v-validate="'required'"
                                        data-vv-name="availability_list"></app-table-availability-rates>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
            <v-flex xs12>
                <v-container grid-list-xl w--max--800>
                    <v-layout row wrap>
                        <!--profile descriptions-->
                        <v-flex tag="h2" class="my-5 text-xs-center">Profile descriptions</v-flex>
                        <v-flex xs12>
                            <v-textarea label="A brief statement about yourself* (100 characters is recommended)"
                                        v-model="user.description"
                                        v-validate="'required'"
                                        data-vv-name="description"
                                        maxlength="500"
                                        height="128"
                                        outline
                                        no-resize></v-textarea>
                        </v-flex>
<!--                        
                        <v-flex xs12 md6>
                            <v-text-field label="Music instruments"
                                          v-model="user.music_instruments"
                                          outline></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-text-field label="Sports"
                                          v-model="user.sports"
                                          outline></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-text-field label="School subjects"
                                          v-model="user.school_subject"
                                          outline></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-text-field label="Languages"
                                          v-model="user.languages"
                                          outline></v-text-field>
                        </v-flex>
-->                        
                    </v-layout>
                </v-container>
            </v-flex>
            <v-flex xs12>
                <v-container w--max--800>
                    <v-layout row wrap>
                        <!--experience working-->
                        <v-flex xs12>
                            <div class="d-flex">
                                <span :class="{'app-text-light d-inline-block mb-2': true, 'error--text is-invalid': errors.first('years_exp')}">
                                    Years of experience working with children*</span>
                                <span class="app-text-medium text-xs-right _count-span">
                                {{ user.years_exp || '0-30+'}}{{user.years_exp > 29 ? '+':''}} years</span>
                            </div>
                            <v-slider v-model="user.years_exp"
                                      v-validate="'required|min_value:1'"
                                      data-vv-name="years_exp"
                                      :max="30"
                                      class="my-0"></v-slider>
                        </v-flex>
                        <!--profile pictures-->
                        <v-flex xs12 my-3>
                            <div class="mb-2">
                                <span class="app-text-light">Profile pictures</span>
                            </div>
                            <app-card-profile-images v-model="images"></app-card-profile-images>
                        </v-flex>
                        <!--profile background-->
                        <v-flex xs12 my-4>
                            <div class="mb-2">
                                <span class="app-text-light">Profile background (optional)</span>
                            </div>
                            <app-card-profile-bg v-model="user.theme_body"></app-card-profile-bg>
                        </v-flex>
                        <!--Visible profile-->
                        <v-flex xs12 my-3>
                            <div>
                                <span class="app-text-light">Forum profile visibility*</span>
                            </div>
                            <v-radio-group v-model="user.is_forumprofilevisible">
                                <v-radio
                                        label="Visible - your forum profile is live on our website. Only other NGs can view your profile and contact you or connect with you."
                                        :value="1"
                                        :ripple="false"></v-radio>
                                <v-radio
                                        label="Hidden - your forum profile is hidden on our website and will not be found by NGs."
                                        :value="0"
                                        :ripple="false"></v-radio>
                            </v-radio-group>
                        </v-flex>
                        <v-flex xs12 my-3>
                            <div>
                                <span class="app-text-light">Live status*</span>
                            </div>
                            <v-radio-group v-model="user.is_livestatusvisible">
                                <v-radio label="Visible - show me when I’m online on our website."
                                         :value="1"
                                         :ripple="false"></v-radio>
                                <v-radio
                                        label="Hidden - your online status is hidden on our website and will not be seen by parents."
                                        :value="0"
                                        :ripple="false"></v-radio>
                            </v-radio-group>
                        </v-flex>
                        <!--actions-->
                        <v-flex xs12 my-3 class="text-xs-center">
                            <v-btn v-if="isFromSignup"
                                   to="/signup/step-3/nanny"
                                   color="primary"
                                   class="v-btn--default elevation-0">
                                Back
                            </v-btn>
                            <v-btn @click="updateProfile"
                                   :loading="loading"
                                   color="primary"
                                   class="v-btn--default elevation-0">
                                {{isFromSignup ? 'Continue': 'Save'}}
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </profile-layout>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import { profile as actions } from '@/store/types/action-types'
  import ParseError from '@/mixins/parse-error'
  import AppBtnToggleQualifications from '../../../components/app-buttons/app-btn-toggle-qualifications'
  import AppCardProfileImages from '../../../components/app-card/app-card-profile-images'
  import AppCardProfileBg from '../../../components/app-card/app-card-profile-bg'
  import AppTableAvailabilityRates from '../../../components/app-table/app-table-availability-rates'
  import AppNamePage from '../../../components/app-name-page'
  import AppProfileWwc from './wwc/index'
  import ProfileLayout from './profile-layout'

  export default {
    name: 'app-profile',

    components: {
      ProfileLayout,
      AppProfileWwc,
      AppNamePage,
      AppTableAvailabilityRates,
      AppCardProfileBg,
      AppCardProfileImages,
      AppBtnToggleQualifications
    },

    mixins: [ParseError],

    props: ['isFromSignup'],

    data () {
      return {
        user: null // <- NannyClass
      }
    },

    computed: {
      ...mapGetters('catalogs', [
        'workTypes',
        'childAge',
        'qualifications',
        'preferences',
        'residenceStatuses'
      ]),
      loading () {
        return this.$store.getters['profile/loading']
      },
      images () {
        return this.$auth.user().images || []
      }
    },

    mounted () {
      this.user = Object.assign({}, this.$auth.user())
    },

    methods: {
      updateProfile () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$store.dispatch('profile/' + actions.UPDATE_PROFILE, this.user)
                .then((user) => {
                  if (this.isFromSignup) {
                    this.$auth.fetch({
                      enabled: true,
                      success: () => {
                        document.cookie = 'rememberMe=false'
                        this.$router.push('/')
                      },
                      error: () => (this.$router.push('signup'))
                    })
                  } else {
                    this.$auth.user(user)
                    this.showSnackBar('Profile has updated successfully', 'success')
                  }
                })
                .catch((error) => {
                  if (error.response.status === 422) {
                    this.showErrors(error.response.data.errors)
                    this.goToError()
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
      }
    },
    beforeRouteEnter (to, from, next) {
      Vue.auth.fetch({
        enabled: true,
        success: () => {
          next()
        },
        error: () => (Vue.router.push('signup'))
      })
    }

  }
</script>

<style lang="stylus" scoped>
    ._count-span
        min-width 80px
        padding-top 2px
</style>
