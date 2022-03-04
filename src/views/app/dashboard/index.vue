<template>
    <v-layout column
              fill-height
              :class="[authIsParent ? '_view--parent' : '_view--nanny']">
        <!--HEADER-->
      <transition name="fadein-transition" appear>
        <app-layout-greeting class="_header flex" dashboard>
            <v-container>
                <v-layout row wrap text-xs-center>
                    <v-flex tag="h1"
                            xs12
                            md6
                            offset-md3
                            class="_header--title">
                        {{greeting()}}, {{$auth.user().first_name | capitalize}}
                    </v-flex>
                    <v-flex v-if="authIsParent" tag="p"
                            class="app-text-mono offset-md2 md8 xs12">
                        {{quote.description}}
                    </v-flex>
                    <v-flex v-if="authIsNanny" tag="p"
                            class="app-text-mono offset-md2 md8 xs12">
                        {{quote.description}}
                    </v-flex>
                    <v-flex xs12
                            class="_header--divider">
                        <app-svg-icon name="brand/NG_DIVIDER"></app-svg-icon>
                    </v-flex>
                </v-layout>
            </v-container>
        </app-layout-greeting>
      </transition>
        <!--DASHBOARD-->
        <v-flex class="_dashboard">
            <v-container grid-list-xl>
                <v-layout row wrap _fluid>
                    <v-flex tag="h2"
                            text-xs-center
                            xs12 class="_header--sub _header--sub_dashboard hidden-xs-only">Dashboard
                    </v-flex>
                    <v-flex xs12 md6>
                        <dashboard-navbar></dashboard-navbar>
                        <dashboard-membership v-if="authIsParent"
                                              class="hidden-xs-only"></dashboard-membership>
                    </v-flex>
                    <v-flex class="xs12 md6 hidden-xs-only">
                        <dashboard-inbox></dashboard-inbox>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <transition name="slide-y-transition">
            <v-flex v-if="item && (item.availability_list?item.availability_list.length:0 > 0 )"
                    class="_dashboard--profile-box">
                <v-container grid-list-xl>
                    <v-layout column _fluid>
                        <v-flex class="_divider hidden-xs-only">
                            <app-svg-icon name="brand/NG_DIVIDER"></app-svg-icon>
                        </v-flex>
                        <v-flex class="_header--sub text-xs-center xs12">
                            <h2 class="mb-3">
                                My {{authIsParent ? 'Job' : 'Profile'}}
                            </h2>
                            <router-link :to="authIsParent ? '/job-listing' : '/profile'"
                                         class="link-small">
                                Edit {{authIsParent ? 'Job' : 'Profile'}}
                            </router-link>
                        </v-flex>
                        <v-flex mt-3 _card-box>
                            <v-layout>
                                <component :is="currentCard"
                                           :item="item"
                                           hide-actions></component>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
                <!--BACKGROUND ELEMENTS-->
                <div class="_dashboard--profile-box--bg-elements">
                    <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
                        <app-svg-icon :name="`patterns/NG_Pattern-${authIsParent ? '06' : '01'}`"
                                      class="_right-pattern"
                                      :color="`none var(--${authIsParent ? 'yellow' : 'green'})`"></app-svg-icon>
                    </div>
                    <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
                        <app-svg-icon :name="`patterns/NG_Pattern-${authIsParent ? '12' : '10'}`"
                                      class="_left-pattern"
                                      :color="`none var(--${authIsParent ? 'blue_medium' : 'yellow'})`"></app-svg-icon>
                    </div>
                </div>
            </v-flex>
        </transition>
        <v-flex class="_resources">
            <v-container grid-list-xl>
                <v-layout column>
                    <v-flex class="_divider hidden-xs-only">
                        <app-svg-icon name="brand/NG_DIVIDER"></app-svg-icon>
                    </v-flex>
                    <v-flex class="_header--sub text-xs-center xs12">
                        <h2 class="mt-2 mb-3">
                            {{authIsParent ? 'Parent' : 'NannyGranny'}} resources
                        </h2>
                        <dashboard-resources></dashboard-resources>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <v-flex v-if="!authIsParent">
            <app-card-faqs></app-card-faqs>
        </v-flex>
    </v-layout>
