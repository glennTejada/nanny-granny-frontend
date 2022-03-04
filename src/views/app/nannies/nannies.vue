<template>
    <v-layout v-if="postcode"
              column
              _nannies-listing>
        <v-flex _nannies-listing--header>
            <v-container fill-height grid-list-xl>
                <v-layout row wrap>
                    <!--Title-->
                    <v-flex class="_title">
                        <app-svg-icon name="brand/NG_AGES_0-1"
                                      height="60"
                                      width="70"
                                      class="hidden-xs-only"
                                      color="var(--green)"></app-svg-icon>
                        <h1 class="d-flex _title-name d-inline-block">Find a NannyGranny</h1>
                    </v-flex>
                    <!--Filters-->
                    <v-flex class="_filters-box"> 
                        <app-filters-listing v-model="requestData"
                                             :postcode="postcode"
                                             :loading="loading"
                                             @apply="find"></app-filters-listing>
                    </v-flex>
                </v-layout>
            </v-container>
            <!--BACKGROUND ELEMENTS-->
            <div class="_nannies-listing--header--bg-elements">
              <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
                <app-svg-icon name="patterns/NG_Pattern-12"
                              class="_pattern-12"
                              color="none var(--yellow)"></app-svg-icon>
              </div>
              <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
                <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                              name="brand/NG_HOMEWORK_SUPPORT"
                              color="var(--orange)"
                              class="_homework-icon"></app-svg-icon>
              </div>
              <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
                <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                              name="brand/NG_CRAFTY"
                              color="var(--yellow)"
                              class="_crafty-icon"></app-svg-icon>
              </div>
              <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
                <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                              name="brand/NG_CREATIVE_PLAY"
                              color="var(--orange)"
                              class="_creative-icon"></app-svg-icon>
              </div>
              <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
                <app-svg-icon name="patterns/NG_Pattern-03"
                              class="_pattern-03"
                              color="none var(--green)"></app-svg-icon>
              </div>
            </div>
        </v-flex>
        <!--Results-->
        <v-flex class="app-bg-sand">
            <v-container fill-height grid-list-lg>
                <app-layout-listing :dataResult="dataResult"
                                    @change-sort-by="sortBy"
                                    @view-grid="viewBy"
                                    @change-current-page="changePage"
                                    type="nanny"
                                    :pagination="pagination">
                    <template v-for="(nanny, index) in collection">
                    <app-card-nanny :key="'n' + nanny.id"
                                    :item="nanny"
                                    @auth-dialog="$store.commit('dialog/DIALOG_SHOW', {show: true, component: 'app-dialog-subscription', options: {maxWidth: 950}})"
                                    :grid="grid"></app-card-nanny>
                    <v-container fill-height grid-list-lg :key="index" v-if="index == 2 && !$auth.check()">
                      <app-card-subscription :key="index" v-if="index == 2 && !$auth.check()"></app-card-subscription>
                    </v-container>
                    </template>
                </app-layout-listing>
            </v-container>
<!--
            <v-container fill-height grid-list-lg v-if="!$auth.check()">
              <app-card-subscription></app-card-subscription>
            </v-container>
-->
        </v-flex>
        <v-flex>
            <app-card-post-job-hurry></app-card-post-job-hurry>
        </v-flex>
        <!--ClubHouse-->
        <v-flex class="py-5">
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex tag="h2" class="xs12 text-xs-center my-5">The ClubHouse</v-flex>
                    <v-flex v-for="(item, i) in latestArticle"
                            :class="{'hidden-sm-and-down': (i === 2)}"
                            :key="'art_'+item.id"
                            xs12 sm6 md4>
                        <app-card-article :item="item"
                                          :hide-actions="!$auth.check()"></app-card-article>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>

    </v-layout>
</template>

