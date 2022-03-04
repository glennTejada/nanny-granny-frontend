<template>
    <v-layout row wrap text-xs-center>
        <v-flex xs12 sm6>
            <v-text-field label="Email*"
                          v-model="form.email"
                          v-validate="'required|email'"
                          :error-messages="errors.first('email') || errors.first('credentials')"
                          data-vv-name="email"
                          outline></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field label="Password*"
                          v-model="form.password"
                          v-validate="'required|min:1'"
                          :error-messages="errors.first('password')"
                          data-vv-name="password"
                          type="password"
                          outline></v-text-field>
        </v-flex>
        <v-flex xs12 py-0>
            <v-checkbox v-model="form.rememberMe"
                        label="Remember me"
                        :ripple="false" class="_checkbox"></v-checkbox>
        </v-flex>
        <v-flex xs12>
            <v-btn @click="login"
                   :loading="loading"
                   class="primary v-btn--default elevation-0">Login
            </v-btn>
        </v-flex>
        <v-flex xs12>
            <router-link to="/forgot-password"
                         flat
                         class="link-small"
                         tag="a">
                Forgot your password
            </router-link>
        </v-flex>
    </v-layout>
</template>

<script>
  import { parseUserData } from '@/util'
  import { AUTH_KEY } from '@/config/constants'

  export default {
    name: 'auth-login-email',

    data () {
      return {
        loading: false,
        form: {
          email: '',
          password: '',
          rememberMe: false
        },
        showPassword: false
      }
    },

    mounted () {
      // Can set query parameter here for auth redirect or just do it silently in login redirect.
    },

    methods: {
      login () {
        this.$validator.validateAll().then(result => {
          if (result) {
            if (this.$auth.token()) {
              localStorage.removeItem(AUTH_KEY)
            }
            this.loading = true
            this.$auth.login({
              data: this.form,
              rememberMe: this.form.rememberMe
            })
                .then(res => {
                  this.$auth.user(parseUserData(res.data))
                }, err => {
                  if (err.response.status >= 401 && err.response.status < 500) {
                    this.errors.add({
                      field: 'credentials',
                      msg: err.response.data.message
                    })
                  }
                })
                .finally(() => (this.loading = false))
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._checkbox
        margin-top 0
        padding-top 0
</style>
