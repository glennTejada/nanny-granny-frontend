<template>
    <div class="page-overlay">
        <v-btn icon
               flat
               :style="{backgroundColor: item.theme_body.bgColor}"
               class="_btn-close"
               :ripple="false"
               @click="$store.commit('dialog/DIALOG_SHOW', {show: false})">
            <app-svg-icon name="ui/NG_CLOSE"
                          width="25"
                          height="25"
                          :color="(item.theme_body.bgColor === '#039e8b' || item.theme_body.bgColor === '#4d4dff') ? 'var(--white)' : 'var(--blue)'"></app-svg-icon>
        </v-btn>
        <!--CONTENT-->
        <v-layout row wrap v-if="item">
            <!--header-->
            <v-flex xs12 class="_header" :style="{backgroundColor: item.theme_body.bgColor}">
              <transition name="fadein-transition" appear>
                <v-container fill-height grid-list-xl w--max--800>
                    <v-layout row wrap>
                        <v-flex xs12 :class="{'text--white': (item.theme_body.bgColor === '#039e8b' || item.theme_body.bgColor === '#4d4dff')}">
                            <slot name="header"></slot>
                        </v-flex>
                    </v-layout>
                </v-container>
              </transition>
              <transition name="fadeinup-delay-transition" appear>
                <app-svg-icon v-if="!isJob"
                              class="_pattern _pattern--profile"
                              preserveAspectRatio="xMinYMin meet"
                              :name="`themes/profile/NG_BG-0${item.theme_body.pattern}`"
                              :color="`${item.theme_body.borderColor} url(#svgicon_themes_profile_NG_BG-0${item.theme_body.pattern}_a)`"
                              :original="true"></app-svg-icon>
                <app-svg-icon v-else class="_pattern"
                              preserveAspectRatio="xMinYMin slice"
                              :name="`themes/job/NG_BG-0${item.theme_body.pattern}`"
                              :original="true"></app-svg-icon>
              </transition>
            </v-flex>
            <!--Body-->
            <v-flex xs12 class="_content-container">
                <v-layout row wrap>
                    <v-flex xs12 d-flex justify-center>
                        <v-expansion-panel flat class="app-expansion-panel large" :value="panel" expand>
                            <v-container w--max--800 py-0>
                                <!--About-->
                                <v-expansion-panel-content>
                                    <div slot="header" class="font--medium _panel-header">
                                        {{isJob ? 'About the job' : 'About me'}}
                                    </div>
                                    <div class="_mb">
                                        <slot name="about"></slot>
                                    </div>
                                </v-expansion-panel-content>
                                <!--Availability&rates-->
                                <v-expansion-panel-content>
                                    <div slot="header" class="font--medium _panel-header">Availability &amp; rates</div>
                                    <app-table-availability-rates
                                            readonly
                                            class="_mb"
                                            :value="item.availability_list"></app-table-availability-rates>
                                </v-expansion-panel-content>
                                <!--Ages-->
                                <v-expansion-panel-content>
                                    <div slot="header" class="font--medium _panel-header">
                                        {{isJob ? 'Children' : 'I provide care for ages'}}
                                    </div>
                                    <app-btn-toggle-qualifications :value="item.child_age_list"
                                                                   icon-dir="brand"
                                                                   readonly
                                                                   :items="childAge"></app-btn-toggle-qualifications>
                                    <!--                               
                                    <div class="_mb _count-children">
                                        Number of children at a time <span class="font--medium px-2">{{item.child_count}}</span>
                                    </div>
                                    -->
                                </v-expansion-panel-content>
                                <!--Qualifications-->
                                <v-expansion-panel-content>
                                    <div slot="header" class="font--medium _panel-header">
                                        {{isJob ? 'Qualification' : 'My qualification'}}s
                                    </div>
                                    <p class="mb-4">Personal qualifications</p>
                                    <app-btn-toggle-qualifications :value="item.personal_questions_list"
                                                                   icon-dir="brand"
                                                                   readonly
                                                                   :items="qualifications"></app-btn-toggle-qualifications>
                                    <p class="mt-5 mb-4">Work preferences</p>
                                    <app-btn-toggle-qualifications :value="item.work_preferences_list"
                                                                   icon-dir="brand"
                                                                   readonly
                                                                   class="_mb"
                                                                   :items="preferences"></app-btn-toggle-qualifications>
                                </v-expansion-panel-content>
                            </v-container>
                        </v-expansion-panel>
                    </v-flex>
                    <!--Reviews-->
                    <v-flex v-if="!isJob" xs12 d-flex justify-center>
                        <v-expansion-panel flat class="app-expansion-panel large app-bg-text-book" v-model="panel2">
                            <v-container w--max--800 py-0>
                                <v-expansion-panel-content class="">
                                    <div slot="header" class="font--medium _panel-header">Reviews</div>
                                    <v-layout column>
                                        <v-flex>
                                            <app-container-review v-if="reviews.length > 0" class="w--max--800">
                                                <app-window-base :items="reviews" key="test">
                                                    <template slot="item"
                                                              slot-scope="{item}">
                                                        <v-layout>
                                                            <app-card-review :item="item"
                                                                             rating
                                                                             :key="`card-review-${item.id}`">
                                                            </app-card-review>
                                                        </v-layout>
                                                    </template>
                                                </app-window-base>
                                            </app-container-review>
                                        </v-flex>
                                        <v-flex text-xs-center v-if="canReview" class="expansion-panel-reviews--actions">
                                            <v-btn color="primary"
                                                   :disabled="!$auth.check()"
                                                   @click="addReview"
                                                   outline
                                                   class="v-btn--default">Write a review</v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-expansion-panel-content>
                            </v-container>
                        </v-expansion-panel>
                    </v-flex>
                    <v-flex xs12>
                        <v-dialog v-model="dialogReview"
                                  :fullscreen="$vuetify.breakpoint.smAndDown"
                                  max-width="685">
                            <app-dialog-review-store v-if="review"
                                                     :raw-data="{review: review}"
                                                     @submitSuccess="dialogReview=false"></app-dialog-review-store>
                        </v-dialog>
                    </v-flex>
                </v-layout>
            </v-flex>
            <!--Footer-->
            <v-flex v-if="!hideBottomPanel"
                    class="_footer xs12">
                <v-layout column>
                    <v-flex class="_footer--tools border--top border--grey_2">
                        <div class="_footer--tools__box ma-auto w--max--750">
                            <span class="primary--text _rate pl-0">Hourly rate ${{item.price_min}} {{item.price_min !== item.price_max ? ' - ' + item.price_max : ''}}</span>
                            <v-spacer></v-spacer>
                            <app-btn-chat-room :user-ids="[item.user_id || item.id]"
                                               class="d-link d-inline ma-0"
                                               flat>
                                <div>
                                    <app-svg-icon name="brand/NG_CONTACT"></app-svg-icon>
                                    <span class="hidden-xs-only pl-1">{{isJob ? 'Apply' : 'Contact'}}</span>
                                </div>
                            </app-btn-chat-room>
                            <a @click.stop.prevent="shortlist">
                                <app-svg-icon :name="`brand/NG_FAVOURITES${item.is_favorite ? '_FILL' : ''}`"></app-svg-icon>
                                <span class="hidden-xs-only">Shortlist</span>
                            </a>
                            <a @click.stop.prevent="dialogRecommend = true">
                                <app-svg-icon name="brand/NG_INBOX"></app-svg-icon>
                                <span class="hidden-xs-only">Recommend</span>
                            </a>
                        </div>
                    </v-flex>
                    <v-flex></v-flex>
                </v-layout>
            </v-flex>
            <v-flex v-if="!hideBottomPanel"
                    xs12>
                <v-dialog v-model="dialogRecommend"
                          max-width="950"
                          :fullscreen="$vuetify.breakpoint.xsOnly">
                    <app-dialog-recommend :rawData="recommendData"></app-dialog-recommend>
                </v-dialog>
            </v-flex>
            <!--SLOT-->
            <slot></slot>
        </v-layout>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Nanny from '@/models/user/NannyClass'
  import Job from '@/models/JobClass'
  import '@/components/app-icons/themes'
  import AppBtnToggleQualifications from '@/components/app-buttons/app-btn-toggle-qualifications'
  import AppTableAvailabilityRates from '@/components/app-table/app-table-availability-rates'
  import AppDialogRecommend from '@/components/app-dialog/app-dialog-recommend'
  import AppContainerReview from '@/components/app-container-review'
  import AppWindowBase from '@/components/app-windows/app-window-base'
  import AppCardReview from '@/components/app-card/app-card-review'
  import AppDialogReviewStore from '@/components/app-dialog/app-dialog-review-store'
  import Review from '@/models/ReviewClass'
  import AppBtnChatRoom from '../../app-buttons/app-btn-chat-room'

  export default {
    name: 'app-layout-profile',
    components: {AppBtnChatRoom, AppDialogReviewStore, AppCardReview, AppWindowBase, AppContainerReview, AppDialogRecommend, AppTableAvailabilityRates, AppBtnToggleQualifications},
    props: {
      item: [Nanny, Job],
      hideBottomPanel: Boolean
    },

    data () {
      return {
        panel2: [true],
        dialogReview: false,
        dialogRecommend: false,
        review: undefined,
        headerStyle: {
          backgroundColor: this.item.theme_body.bgColor,
          backgroundImage: this.item.theme_body.bgColor
        }
      }
    },

    computed: {
      ...mapGetters('catalogs', [
        'workTypes',
        'childAge',
        'qualifications',
        'preferences',
        'residenceStatuses'
      ]),
      reviews () {
        return this.$store.getters['reviews/collection']
      },
      canReview () {
        const rw = this.$store.getters['reviews/collection'].find(d => d.user.id === this.$auth.user().id)
        return !rw
      },
      isJob () {
        return (this.item instanceof Job)
      },
      panel () {
        if (this.$vuetify.breakpoint.xsOnly) {
          return [true, false, false, false]
        }
        return [true, true, true, true]
      },
      recommendData () {
        return {
          id: this.item.id,
          namespaced: this.isJob ? 'jobs' : 'nannies'
        }
      }
    },

    mounted () {
      this.recentlyView()
      if (!this.isJob) { // <- Nanny
        this.$store.dispatch('reviews/FETCH_FOR_USER', this.item.id)
      }
      // Safari
      setTimeout(() => {
        document.getElementsByClassName('_pattern')[0].style.minWidth = '100%'
      }, 300)
    },
    beforeDestroy () {
      if (!this.isJob) { // <- Nanny
        this.$store.commit('reviews/RESET')
      }
    },

    methods: {
      addReview () {
        this.review = new Review({user: this.item})
        this.dialogReview = true
      },
      recentlyView () {
        let _name = `${this.isJob ? 'nanny' : 'parent'}_${this.$auth.user().id}`
        let _cookieOld = this.$cookie.get(_name)
        let _val = []
        if (_cookieOld !== null && _cookieOld !== '') {
          _val = _cookieOld.toString().split(',')
        }
        if (_val.indexOf(`${this.item.id}`) === -1) {
          _val.unshift(this.item.id)
          this.$store.commit('recentlyView/PUSH_ITEM', this.item)
        }
        // Max count items: 15
        if (_val.length > 15) {
          _val = _val.slice(15)
        }
        this.$cookie.set(_name, _val)
      },
      shortlist () {
        if (this.$auth.check()) {
          let _action = !this.item.is_favorite ? 'ADD' : 'DELETE'
          let _type = this.isJob ? 'JOB' : 'NANNY'
          this.item.is_favorite = !this.item.is_favorite
          this.$store.dispatch(`favourites/FAVOURITES_${_action}`, {type: _type, id: this.item.id})
            .catch(() => (this.item.is_favorite = !this.item.is_favorite))
        }
      },
      recommend () {
        this.$store.commit('dialog/DIALOG_SHOW', {
          show: true,
          component: 'app-dialog-recommend',
          data: {
            id: this.item.id,
            namespaced: (this.type === 'job') ? 'jobs' : 'nannies'
          },
          options: {
            maxWidth: 450
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .page-overlay
        position fixed
        top 0
        right 0
        bottom 0
        left 0
        background #fff
        z-index 900
        border 1px solid var(--grey_2)
        overflow auto

        ._btn-close
            position absolute
            top 0
            right 0
            margin 0
            z-index 20

            &:hover:before
                content none

            .svg-icon
                padding 4px

        ._header
            height 270px
            overflow hidden
            position relative
            z-index 5

            ._pattern
                position absolute
                display block
                left 0
                top 0
                right 0
                width 100%
                height 100%
                z-index 10

                &--profile
                    bottom -50px
                    top auto
                    height 110px

        ._content-container
            padding: 20px 0 100px

            ._panel-header
                font-size 1.143rem

            ._mb
                margin-bottom 40px

        .app-expansion-panel
            position relative

            &:before
                content ''
                position absolute
                top 0
                left 0
                width 100%
                background #fff
                height 70px

        ._count-children
            border 1px solid var(--grey_3)
            border-top none
            padding 26px
            max-width 750px
        .expansion-panel-reviews
            &--actions
                margin-top 100px
                margin-bottom 100px

        ._footer
            position fixed
            bottom 0
            left 0
            width 100%
            background #fff
            z-index 100

            &--tools
                padding 28px 12px

                &__box
                    display flex
                    align-items center

                ._rate, .d-link, button
                    min-width: auto
                ._rate, .d-link, a
                    padding 0 12px
                    text-decoration none
                    font-size 1em
                    svg
                        height: 18px
                        width: 18px
                        margin-right 2px
                        margin-top: -4px

    @media (min-width: 600px)
        .page-overlay
            ._btn-close
                top 10px
                right -4px
                .svg-icon
                    padding 0
            .app-expansion-panel
                &:before
                    height 119px
            ._header
                height 400px
                padding-top 30px
                ._pattern
                    &--profile
                        bottom -80px
                        top auto
                        height 170px
            ._content-container
                ._panel-header
                    font-size 1.714rem
                ._mb
                    margin-bottom 65px
            ._footer
                &--tools
                    ._rate,
                    a
                        font-size 1.286rem
                        .svg-icon
                            width 24px
                            height 24px

    @media (min-width: 768px)
        .page-overlay
            ._content-container
                padding 130px 0
            ._footer
                &--tools
                    ._rate, .d-link, a
                        padding 0 24px
                        font-size 1.286rem

                        .svg-icon
                            width 24px
                            height 24px
</style>
