<template>
    <v-layout v-if="postcode" column _job-listing>
        <v-flex class="_job-listing--header">
            <v-container fill-height grid-list-xl>
                <v-layout column>
                    <v-flex class="_title">
                        <app-svg-icon name="brand/NG_JOIN_NETWORK"
                                      height="60"
                                      width="80"
                                      class="hidden-xs-only"
                                      color="var(--orange)"></app-svg-icon>
                        <h1 class="d-inline-block">Find a Job</h1>
                    </v-flex>
                    <v-flex class="_filters-box">
                        <app-filters-listing v-model="requestData"
                                             :postcode="postcode"
                                             :loading="loading"
                                             job
                                             @apply="find"></app-filters-listing>
                    </v-flex>
                </v-layout>
            </v-container>
            <!--BACKGROUND ELEMENTS-->
            <div class="_job-listing--header--bg-elements">
                <app-svg-icon name="patterns/NG_Pattern-15"
                              class="_pattern-15"
                              color="none var(--green)"></app-svg-icon>
                <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                              name="brand/NG_ENGAGED"
                              color="var(--blue)"
                              class="_engaged-icon"></app-svg-icon>
                <app-svg-icon name="brand/NG_FAVOURITES_FILL"
                              color="var(--yellow)"
                              class="_favourites-icon"></app-svg-icon>
                <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                              name="patterns/NG_Pattern-11"
                              class="_pattern-11"
                              color="none var(--yellow)"></app-svg-icon>
            </div>
        </v-flex>
        <v-flex class="app-bg-sand">
            <v-container fill-height grid-list-lg>
                <v-layout row wrap _box-job-listing>
                    <v-flex xs12 mb-5>
                        <app-layout-listing :dataResult="dataResult"
                                            @change-sort-by="sortBy"
                                            @view-grid="viewBy"
                                            @change-current-page="changePage"
                                            type="job"
                                            :pagination="pagination">
                            <app-card-job v-for="job in jobs"
                                          :key="'j' + job.id"
                                          @auth-dialog="$store.commit('dialog/DIALOG_SHOW', {show: true})"
                                          :item="job"
                                          :grid="grid">
                            </app-card-job>
                        </app-layout-listing>
                    </v-flex>
                </v-layout>
            </v-container>
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
  import AppCardJob from '../../../components/app-card/listing/app-card-job'
  import AppCardNanny from '../../../components/app-card/listing/app-card-nanny'
  import AppFiltersListing from '../../../components/app-listing/app-filters-listing'
  import AppLayoutListing from '../../../components/app-listing/app-layout-listing'
  import AppCardArticle from '../../../components/app-card/app-card-article'

  export default {
    name: 'jobs',

    components: {AppCardArticle, AppLayoutListing, AppFiltersListing, AppCardNanny, AppCardJob},

    data () {
      return {
        isRedirect: this.$route.query.redirect,
        grid: false,
        requestData: {
          postcode_id: null,
          sortBy: 'distance',
          per_page: 9,
          page: 1
        }
      }
    },

    computed: {
      latestArticle () {
        return this.$store.getters['articles/collection']
      },
      loading () {
        return this.$store.getters['jobs/loading']
      },
      jobs () {
        return this.$store.getters['jobs/collection']
      },
      pagination () {
        return this.$store.getters['jobs/pagination']
      },
      postcode () {
        return this.$store.getters['jobs/postcode']
      },
      dataResult () {
        return {postcode: this.postcode.postcode}
      }
    },

    created () {
      this.$store.dispatch('articles/ARTICLES_GET', {per_page: 3})
    },

    beforeRouteEnter (to, from, next) {
      if (Vue.auth.check() || (to.query.redirect === 'find')) {
        next()
      } else {
        Store.commit('toolbar/EXTENSION', {show: true, type: 'nanny'})
      }
    },

    mounted () {
      if (this.$auth.check() && !this.postcode) {
        this.$store.commit('jobs/POSTCODE', this.$auth.user().postcode)
        this.requestData.postcode_id = this.postcode.id
      }
      this.requestData.postcode_id = (this.postcode || {}).id

      if (!this.isRedirect || (this.isRedirect && this.$lodash.isEmpty(this.collection))) {
        this.$store.dispatch('jobs/JOBS_FIND', this.requestData)
      }
    },

    beforeDestroy () {
      // this.$store.commit('jobs/ERROR') // <- clear the result
    },

    methods: {
      find (postcode) {
        this.$store.dispatch('jobs/JOBS_FIND', this.requestData)
          .then(() => {
            if (postcode) {
              this.$store.commit('jobs/POSTCODE', postcode)
            }
            this.dataResult.distance = this.requestData.work_distance
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
    }
  }
</script>

<style lang="stylus" scoped>
    ._job-listing--header
        position relative
        overflow-x hidden

        &--bg-elements
            .svg-icon
                position absolute
                &._pattern-15
                    left: -50px
                    top: -70px
                    width: 120px
                    height: 160px
                    transform: rotate(130deg)
                    @media (min-width 600px)
                        width: 160px
                        height: 200px
                    @media (min-width 960px)
                        left: 63px
                        top: -92px
                        width: 200px
                        height: 240px
                        transform: rotate(-28deg)

                &._engaged-icon
                    top 70px
                    right 30%
                    width 116px
                    right calc(50% - 20%);
                    @media (max-width 1440px) {
                      right: calc(50% - 30%);
                    }
                    @media (max-width 1024px) {
                      right: calc(50% - 50%);
                    }

                &._favourites-icon
                    right 20px
                    top: 70px
                    transform: rotate(15deg)
                    width 36px
                    height 36px
                    @media (min-width 600px)
                        width 48px
                        height 58px
                        top: 180px
                        right 40px
                    @media (min-width 960px)
                        top: 230px
                        right auto
                        left 5px

                &._pattern-11
                    top 100px
                    right -50px
                    width 200px
                    height 200px
                    transform: rotate(30deg)

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
