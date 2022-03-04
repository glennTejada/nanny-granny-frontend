<template>
    <v-layout column _signup-nanny-3>
        <v-container fill-height w--max--800>
            <v-layout wrap row>
                <v-flex class="_signup-nanny-3--header text-xs-center">
                    <h1>Your qualifications</h1>
                    <app-svg-icon name="brand/NG_DIVIDER"
                                  color="var(--green)"
                                  :width="$vuetify.breakpoint.xsOnly ? '100' : '139'"></app-svg-icon>
                </v-flex>
                <!-- AVATAR -->
                <v-flex xs12 my-5>
                    <div class="app-label">Profile pictures (optional)</div>
                    <app-card-profile-images v-model="images"></app-card-profile-images>
                </v-flex>
                <!-- BACKGROUND -->
                <v-flex xs12 mb-5>
                    <div class="app-label">Profile background</div>
                    <app-card-profile-bg v-model="user.theme_body"></app-card-profile-bg>
                </v-flex>
                <!-- WWC -->
                <v-flex xs12 mb-5>
                    <app-profile-wwc>
                        <template slot="title">
                            Enter WWC (or equivalent) details to verify your application
                        </template>
                    </app-profile-wwc>
                </v-flex>
                <!-- ACTIONS -->
                <v-flex xs12 text-xs-center mb-5>
                    <h3 class="mt-5 mb-3">Create your full profile now or later</h3>
                    <p class="app-text-regular">It’ll only take 3 minutes, but don’t worry if you’re in a rush, 
                      you 
                      can complete 
                      this later in your account section.</p>
                </v-flex>
                <v-flex xs12 text-xs-center mb-4>
                    <v-btn @click="fillProfile"
                           class="v-btn--default elevation-0"
                           color="primary">
                        Create full profile now
                    </v-btn>
                    <v-btn :loading="loading"
                           @click="continueWithout"
                           class="v-btn--default"
                           color="primary"
                           outline>Later, continue without
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        <!--BACKGROUND ELEMENTS-->
        <v-flex v-if="$vuetify.breakpoint.mdAndUp"
                class="_signup-nanny-3--bg-elements">
            <app-svg-icon name="patterns/NG_Pattern-03"
                          color="none var(--green)"
                          class="svg-icon--pattern-03"></app-svg-icon>
            <app-svg-icon name="brand/NG_CREDENTIALS"
                          color="var(--yellow)"
                          class="svg-icon--credentials"></app-svg-icon>
            <app-svg-icon name="brand/NG_HAS_CAR"
                          color="var(--orange)"
                          class="svg-icon--car"></app-svg-icon>
            <app-svg-icon name="brand/NG_COOKING_BAKING"
                          color="var(--blue_medium)"
                          class="svg-icon--cooking"></app-svg-icon>
            <app-svg-icon name="brand/NG_ACTIVE"
                          color="var(--yellow)"
                          class="svg-icon--active"></app-svg-icon>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppCardProfileImages from '@/components/app-card/app-card-profile-images'
  import AppCardProfileBg from '@/components/app-card/app-card-profile-bg'
  import AppProfile from '../../../profile/index'
  import AppProfileWwc from '../../../profile/wwc/index'

  export default {
    name: 'auth-signup-step-3-nanny',

    components: {AppProfileWwc, AppProfile, AppCardProfileBg, AppCardProfileImages},

    data () {
      return {
        user: {
          theme_body: null
        }
      }
    },

    computed: {
      loading () {
        return this.$store.getters['profile/loading']
      },
      images () {
        return this.$auth.user().images || []
      }
    },

    mounted () {
      if (this.$lodash.isEmpty(this.$auth.user())) {
        this.$cookie.delete('rememberMe')
        this.$router.push('/signup')
      }
    },

    methods: {
      continueWithout () {
        let data = {theme_body: this.user.theme_body}
        this.$store.dispatch('profile/UPDATE_THEME', data)
          .then(res => {
            this.$auth.fetch({
              enabled: true,
              success: () => {
                this.$cookie.set('rememberMe', 'false')
                this.$router.push('/')
              },
              error: () => (this.$router.push('signup'))
            })
          })
      },

      fillProfile () {
        this.$router.push('/signup/step-3/nanny/fill-profile')
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._signup-nanny-3
        position relative
        padding 50px 0 50px
        overflow-x hidden
        @media (min-width 600px)
            padding 150px 0 150px

        &--header .svg-icon
            margin 15px 0
            @media (min-width 600px)
                margin 35px 0
        &--bg-elements
            .svg-icon
                position absolute
                &--credentials
                    width 90px
                    height 90px
                    top 28%
                    right 0
                    transform rotate(15deg)
                    @media (min-width 1200px)
                        right 6%
                &--pattern-03
                    width 110px
                    height 110px
                    top 80px
                    left -40px
                    transform rotate(40deg)
                &--car
                    width 90px
                    height 80px
                    top 45%
                    left 0
                    transform rotate(15deg)
                    @media (min-width 1200px)
                        left 2%
                        width 117px
                &--cooking
                    width 80px
                    height 116px
                    top 65%
                    right 0
                    @media (min-width 1200px)
                        left 8%
                &--active
                    width 80px
                    height 116px
                    top 85%
                    left 0
</style>
