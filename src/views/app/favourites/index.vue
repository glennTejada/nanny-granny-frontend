<template>
    <favourites-layout>
        <v-layout column>
            <v-flex>
                <app-name-page :name=title></app-name-page>
            </v-flex>
            <v-flex>
                <v-container fill-height>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-tabs v-model="activeTab"
                                    class="_tabs"
                                    fixed-tabs
                                    centered>
                                <v-tabs-slider color="primary"></v-tabs-slider>
                                <v-tab v-for="item in navItems"
                                       :href="'#' + item.component"
                                       :key="'t_' + item.name"
                                       :ripple="false"
                                       class="text-capitalize">
                                    {{item.name}} {{item.count ? ` (${item.count})`:''}}
                                </v-tab>
                                <v-tabs-items class="border--top border--grey_2">
                                    <v-tab-item v-for="item in navItems"
                                                :value="item.component"
                                                :key="'c_' + item.name">
                                        <v-card flat style="min-height: 500px" class="w--max--800 ma-auto _tab">
                                            <component :is="item.component"></component>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-tabs>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
            <v-flex v-if="activeTab === 'FavouritesClubs'"
                    class="app-bg-sand p-relative"
                    style="z-index: 10">
                <v-container class="_layout-create_club">
                    <v-layout row align-center fill-height>
                        <v-flex class="text-xs-center">
                            <div class="align-center">
                                <app-btn-club-create color="var(--sand)"
                                                     class="d-inline-flex"
                                                     primary>
                                    <span class="text--charcoal">Ideas for another club?</span>
                                </app-btn-club-create>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </favourites-layout>
</template>

<script>
  import AppNamePage from '../../../components/app-name-page'
  import FavouritesArticles from './shared/articles'
  import FavouritesShortlist from './shared/shortlist'
  import FavouritesLayout from './favourites-layout'
  // Lazy loading Vue components
  const FavouritesClubs = () => import('./nanny/clubs')
  const FavouritesPosts = () => import('./nanny/posts')
  const AppBtnClubCreate = () => import('@/components/app-buttons/app-btn-club-create')

  export default {
    name: 'favourites',

    components: {FavouritesLayout, FavouritesPosts, AppBtnClubCreate, FavouritesClubs, FavouritesShortlist, FavouritesArticles, AppNamePage},

    data () {
      return {
        activeTab: null
      }
    },

    computed: {
      title () {
        if (this.$auth.check(['parent'])) {
          return 'My favourites'
        } else {
          return 'My Clubs'
        }
      },
      navItems () {
        const _role = this.$auth.user().role
        return [
          {
            name: 'My saved NannyGrannies',
            component: 'FavouritesShortlist',
            count: this.$store.getters['favourites/shortlist/collection'].length,
            visible: ['parent']
          }, {
            name: 'My clubs',
            component: 'FavouritesClubs',
            count: this.$store.getters['favourites/clubs/collection'].length + this.$store.getters['clubhouse/clubs/user/collection'].length,
            visible: ['nanny']
          },
          // {
          //   name: 'My forum posts',
          //   component: 'FavouritesPosts',
          //   count: this.$store.getters['clubhouse/clubs/posts/collection'].length,
          //   visible: ['nanny']
          // },
          {
            name: 'My saved jobs',
            component: 'FavouritesShortlist',
            count: this.$store.getters['favourites/shortlist/collection'].length,
            visible: ['nanny']
          }, {
            name: 'My saved articles',
            component: 'FavouritesArticles',
            count: this.$store.getters['favourites/articles/collection'].length,
            visible: ['parent', 'nanny']
          }
        ].filter((item) => item.visible.indexOf(_role) > -1)
      }
    },

    created () {
      //
    }
  }
</script>

<style lang="stylus" scoped>
    ._tabs
        ._tab
            padding 16px 0 70px

    @media (min-width: 600px)
        ._tabs
            margin-top 30px

            ._tab
                padding 70px 0

    ._layout-create_club
        height 255px
</style>
