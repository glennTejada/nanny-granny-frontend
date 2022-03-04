<template>
    <v-layout _signup-nanny-2 column p-relative>
        <v-flex>
            <v-container grid-list-xl fill-height w--max--800>
                <v-layout row wrap>
                    <v-flex xs12 class="text-xs-center _signup-nanny-2--header">
                        <h1>Your details</h1>
                        <app-svg-icon name="brand/NG_DIVIDER"
                                      color="var(--green)"
                                      :width="$vuetify.breakpoint.xsOnly ? '100' : '139'"></app-svg-icon>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="First name*"
                                      v-model="user.first_name"
                                      v-validate="'required'"
                                      :error-messages="errors.first('first_name')"
                                      data-vv-name="first_name"
                                      outline></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Last name* (won't be shown on your profile)"
                                      v-model="user.last_name"
                                      v-validate="'required'"
                                      :error-messages="errors.first('last_name')"
                                      data-vv-name="last_name"
                                      outline></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-select label="Gender*"
                                  placeholder="Please choose"
                                  v-model="user.gender"
                                  :items="genders"
                                  item-value="id"
                                  item-text="name"
                                  :error-messages="errors.first('gender')"
                                  v-validate="'required'"
                                  data-vv-name="gender"
                                  :menu-props="{offsetY: true}"
                                  outline>
                            <template slot="selection"
                                      slot-scope="{item, index}">
                                <span class="text--black">{{ item.name | capitalize }}</span>
                            </template>
                        </v-select>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Mobile phone* (won't be shown on your profile)"
                                      v-model="user.phone"
                                      v-validate="'required'"
                                      :error-messages="errors.first('phone')"
                                      data-vv-name="phone"
                                      :mask="maskPhone"
                                      outline></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <app-input-datepicker label="Date of birth* (won't be shown on your profile)"
                                              v-model="user.date_birthday"
                                              v-validate="'required'"
                                              :error-messages="errors.first('date_birthday')"
                                              data-vv-name="date_birthday"></app-input-datepicker>
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
                                      v-validate="'required|email'"
                                      :error-messages="errors.first('email')"
                                      data-vv-name="email"
                                      outline></v-text-field>
                    </v-flex>
                    <v-flex xs12 class="text-xs-center">
                        <v-btn @click="submit"
                               :loading="loading"
                               class="primary my-5 v-btn--default elevation-0">
                            Continue
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <!--BACKGROUND ELEMENTS-->
        <v-flex v-if="$vuetify.breakpoint.mdAndUp"
                class="_signup-nanny-2--bg-elements">
            <app-svg-icon name="brand/NG_CRAFTY"
                          color="var(--yellow)"
                          class="svg-icon--crafty"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-16"
                          color="none var(--orange)"
                          class="svg-icon--pattern-16"></app-svg-icon>
            <app-svg-icon name="brand/NG_ACTIVE"
                          color="var(--green)"
                          class="svg-icon--active"></app-svg-icon>
        </v-flex>
    </v-layout>
</template>

<script>
  import {register as mutations} from '@/store/types/mutation-types'
  import Nanny from '@/models/user/NannyClass'
  import AppInputDatepicker from '../../../../../components/app-input/app-input-datepicker'

  export default {
    name: 'auth-signup-personal-details',
    components: {AppInputDatepicker},
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (!vm.$auth.token()) {
          // vm.$router.push('/signup')
        }
      })
    },

    data () {
      return {
        maskPhone: '##########',
        user: {
          email: '',
          first_name: null,
          last_name: null,
          gender: null,
          phone: null,
          date_birthday: null,
          postcode_id: null
        },
        gender: null,
        postcode: null,
        dictionary: {
          attributes: {
            first_name: 'First name',
            last_name: 'Last name',
            phone: 'Mobile phone',
            date_birthday: 'Date of birth'
          }
        }
      }
    },

    computed: {
      loading () {
        return this.$store.getters['register/loading']
      },
      genders () {
        return this.$store.getters['catalogs/gender']
      }
    },

    watch: {
      formatDate () {
        this.user.date_birthday = this.formatDate
      },
      postcode () {
        this.user.postcode_id = this.$lodash.get(this.postcode, 'id', null)
      },
      gender () {
        this.user.gender = this.$lodash.get(this.gender, 'id', null)
      }
    },

    mounted () {
      this.$validator.localize('en', this.dictionary)
      this.$cookie.delete('rememberMe')
      if (this.$auth.user() && this.$auth.user().email) {
        this.$store.commit('register/' + mutations.REGISTER_STEPPER_TYPE, 'nanny')
        this.user.email = this.$auth.user().email
      } else {
        this.$router.push('/signup?role=nanny')
      }
    },

    methods: {
      submit () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$store.dispatch('register/STEP_2', {data: this.user})
              .then(data => {
                this.$auth.user(new Nanny(data))
                this.$router.push('/signup/step-3/nanny')
              })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._signup-nanny-2
        &--header
            margin-top 130px

            .svg-icon
                margin 30px 0

        &--bg-elements
            .svg-icon
                position absolute
                &--crafty
                    width 100px
                    height 100px
                    top 40%
                    left 0
                    transform rotate(10deg)
                    @media (min-width 1200px)
                        left 8%
                &--pattern-16
                    width 116px
                    height 116px
                    top 230px
                    right 7%
                &--active
                    width 90px
                    height 100px
                    bottom 100px
                    right 10%
</style>
