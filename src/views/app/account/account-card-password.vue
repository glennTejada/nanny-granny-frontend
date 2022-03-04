<template>
    <v-dialog v-model="valueInput"
              :fullscreen="$vuetify.breakpoint.xsOnly"
              max-width="685">
        <v-layout class="app-bg-sand column p-relative overflow-hidden">
            <v-flex class="_card-container">
                <v-card class="text-xs-center py-3 app-bg-sand mx-auto"
                        color="transparent"
                        flat>
                    <v-card-title class="layout justify-center column pb-0">
                        <app-svg-icon name="brand/NG_ENGAGED"
                                      color="var(--yellow)"
                                      width="80"></app-svg-icon>
                        <slot name="title">
                            <h2 class="my-3">Change password</h2>
                        </slot>
                    </v-card-title>
                    <v-card-text class="mt-5">
                        <v-text-field label="Current password*"
                                      v-model="form.old_password"
                                      v-validate="'required'"
                                      :error-messages="errors.first('old_password')"
                                      data-vv-name="old_password"
                                      type="password"
                                      class="mb-3"
                                      outline></v-text-field>
                        <v-text-field label="New password*"
                                      v-model="form.password"
                                      v-validate="'required'"
                                      :error-messages="errors.first('password')"
                                      data-vv-name="password"
                                      type="password"
                                      ref="pass"
                                      class="mb-3"
                                      outline></v-text-field>
                        <v-text-field label="Confirm new password*"
                                      v-model="form.password_confirmation"
                                      v-validate="'confirmed:pass'"
                                      :error-messages="errors.first('password_confirmation')"
                                      data-vv-name="password_confirmation"
                                      type="password"
                                      class="mb-3"
                                      outline></v-text-field>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn outline
                               class="px-4"
                               color="primary"
                               @click="$emit('input', false)">
                            Cancel
                        </v-btn>
                        <v-btn class="white--text elevation-0 px-4"
                               color="primary"
                               :loading="loading"
                               @click="changePassword">
                            Apply
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <!--BACKGROUND-->
            <app-svg-icon name="patterns/NG_Pattern-03"
                          :original="true"
                          class="_card--bg_element--pattern hidden-xs-only"></app-svg-icon>
            <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                          name="brand/NG_HOMEWORK_SUPPORT"
                          color="var(--blue)"
                          class="_card--bg_element--housework hidden-xs-only"></app-svg-icon>
        </v-layout>
    </v-dialog>
</template>

<script>
  import {profile as actions} from '@/store/types/action-types'
  import ParseError from '@/mixins/parse-error'

  export default {
    name: 'account-card-password',

    mixins: [ParseError],

    props: ['value'],

    data () {
      return {
        form: {
          old_password: null,
          password: null,
          password_confirmation: null
        },
        dictionary: {
          custom: {
            password_confirmation: {
              confirmed: 'A new password confirmation does not match.'
            }
          }
        }
      }
    },

    computed: {
      valueInput: {
        get: function () {
          return this.value
        },
        set: function (val) {
          this.$emit('input', val)
        }
      },
      loading () {
        return this.$store.getters['profile/loading']
      }
    },

    watch: {
      value () {
        if (!this.value) {
          this.form.old_password = this.form.password = this.form.password_confirmation = null
        }
      }
    },

    mounted () {
      this.$validator.localize('en', this.dictionary)
    },

    methods: {
      changePassword () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$store.dispatch('profile/' + actions.CHANGE_PASSWORD, this.form)
              .then(() => (this.$emit('input', false)))
              .catch((error) => {
                if (error.response.status === 422) {
                  this.showErrors(error.response.data.errors)
                }
              })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._card-container
        padding-top 30px
        padding-bottom 100px
        > .v-card
            max-width 400px
    @media (max-width: 599px)
        .v-card__title
            padding-top 50px
    ._card--bg_element
            &--pattern
                position absolute
                color var(--green)
                bottom 32px
                right -34px
                transform rotate(120deg)
                width 90px
                height 90px
            &--housework
                position absolute
                top 40%
                left 40px
                height 60px
                transform rotate(10deg)
</style>