</template>

<script>
  import DashboardNavbar from './components/dashboard-navbar'
  import DashboardMembership from './components/dashboard-membership'
  import DashboardInbox from './components/dashboard-inbox'
  import AppCardJob from '../../../components/app-card/listing/app-card-job'
  import AppCardNanny from '../../../components/app-card/listing/app-card-nanny'
  import DashboardResources from './components/dashboard-resources'
  import AppCardFaqs from '../../../components/app-card/app-card-faqs'
  import AppLayoutGreeting from '../../../components/app-layout-greeting'

  export default {
    name: 'dashboard',
    components: {
      AppLayoutGreeting,
      AppCardFaqs,
      DashboardResources,
      AppCardNanny,
      AppCardJob,
      DashboardInbox,
      DashboardMembership,
      DashboardNavbar
    },
    data () {
      return {
        item: null
      }
    },

    computed: {
      authIsParent () {
        return this.$auth.check('parent')
      },
      authIsNanny () {
        return this.$auth.check('nanny')
      },
      currentCard () {
        return this.$auth.check('parent') ? 'AppCardJob' : 'AppCardNanny'
      },
      quote () {
        return this.$store.getters['catalogs/quote']
      }
    },

    created () {
      if (this.$auth.check('parent')) {
        this.$store.dispatch('catalogs/FETCH_QUOTE')
        this.$store.dispatch('jobs/JOBS_GET').then(() => {
          this.item = this.$store.getters['jobs/collection'][0]
        })
      } else if (this.$auth.check('nanny')) {
        this.item = this.$auth.user()
      }
    },

    methods: {
      greeting () {
        let hr = new Date().getHours()
        if (hr < 5) {
          return 'Goodnight'
        } else if (hr < 12) {
          return 'Good morning'
        } else if (hr < 18) {
          return 'Good day'
        } else if (hr < 22) {
          return 'Good evening'
        } else {
          return 'Goodnight'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._divider
        text-align center
        margin-top 80px
        margin-bottom 0
        .svg-icon
            width 139px
    ._card-box
        position relative
        z-index 10
    ._header
        &--sub
            margin-top 30px
        &--title
            margin-top 40px
            margin-bottom 10px
        &--divider
            margin-top 0
            margin-bottom 10px
            .svg-icon
                width 100px

    ._resources
        min-height 200px
        ._header--sub
            margin-top 5px

    ._view
        &--parent
            ._header
                background-color var(--pink)
                &--divider
                    color var(--orange)
        ._divider
            color var(--orange)
        &--nanny
            ._header
                background-color var(--blue_light)
            ._header--divider
                margin-top 10px
                color var(--green)
            ._divider
                color var(--green)

    @media (max-width: 599px)
        .layout._fluid
            margin -16px !important

        ._card-box
            overflow-x hidden
            > .layout
                margin-right -25px !important
                margin-left -25px !important

    @media (min-width: 600px)
        ._dashboard
            margin-bottom 20px
        ._header
            &--title
                margin-top 130px
                margin-bottom 30px
            &--divider
                margin-top 60px
                .svg-icon
                    width 139px
            &--sub
                margin-top 20px
                &_dashboard
                    margin-top 130px
                    margin-bottom 40px
        ._resources
            min-height 350px
        ._view
            &--parent
                ._header
                    min-height 525px
                ._divider
                    color var(--orange)
            &--nanny
                ._header
                    min-height 400px
                ._divider
                    color var(--green)
    ._dashboard--profile-box
        position relative
        &--bg-elements
            position relative
            .svg-icon
                width 100px
                height 120px
                position absolute
                z-index 1
                &._right-pattern
                    right  0
                    top 70px
                &._left-pattern
                    left 0
                    bottom -35px
                @media (min-width 600px)
                    &._right-pattern
                        top 220px
                @media (min-width 960px)
                    width 180px
                    height 200px
                    &._right-pattern
                        top -450px
                    &._left-pattern
                        bottom -60px

</style>
