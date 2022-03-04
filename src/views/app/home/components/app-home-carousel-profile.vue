<template>
    <v-layout v-if="items && items.length > 0"
              class="_carousel-profile justify-center column">
        <v-flex>
            <h2 class="text-xs-center _carousel-profile--title px-3">{{title}}</h2>
        </v-flex>
        <v-flex>
            <app-window-base :items="items"
                             :nudge-nav-top="$vuetify.breakpoint.smAndDown ? '30px' : '70px'">
                <template slot="item" slot-scope="{item, ind}">
                    <div :class="{'container': namespaced === 'jobs'}">
                        <component :is="currentComponent"
                                   :key="`currentComponent${item.id}`"
                                   :item="item" :ind="ind"></component>
                    </div>
                </template>
            </app-window-base>
        </v-flex>
        <!--BACKGROUND ELEMENTS-->
        <template v-if="namespaced === 'user/nanny'">
            <!-- <div class="_carousel-profile--pattern" v-scrollanim="{ bEnt: 'no', enter: 'moveup-slow' }"> -->
            <div class="_carousel-profile--pattern">
                <app-svg-icon preserveAspectRatio="xMinYMin"
                              name="themes/profile/NG_BG-03"
                              color="var(--green) url(#svgicon_themes_profile_NG_BG-03_a)"></app-svg-icon>
            </div>
            <!-- <div class="_carousel-profile--pattern pattern--right" v-scrollanim="{ bEnt: 'no', enter: $vuetify.breakpoint.smAndDown ? 'moveup-slow-smAndDown' : 'moveup-slow' }"> -->
            <div class="_carousel-profile--pattern pattern--right">
                <app-svg-icon preserveAspectRatio="xMinYMin"
                              name="themes/profile/NG_BG-03"
                              color="var(--green) url(#svgicon_themes_profile_NG_BG-03_a)"></app-svg-icon>
            </div>
        </template>
    </v-layout>
</template>

<script>
  import AppCardProfileNanny from '../../../../components/app-card/app-card-profile-nanny'
  import AppCardJob from '../../../../components/app-card/listing/app-card-job'
  import AppWindowBase from '../../../../components/app-windows/app-window-base'

  export default {
    name: 'app-home-carousel-profile',

    components: {AppWindowBase, AppCardJob, AppCardProfileNanny},

    data () {
      return {
        namespaced: null,
        currentComponent: null
      }
    },

    computed: {
      items () {
        return this.$store.getters[this.namespaced + '/collection']
      },
      title () {
        const _text = {
          public: 'Meet some NannyGrannies',
          nanny: `${this.items.length} jobs have recently been added that match your criteria`,
          parent: `${this.items.length} new NannyGrannies joined that match your criteria`
        }
        return _text[this.$auth.check() ? this.$auth.user().role : 'public']
      }
    },

    mounted () {
      this.namespaced = this.$auth.check(['nanny']) ? 'jobs' : 'user/nanny'
      this.currentComponent = this.$auth.check(['nanny']) ? 'AppCardJob' : 'AppCardProfileNanny'
      if (this.$auth.check()) {
        this.$store.dispatch(this.namespaced + '/GET_BY_ALERTS', {
          per_page: 9,
          postcode_id: this.$auth.user().postcode.id
        })
      } else {
        this.$store.dispatch('user/nanny/GET_FOR_HOMEPAGE')
      }
    },

    beforeDestroy () {
      // this.$store.commit(this.namespaced + '/ERROR') // <- clear the result
    }
  }
</script>

<style lang="stylus" scoped>
    ._carousel-profile
        position relative

        &--title
            margin 50px 0 35px
            @media (min-width 600px)
                margin 160px 0 35px

        &--pattern
            position absolute
            left -50px
            width 100px
            height 110px
            bottom 20px
            overflow hidden
            z-index 5
            .svg-icon
                width 100px
                height 110px
                overflow visible
            @media (min-width 600px)
                width 112px
                height 108px
                .svg-icon
                    width 140px
                    height 140px
            @media (min-width 960px)
                left -110px
                width 160px
                height 613px
                bottom 40px
                .svg-icon
                    width 160px
                    height 613px
            @media (min-width 1200px)
                left 0

            &.pattern--right
                left auto
                bottom auto
                top 165px
                height 240px
                right 0
                @media (min-width 600px)
                    width 150px
                    top 280px
                    height 337px
                @media (min-width 960px)
                    height 613px
                    top: auto
                    bottom 40px
                @media (min-width 1200px)
                    width 250px
            &.moveup-slow
              bottom 80px
              transition bottom 2s linear
            &.moveup-slow-smAndDown
              top 140px
              transition top 2s linear
</style>
