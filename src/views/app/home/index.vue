<template>
    <v-layout row wrap>
        <v-flex xs12>
          <transition name="fadein-transition" appear>
            <app-layout-greeting>
                <v-layout column _homepage-header
                          :class="classHeader">
                    <!-- The banner -->
                    <v-flex xs12>
                        <app-home-greeting v-if="$auth.check()"></app-home-greeting>
                        <app-home-banner v-else
                                         :image="bannerImg"></app-home-banner>
                    </v-flex>
                    <!-- The find -->
                    <v-flex xs12
                            ref="findCard"
                            v-scroll="onScroll">
                        <app-home-find class="_homepage-header--find"></app-home-find>
                    </v-flex>
                </v-layout>
            </app-layout-greeting>
          </transition>
        </v-flex>
        <!-- The banner-xs-only and public-->
        <v-flex v-if="!$auth.check()"
                class="xs12 hidden-sm-and-up">
            <v-img :src="bannerImg" style="margin-bottom: -5px"></v-img>
        </v-flex>
        <!-- The benefits -->
        <v-flex v-if="!$auth.check()" xs12>
            <app-home-benefits></app-home-benefits>
        </v-flex>
        <!-- The Carousel profile NannyGrannies or Jobs -->
        <v-flex xs12>
            <app-home-carousel-profile></app-home-carousel-profile>
        </v-flex>
        <!-- Recently viewed -->
        <v-flex v-if="$auth.check()" xs12>
            <app-home-recently-viewed></app-home-recently-viewed>
        </v-flex>
        <!-- Carousel Parent testimonials -->
        <v-flex v-if="!$auth.check()" xs12>
            <app-home-testimonials></app-home-testimonials>
        </v-flex>
        <!--The Clubhouse-->
        <v-flex xs12>
            <app-home-clubhouse></app-home-clubhouse>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppHomeCarouselProfile from './components/app-home-carousel-profile'
  import AppHomeClubhouse from './components/app-home-clubhouse'
  import AppHomeTestimonials from './components/app-home-testimonials'
  import AppHomeBenefits from './components/app-home-benefits'
  import AppHomeBanner from './components/app-home-banner'
  import AppHomeFind from './components/app-home-find'
  import AppHomeGreeting from './components/app-home-greeting'
  import AppHomeRecentlyViewed from './components/app-home-recently-viewed'
  import AppLayoutGreeting from '../../../components/app-layout-greeting'

  export default {
    components: {
      AppLayoutGreeting,
      AppHomeRecentlyViewed,
      AppHomeGreeting,
      AppHomeFind,
      AppHomeBanner,
      AppHomeBenefits,
      AppHomeTestimonials,
      AppHomeClubhouse,
      AppHomeCarouselProfile
    },

    data () {
      return {
        postCode: null
      }
    },

    computed: {
      classHeader () {
        return {
          '_homepage-header--public': !this.$auth.check(),
          '_homepage-header--parent': this.$auth.check(['parent']),
          '_homepage-header--nanny': this.$auth.check(['nanny'])
        }
      },
      bannerImg () {
        const banner = this.$store.getters['page/content']('homepage')
          .filter(item => item.slug === 'banner')
        if (banner.length > 0) {
          return this.$helpers.getImageUrl(banner[0].image.path)
        }
      }
    },

    beforeDestroy () {
      this.$store.commit('toolbar/STICKY_SEARCH', false)
    },

    methods: {
      onScroll (e) {
        if (this.$vuetify.breakpoint.mdAndUp && !this.$auth.check()) {
          const coords = this.$refs['findCard'].getBoundingClientRect()
          this.$store.commit('toolbar/STICKY_SEARCH', (coords.y < -140))
        }
      }
    }
  }
</script>

<style lang="stylus">
    ._homepage-header
        position relative

        &._homepage-header
            &--public
                background-color var(--green)
                color var(--white) !important
                @media (min-width 600px)
                    background-color transparent
                    color currentColor !important
                    margin-bottom 150px

                ._find-card--title__text
                    margin-top 35px

                .app-btn-toggle
                    .v-btn--disabled .v-btn__content,
                    .v-btn--active .v-btn__content,
                    .v-btn .v-btn__content
                        color #fff
                        @media (min-width 600px)
                            color currentColor

            &--parent
                background-color var(--pink)

            &--nanny
                background-color var(--blue_light)

        &:not(._homepage-header--public)
            ._find-layout
                &--container
                    margin-bottom 60px
                    @media (min-width 600px)
                        margin-bottom 160px
</style>
