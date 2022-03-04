<template>
    <v-layout column _signup-layout>
        <v-flex class="_signup-layout--benefits-section app-bg-sand">
            <v-container>
                <v-layout column justify-center text-xs-center>
                    <v-flex tag="h1"
                            class="_signup-layout--header">Register now</v-flex>
                    <v-flex>
                        <app-btn-toggle-role v-model="user.role"
                                             class="_signup-layout--toggle_role"></app-btn-toggle-role>
                    </v-flex>
                    <v-flex>
                        <app-auth-benefits hide-actions
                                           class="mb-5">
                            <template slot="header">
                                <h2>Member benefits</h2>
                            </template>
                        </app-auth-benefits>
                    </v-flex>
                </v-layout>
            </v-container>
            <!--BACKGROUND ELEMENTS-->
            <v-flex v-if="$vuetify.breakpoint.mdAndUp"
                    class="_signup-layout--bg-elements"> 
                <div v-parallax="$helpers.getSpeedAnimationDown()" class="smooth-parallax">
                  <app-svg-icon name="brand/NG_AGES_5+"
                                color="var(--yellow)"
                                class="svg-icon--ages"></app-svg-icon>
                </div>
                <div v-parallax="$helpers.getSpeedAnimationDown()" class="smooth-parallax">
                  <app-svg-icon name="patterns/NG_Pattern-16"
                                color="none var(--orange)"
                                class="svg-icon--pattern-16"></app-svg-icon>
                </div>
                <div v-parallax="$helpers.getSpeedAnimationUp()" class="smooth-parallax">
                  <app-svg-icon name="patterns/NG_Pattern-03"
                                color="none var(--green)"
                                class="svg-icon--pattern-03"></app-svg-icon>
                </div>
                <div v-parallax="$helpers.getSpeedAnimationDown()" class="smooth-parallax">
                  <app-svg-icon name="brand/NG_HAS_CAR"
                                color="var(--blue)"
                                class="svg-icon--car"></app-svg-icon>
                </div>
            </v-flex>
        </v-flex>
        <v-flex>
            <v-container>
                <v-layout column justify-center text-xs-center>
                    <v-flex tag="h2"
                            class="_signup-layout--subheader">
                        Register with
                    </v-flex>
                    <!--SOCIAL-->
                    <v-flex>
                        <auth-social :input-role="user.role"
                                     class="column"
                                     register></auth-social>
                    </v-flex>
                    <!--DIVIDER-->
                    <v-flex class="_signup-layout--divider">
                        <app-svg-icon name="brand/NG_DIVIDER"></app-svg-icon>
                        <span class="font--medium d-inline-block mx-4">or</span>
                        <app-svg-icon name="brand/NG_DIVIDER"></app-svg-icon>
                    </v-flex>
                    <!--EMAIL-->
                    <v-flex tag="h2"
                            class="_signup-layout--subheader_second">Use your email address</v-flex>
                    <v-flex class="d-flex justify-center">
                        <v-layout column
                                  class="_signup-layout--form">
                            <v-flex xs12 sm6>
                                <v-text-field label="Email*"
                                              v-model="user.email"
                                              v-validate="'required|email'"
                                              :error-messages="errors.first('email')"
                                              data-vv-name="email"
                                              ref="email"
                                              outline></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Confirm Email*"
                                              v-model="emailConfirm"
                                              v-validate.disbaled="'confirmed:email'"
                                              :error-messages="errors.first('email_confirm')"
                                              data-vv-name="email_confirm"
                                              outline></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Password*"
                                              v-model="user.password"
                                              v-validate="'required|min:6'"
                                              :error-messages="errors.first('password')"
                                              data-vv-name="password"
                                              type="password"
                                              outline></v-text-field>
                            </v-flex>
                            <v-checkbox v-model="user.is_emailme"
                                        class="mt-0"
                                        :ripple="false">
                                <template slot="label">
                                    <div class="text-small">Email me NannyGranny updates</div>
                                </template>
                            </v-checkbox>
                            <v-checkbox v-validate="'required'"
                                        v-model="user.is_agreepp"
                                        :error-messages="errors.collect('is_agreepp')"
                                        value="1"
                                        data-vv-name="is_agreepp"
                                        type="checkbox"
                                        :ripple="false">
                                <template slot="label">
                                    <div class="text-small">
                                        By joining I agree to the&nbsp;
                                        <a href="#"
                                           @click.stop.prevent="dialogShow('policy')"
                                           class="link-small">
                                            Privacy Policy
                                        </a>
                                        &nbsp;and the&nbsp;
                                        <a href="#"
                                           @click.stop.prevent="dialogShow('legal')"
                                           class="link-small">
                                            Terms of use
                                        </a>*
                                    </div>
                                </template>
                            </v-checkbox>
                            <v-flex _signup-layout--actions>
                                <v-btn @click="register"
                                       :loading="loading"
                                       class="primary v-btn--default elevation-0">
                                    Get started
                                </v-btn>
                            </v-flex>
                            <v-flex>
                                <span class="app-text-light">Already have an account?</span>
                                <router-link to="/login" tag="a" class="link-small">Login here</router-link>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <v-dialog v-model="dialog.show"
                  :fullscreen="$vuetify.breakpoint.xsOnly"
                  max-width="750">
            <v-card>
                <v-card-text v-html="dialog.text"></v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn flat
                           @click="user.is_agreepp = null, dialog.show = false">
                        No
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="white--text"
                           color="primary accent-4"
                           @click="user.is_agreepp = '1', dialog.show = false">
                        Yes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
  import AppScrollPatterns from '../../../../../components/app-scroll-patterns'
  import AuthSocial from '../../components/auth-social'
  import AppBtnToggleRole from '@/components/app-buttons/app-btn-toggle-role'
  import { register as mutations } from '@/store/types/mutation-types'
  import { AUTH_KEY } from '@/config/constants'
  import AppAuthBenefits from '../../components/app-auth-benefits'

  export default {
    name: 'auth-signup-register',

    components: {AppScrollPatterns, AppAuthBenefits, AppBtnToggleRole, AuthSocial},

    data () {
      return {
        user: {
          role: this.$route.query.role || 'parent',
          email: '',
          password: '',
          is_emailme: null,
          is_agreepp: null
        },
        emailConfirm: null,
        showPassword: false,
        dialog: {
          show: false,
          text: ''
        },
        dictionary: {
          attributes: {
            email_confirm: 'email confirm',
            is_agreepp: 'agreement'
          },
          custom: {
            email_confirm: {
              confirmed: 'The email confirmation does not match.'
            }
          }
        }
      }
    },

    computed: {
      loading () {
        return this.$store.getters['register/loading']
      },
      stepperType () {
        return this.user.role
      },
      policy () {
        return this.$store.getters['page/content']('privacy-policy')[0]
      },
      legal () {
        return this.$store.getters['page/content']('legal')[0]
      }
    },

    watch: {
      stepperType () {
        this.$store.commit('register/' + mutations.REGISTER_STEPPER_TYPE, this.stepperType)
      }
    },

    created () {
      this.$store.commit('register/' + mutations.REGISTER_STEPPER_TYPE, this.stepperType)
    },

    mounted () {
      this.$validator.localize('en', this.dictionary)
    },

    methods: {
      dialogShow (type) {
        this.dialog.show = true
        this.dialog.text = this[type].description
      },
      register () {
        if (this.$auth.token()) {
          localStorage.removeItem(AUTH_KEY)
        }
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$store.dispatch('register/STEP_1', {data: this.user})
                .then((res) => {
                  this.$router.push(`signup/step-2/${this.user.role}`)
                })
                .catch((error) => {
                  if (error.response.status === 422) {
                    this.$lodash.forEach(error.response.data.errors, (val, key) => {
                      this.errors.add({
                        field: key,
                        msg: val[0]
                      })
                    })
                  }
                })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._signup-layout
        &--header
            margin 50px 0 50px
            @media (min-width 960px)
                margin 128px 0 50px
        &--subheader
            margin 90px 0 50px
        &--subheader_second
            margin-bottom 60px
        &--toggle_role
            margin-bottom 80px
        &--actions
            margin 60px 0 20px
        &--form
            max-width 365px
            margin-bottom 150px
        &--divider
            @media (min-width 600px)
                margin-top 80px
                margin-bottom 68px
            .svg-icon
                width 100px
                height 50px
                color var(--yellow)
                @media (min-width 600px)
                    width 139px
        &--benefits-section
            position relative
            overflow-x hidden
        &--bg-elements
            .smooth-parallax
                top -100px
            .svg-icon
                position absolute
                &--ages
                    width 116px
                    height 116px
                    top -550px
                    left 16%
                    transform rotate(10deg)
                &--pattern-16
                    width 116px
                    height 116px
                    top -550px
                    right 11%
                &--pattern-03
                    width 116px
                    height 116px
                    top -300px
                    left -60px
                    transform rotate(75deg)
                &--car
                    width 116px
                    height 116px
                    top -300px
                    right 10%
                    transform rotate(23deg)
</style>
