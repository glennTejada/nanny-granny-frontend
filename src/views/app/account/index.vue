<template>
    <account-layout>
        <v-layout column class="_layout p-relative">
            <!--HEADER-->
            <v-flex>
                <app-name-page name="My Account" icon></app-name-page>
            </v-flex>
            <!--CONTENT-->
            <v-flex>
                <v-container fill-height grid-list-xl w--max--800 _content>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <h2 class="text-xs-center mb-4">Edit your details below</h2>
                        </v-flex>
                        <v-flex xs12>
                            <v-layout row wrap>
                                <v-flex xs12 sm6>
                                    <v-text-field label="Email*"
                                                  type="email"
                                                  v-model="user.email"
                                                  v-validate="'required|email'"
                                                  :error-messages="errors.first('email')"
                                                  data-vv-name="email"
                                                  class="app-text-field"
                                                  outline></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 d-flex class="_input-password">
                                    <label class="app-label">Password*</label>
                                    <a href="#"
                                       @click.stop.prevent="dialogPassword = !dialogPassword"
                                       class="link-small _btn-password">Change my password</a>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field label="First name*"
                                                  v-model="user.first_name"
                                                  v-validate="'required'"
                                                  :error-messages="errors.first('first_name')"
                                                  data-vv-name="first_name"
                                                  class="app-text-field"
                                                  outline></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field label="Last name*"
                                                  v-model="user.last_name"
                                                  v-validate="'required'"
                                                  :error-messages="errors.first('last_name')"
                                                  data-vv-name="last_name"
                                                  class="app-text-field"
                                                  outline></v-text-field>
                                </v-flex>

                                <v-flex v-if="$auth.check('nanny')" xs12 sm6>
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
                                <v-flex v-if="$auth.check('nanny')" xs12 sm6>
                                    <app-input-datepicker label="Date of birth*"
                                                          v-model="user.date_birthday"
                                                          v-validate="'required'"
                                                          :error-messages="errors.first('date_birth')"
                                                          data-vv-name="date_birth"></app-input-datepicker>
                                </v-flex>

                                <v-flex xs12 sm6>
                                    <v-text-field label="Mobile phone*"
                                                  :mask="maskPhone"
                                                  v-model="user.phone"
                                                  v-validate="'required'"
                                                  :error-messages="errors.first('phone')"
                                                  placeholder="0123456789"
                                                  data-vv-name="phone"
                                                  class="app-text-field"
                                                  outline></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <div class="text-xs-left">
                                        <label class="app-label _label-postcode"
                                               :class="{'error--text': errors.first('postcode')}">Postcode*</label>
                                        <app-input-postcode v-model="user.postcode"
                                                            v-validate="'required'"
                                                            ref="postcode"
                                                            :cache-items="true"
                                                            :hide-details="false"
                                                            :error-messages="errors.first('postcode')"
                                                            data-vv-name="postcode"></app-input-postcode>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12>
                            <v-checkbox v-model="user.is_emailme"
                                        class="mt-0"
                                        :ripple="false"
                                        label="Email me NannyGranny updates"></v-checkbox>
                        </v-flex>
                        <!--ACTIONS-->
                        <v-flex xs12 class="text-xs-center mt-3">
                            <v-btn @click="update"
                                   :loading="loading"
                                   class="primary v-btn--default elevation-0">
                                Update
                            </v-btn>
                        </v-flex>
                        <v-flex xs12 class="text-xs-center">
                            <div class="">
                                <a href="#"
                                   @click.stop.prevent="reset"
                                   class="mx-1 link-small">Cancel changes</a>
                                <a href="#"
                                   @click.stop.prevent="dialogAccount = true"
                                   class="mx-1 link-small">Delete account</a>
                            </div>
                        </v-flex>
                    </v-layout>
                    <!-- DIALOGS -->
                    <account-card-password v-model="dialogPassword"></account-card-password>
                    <app-dialog-delete v-model="dialogAccount"
                                       :loading="loading"
                                       @confirm="deleteAccount">
                    </app-dialog-delete>
                </v-container>
            </v-flex>
        </v-layout>
    </account-layout>
</template>

<script>
  import ParseError from '@/mixins/parse-error'
  import { profile as actions } from '@/store/types/action-types'
  import AccountCardPassword from './account-card-password'
  import AppNamePage from '../../../components/app-name-page'
  import AppDialogDelete from '../../../components/app-dialog/app-dialog-delete'
  import AppInputDatepicker from '../../../components/app-input/app-input-datepicker'
  import AccountLayout from './account-layout'

  export default {
    name: 'app-account',

    components: {AccountLayout, AppInputDatepicker, AppDialogDelete, AppNamePage, AccountCardPassword},

    mixins: [ParseError],

    data () {
      return {
        dialogPassword: false,
        dialogAccount: false,
        maskPhone: '##########',
        user: {},
        is_emailme: false,
        gender: null,
        postcode: null
      }
    },

    computed: {
      loading () {
        return this.$store.getters['profile/loading']
      },
      genders () {
        return this.$store.getters['catalogs/gender']
      }
    },

    watch: {
      'user.postcode' () {
        this.user.postcode_id = this.$lodash.get(this.user, 'postcode.id', null)
      }
    },

    created () {
      this.user = this.cloneAuthUser()
      this.syncBtnOverflow()
    },

    methods: {
      cloneAuthUser () {
        return this.$lodash.cloneDeep(this.$auth.user())
      },
      reset () {
        this.user = this.cloneAuthUser()
        this.$refs.postcode.forceSetValue(this.user.postcode)
        this.syncBtnOverflow()
      },
      syncBtnOverflow () {
        if (this.user.role === 'nanny') {
          this.gender = this.genders.filter((item) => parseInt(item.id) === parseInt(this.user.gender))[0] || {}
        }
      },
      update () {
        this.$validator.validateAll().then(result => {
          if (result) {
            let data = this.$lodash.pick(this.user, [
              'email', 'first_name', 'last_name', 'phone', 'postcode_id', 'gender', 'date_birthday'
            ])
            this.$store.dispatch('profile/' + actions.UPDATE_ACCOUNT, data)
                .then((user) => {
                  this.$auth.user(user)
                  this.showSnackBar('Account has updated successfully', 'success')
                })
                .catch((error) => {
                  if (error.response.status === 422) {
                    this.showErrors(error.response.data.errors)
                  }
                })
          }
        })
      },
      deleteAccount () {
        this.$store.dispatch('profile/' + actions.DELETE_ACCOUNT)
            .then(() => this.$auth.logout())
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._layout
        overflow hidden
    ._content
        margin-bottom 100px
        @media (min-width: 600px)
            margin-bottom 150px
    ._label-date,
    ._label-postcode
        display inline-block
        top -1px
        margin-top -2px
    ._label-date
        padding-left 12px
        margin-top 0
        top 6px
        min-width 100%
    ._input-password
        flex-direction column
        min-height 90px
        .app-label
            max-height 36px
        ._btn-password
            display inline-block
</style>