<script>
  import Vue from 'vue'
  import Store from '@/store/index'
  import { mapGetters } from 'vuex'
  import AppCardSubscription from '../../../components/app-card/app-card-subscription'
  import AppFiltersListing from '../../../components/app-listing/app-filters-listing'
  import AppLayoutListing from '../../../components/app-listing/app-layout-listing'
  import AppCardNanny from '../../../components/app-card/listing/app-card-nanny'
  import AppCardPostJobHurry from '../../../components/app-card/app-card-post-job-hurry'
  import AppCardArticle from '../../../components/app-card/app-card-article'

  export default {
    name: 'nannies',
    components: {AppCardArticle, AppCardSubscription, AppCardPostJobHurry, AppCardNanny, AppLayoutListing, AppFiltersListing},

    data () {
      return {
        isRedirect: this.$route.query.redirect,
        grid: false,
        requestData: {
          postcode_id: null,
          sortBy: 'distance',
          per_page: 6,
          page: 1
        }
      }
    },

    computed: {
      ...mapGetters('nannies', [
        'loading',
        'pagination',
        'collection',
        'postcode'
      ]),
      latestArticle () {
        return this.$store.getters['articles/collection']
      },
      dataResult () {
        if (this.postcode) {
          this.$store.commit('nannies/POSTCODE', this.postcode)
        } else {
          this.postcode = this.$store.getters('nannies/POSTCODE')
        }
        return {postcode: this.postcode ? this.postcode.postcode : null}
      }
    },

    mounted () {
      if (this.$auth.check() && !this.postcode) {
        this.$store.commit('nannies/POSTCODE', this.$auth.user().postcode)
        this.requestData.postcode_id = this.postcode.id
      }
      this.requestData.postcode_id = (this.postcode || {}).id

      if (!this.isRedirect || (this.isRedirect && this.$lodash.isEmpty(this.collection))) {
        this.$store.dispatch('nannies/NANNIES_FIND', this.requestData)
      }
    },

    created () {
      this.$store.dispatch('articles/ARTICLES_GET', {per_page: 3})
    },

    methods: {
      find (postcode) {
      //  console.log(this.requestData)
        if ((this.requestData.pay_hour || 0) <= 14) {
          delete this.requestData.pay_hour
        }
        this.$store.dispatch('nannies/NANNIES_FIND', this.requestData)
          .then(() => {
            if (postcode) {
              this.$store.commit('nannies/POSTCODE', postcode)
            }
          })
      },
      viewBy (val) {
        this.grid = val
      },
      sortBy (val) {
        this.requestData.sortBy = val
        this.find()
      },
      changePage (page) {
        this.requestData.page = page
        this.$vuetify.goTo('._box-listing-tools', {offset: -150})
        this.find()
      }
    },

    beforeRouteEnter (to, from, next) {
      if (Vue.auth.check() || (to.query.redirect === 'find')) {
        next()
      } else {
        Store.commit('toolbar/EXTENSION', {show: true, type: 'parent'})
      }
    },

    beforeDestroy () {
      // this.$store.commit('nannies/ERROR') // <- clear the result
    }
  }
</script>

<style lang="stylus" scoped>
    ._nannies-listing--header
        position relative
        z-index 1
        @media (max-width 959px)
            overflow hidden
        &--bg-elements
            .svg-icon
                position absolute
                &._pattern-12
                    left -50px
                    // top -70px
                    top -475px
                    width 120px
                    height 160px
                    transform rotate(130deg)
                    @media (min-width 600px)
                        top -528px
                        width 160px
                        height 200px
                    @media (min-width 960px)
                        left 112px
                        // top -92px
                        top -550px
                        width 200px
                        height 240px
                        transform rotate(-40deg)
                &._homework-icon
                    // top 30px
                    top -420px
                    right 42%
                    width 50px
                    height 56px
                    transform rotate(20deg)
                &._crafty-icon
                    // top 140px
                    top -340px
                    right 17%
                    width 93px
                    height 78px

                &._creative-icon
                    left 5px
                    // top 190px
                    top -270px
                    width 94px
                    height 94px

                &._pattern-03
                    // top 90px
                    top -316px
                    right -20px
                    width 75px
                    height 60px
                    transform rotate(117deg)
                    z-index 1
                    @media (min-width 600px)
                        // top 240px
                        top -227px
                        right -50px
                        width 120px
                        height 105px
                    @media (min-width 960px)
                        // top 84px
                        top -384px
                        right -20px

    ._filters-box
        position relative
        z-index 10

    ._title
        margin-top 34px
        margin-bottom 34px
        text-align center

    @media (min-width: 600px)
        ._title
            margin-top 130px
            margin-bottom 90px

            .svg-icon
                transform translateY(-8px)

        ._filters-box
            margin-bottom 70px
</style>

