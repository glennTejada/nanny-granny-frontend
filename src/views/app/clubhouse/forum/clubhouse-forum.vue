<template>
    <v-layout column>
        <!--Header-->
        <v-flex>
            <clubhouse-forum-header background-class="app-bg-text-book"
                                    :src="$helpers.getImageUrl((banner.image || {}).path)">
                <template slot="text">
                    <h1 class="mb-5">{{banner.name}}</h1>
                    <p>{{banner.description | text}}</p>
                </template>
                <template slot="pattern">
                    <div :style="{height: $vuetify.breakpoint.mdAndUp ? '292px':'auto', overflow: 'hidden'}">
                        <app-svg-icon :name="`themes/profile/NG_BG-07`"
                                      :width="$vuetify.breakpoint.mdAndUp ? '104':'84'"
                                      preserveAspectRatio="xMinYMin meet"
                                      :color="`var(--yellow) url(#svgicon_themes_profile_NG_BG-07_a)`"></app-svg-icon>
                    </div>
                </template>
            </clubhouse-forum-header>
        </v-flex>
        <!--Favourites-->
        <v-flex class="my-5 py-5">
            <app-tabs-clubhouse-dashboard hide-latest-posts
                                          hide-my-posts></app-tabs-clubhouse-dashboard>
        </v-flex>
        <!--Clubs-->
        <v-flex class="py-5" v-scrollanim="{ bEnt: 'app-bg-white', enter: 'bg-animate app-bg-light_blue', offsetBottom: 550 }">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <h2 class="text-xs-center my-5">Join our clubs</h2>
                    </v-flex>
                    <v-flex>
                        <clubhouse-forum-club-categories></clubhouse-forum-club-categories>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <!--How it works-->
        <v-flex xs12 class="d-flex justify-center py-5 p-relative overflow-hidden">
            <v-container grid-list-xl w--max--800>
                <v-layout row wrap>
                    <v-flex xs12>
                        <h2 class="text-xs-center text-sm-left mt-5">How it works</h2>
                    </v-flex>
                    <v-flex v-for="(item, i) in howItWorksItems"
                            :key="'why'+item.id"
                            class="_why-list my-3 xs12">
                        <v-layout row wrap text-xs-center text-sm-left :class="{reverse: (i%2 > 0)}">
                            <v-flex xs12 sm3 :class="{'text-sm-right': (i%2 > 0)}">
                                <app-svg-icon :name="`brand/${item.svg_name}`"
                                              :color="`var(--${item.svg_color})`"
                                              width="98"
                                              height="100%"></app-svg-icon>
                            </v-flex>
                            <v-flex xs12 sm9 d-flex align-center>
                                <v-layout column>
                                    <v-flex class="xs12">
                                        <!--<h3 class="mb-2">{{item.name}}</h3>-->
                                        <div class="app-text-regular small">{{item.description | text}}</div>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12 text-xs-center>
                        <p class="text--charcoal my-5">
                            Need more help? Try our
                            <router-link to="/faqs" class="text-small">FAQs</router-link>
                        </p>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <!--Navigation-->
        <v-flex>
            <clubhouse-navigation hide-pattern
                                  latest-article></clubhouse-navigation>
        </v-flex>
    </v-layout>
</template>

<script>
  import ClubhouseForumHeader from '../share/clubhouse-forum-header'
  import ClubhouseNavigation from '../share/clubhouse-navigation'
  import ClubhouseForumClubCategories from './clubhouse-forum-club-categories'
  import AppTabsClubhouseDashboard from '../../../../components/app-tabs/clubhouse/app-tabs-clubhouse-dashboard'

  export default {
    name: 'clubhouse-forum',
    components: {AppTabsClubhouseDashboard, ClubhouseForumClubCategories, ClubhouseNavigation, ClubhouseForumHeader},
    computed: {
      content () {
        return this.$store.getters['page/content']('forum')
      },
      banner () {
        return this.content.filter(item => item.slug === 'banner')[0] || {}
      },
      howItWorksItems () {
        return this.content.filter(item => item.slug === 'how_it_works') || {}
      }
    }
  }
</script>

<style scoped>

</style>
