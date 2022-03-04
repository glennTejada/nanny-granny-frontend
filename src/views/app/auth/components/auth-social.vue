<template>
    <v-layout v-if="!code"
              class="row wrap"
              :class="{'_auth-social--login align-center': viewLogin, '_auth-social--register': register}">
        <v-flex class="d-flex column align-center">
            <app-brandshape v-if="viewLogin"
                            color="var(--sand)"
                            :width="$vuetify.breakpoint.xsOnly ? '60px' : '78px'"
                            :height="$vuetify.breakpoint.xsOnly ? '60px' : '78px'"
                            class="mb-3">
                <div class="_auth-social--icon _auth-social--icon_facebook">
                    <app-svg-icon name="ui/NG_FACEBOOK"
                                  :height="$vuetify.breakpoint.xsOnly ? '30px' : '40px'"
                                  color="var(--white)"></app-svg-icon>
                </div>
            </app-brandshape>
            <v-btn class="primary v-btn--default elevation-0"
                   :loading="loading.facebook"
                   @click="social('facebook')">
                <div v-if="viewLogin">Login with Facebook</div>
                <div v-else>
                    <app-svg-icon name="ui/NG_FACEBOOK"
                                  height="20"
                                  width="30"
                                  color="var(--white)"></app-svg-icon>Facebook
                </div>
            </v-btn>
        </v-flex>
        <v-flex v-if="viewLogin && $vuetify.breakpoint.mdAndUp" class="_auth-social--login--divider">
            <app-svg-icon v-if="viewLogin"name="brand/NG_ACTIVE"
                          width="70"
                          height="60"
                          color="var(--green)"></app-svg-icon>
        </v-flex>
        <v-flex class="d-flex column align-center">
            <app-brandshape v-if="viewLogin"
                            color="var(--sand)"
                            :width="$vuetify.breakpoint.xsOnly ? '60px' : '78px'"
                            :height="$vuetify.breakpoint.xsOnly ? '60px' : '78px'"
                            class="mb-3">
                <div class="_auth-social--icon _auth-social--icon_google">
                    <app-svg-icon name="ui/NG_GOOGLE_+"
                                  color="var(--white)"
                                  :width="$vuetify.breakpoint.xsOnly ? '36px' : '42px'"></app-svg-icon>
                </div>
            </app-brandshape>
            <v-btn class="primary v-btn--default elevation-0"
                   :loading="loading.google"
                   @click="social('google')">
                <div v-if="viewLogin">Login with Google</div>
                <div v-else>
                    <app-svg-icon name="ui/NG_GOOGLE_+"
                                  height="20"
                                  width="45"
                                  color="var(--white)"></app-svg-icon>Google
                </div>
            </v-btn>
        </v-flex>
    </v-layout>
    <v-layout v-else>
        <h2 class="text-xs-center my-5">Redirecting...</h2>
    </v-layout>
</template>

<script>
  import AppBrandshape from '../../../../components/app-brandshape'

  export default {
    name: 'auth-social',
    components: {AppBrandshape},
    props: {
      inputRole: {
        type: String,
        default: 'parent'
      },
      viewLogin: Boolean,
      register: Boolean
    },

    data () {
      return {
        loading: {
          facebook: false,
          google: false
        },
        code: this.$route.query.code,
        type: this.$route.params.type // <- provider
      }
    },

    computed: {
      role () {
        return this.$route.params.role || this.inputRole
      },
      actionType () {
        let _action = this.register ? 'register' : 'login'
        try {
          _action = JSON.parse(this.$route.query.state)
        } catch (e) {
        }
        return _action
      }
    },

    mounted () {
      if (this.code) {
        let param = {
          code: this.code,
          provider: this.type,
          role_id: this.role,
          actiontype: this.actionType,
          redirect_uri: this.redirectURI()
        }
        this.$store.dispatch('register/STEP_1', {data: param, social: true})
            .then((user) => {
              if (user.is_registred) {
                this.$auth.fetch({
                  enabled: true,
                  success: () => {
                    this.$cookie.set('rememberMe', 'false')
                    this.$router.push('/dashboard')
                  },
                  error: () => (this.$router.push('login'))
                })
              } else {
                this.$router.push(`/signup/step-2/${user.role}`)
              }
            })
            .catch((err) => {
              this.$router.push('/login')
              this.showSnackBar(err.response.data.message, 'error')
            })
      }
    },

    methods: {
      social (type) {
        this.loading[type] = true
        this.$auth.oauth2({
          provider: type || this.type,
          params: {
            redirect_uri: this.redirectURI(type),
            // Specifies value that the application uses to maintain state
            // between your authorization request and the authorization server's response
            state: (this.register ? 'register' : 'login')
          }
        })
      },
      redirectURI (type) {
        return `${this.$auth.options.getUrl()}/oauth2/${type || this.type}/${this.role}`
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .column
        flex-direction column
    ._auth-social
        &--login
            background-color transparent
            &--divider
                transform rotate(15deg)
            .v-btn--default
                min-width 262px
        &--icon
            height 100%
            display flex
            align-items center
            justify-content center
            &_facebook
                background var(--yellow)
            &_google
                background var(--orange)
        &--register
            .v-btn--default
                min-width 265px
</style>
