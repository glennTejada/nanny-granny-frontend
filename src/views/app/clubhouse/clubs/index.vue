<template>
    <v-layout v-if="category"
              _clubhouse-clubs
              column>
        <v-flex>
            <clubhouse-club-header>
                <template slot="text">
                    <h1>{{category.name | capitalize}}</h1>
                    <p class="text--charcoal">{{category.count_members}} members</p>
                </template>
            </clubhouse-club-header>
        </v-flex>
        <v-flex class="_clubhouse-clubs--list_container">
            <v-container w--max--750 grid-list-xl>
                <v-layout column>
                    <v-scroll-x-transition mode="out-in">
                        <v-flex :key="`page_${pagination.current_page}`">
                            <v-layout column>
                                <v-flex v-for="club in clubs"
                                        :key="`club_${club.id}`">
                                    <app-club-list-item :item="club"></app-club-list-item>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-scroll-x-transition>
                    <v-flex>
                        <app-btn-club-create>
                            <span class="text--charcoal">Can't find a {{category.name}} to join?</span>
                        </app-btn-club-create>
                    </v-flex>
                    <v-flex v-if="pagination.last_page > 1" xs12 text-xs-center mt-5>
                        <v-pagination v-model="currentPage"
                                      class="app-pagination"
                                      :length="pagination.last_page"
                                      :total-visible="5"></v-pagination>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <v-flex>
            <clubhouse-club-meet-up :category-id="category.id"></clubhouse-club-meet-up>
        </v-flex>
        <!--Navigation-->
        <v-flex mt-4>
            <clubhouse-navigation hide-pattern
                                  :router-prev="{to: '/clubhouse/forum'}"
                                  latest-article>
                <template slot="router-prev-name">
                    Explore the forum
                </template>
            </clubhouse-navigation>
        </v-flex>
    </v-layout>
</template>

<script>
  import ClubhouseClubHeader from './clubhouse-club-header'
  import ClubhouseClubMeetUp from './meet-up/clubhouse-club-meet-up'
  import AppClubListItem from '../share/clubhouse-club-list-item'
  import ClubhouseNavigation from '../share/clubhouse-navigation'
  import AppBtnClubCreate from '../../../../components/app-buttons/app-btn-club-create'

  export default {
    name: 'clubhouse-clubs',

    components: {AppBtnClubCreate, ClubhouseNavigation, AppClubListItem, ClubhouseClubMeetUp, ClubhouseClubHeader},

    props: ['categoryId'],

    data () {
      return {
        category: null,
        currentPage: 1
      }
    },

    computed: {
      clubs () {
        return this.$store.getters['clubhouse/clubs/collection']
      },
      pagination () {
        return this.$store.getters['clubhouse/clubs/pagination']
      }
    },

    watch: {
      currentPage (val) {
        this.$store.dispatch('clubhouse/clubs/FETCH', {categoryId: this.categoryId, params: {per_page: 10, page: val}})
      }
    },

    mounted () {
      this.setCategory()
      this.$store.commit('clubhouse/clubs/RESET')
      this.$store.dispatch('clubhouse/clubs/FETCH', {categoryId: this.categoryId, params: {per_page: 10}})
    },
    beforeDestroy () {
      this.$store.commit('clubhouse/clubs/RESET')
    },
    methods: {
      async setCategory () {
        let _cat = this.$store.getters['clubhouse/clubs/category'](this.categoryId)
        if (!_cat) {
          await this.$store.dispatch('clubhouse/clubs/CATEGORIES')
          _cat = this.$store.getters['clubhouse/clubs/category'](this.categoryId)
        }
        this.category = _cat
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._clubhouse-clubs
        &--list_container
            padding 150px 0 50px
</style>
