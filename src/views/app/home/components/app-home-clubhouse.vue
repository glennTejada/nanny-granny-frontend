<template>
    <v-layout column>
        <v-flex tag="h2" class="text-xs-center my-5">The ClubHouse</v-flex>
        <v-flex v-if="$auth.check(['nanny'])">
            <app-tabs-clubhouse-dashboard></app-tabs-clubhouse-dashboard>
        </v-flex>
        <v-flex>
            <v-layout row
                      wrap
                      _clubhouse-section
                      :class="{'_clubhouse-section--public': !$auth.check()}"
                      :style="{color: $auth.check() ? 'var(--sand)' : 'var(--pink)'}">
                <v-container grid-list-xl>
                    <v-layout row wrap>
                        <!--If user is logged-->
                        <v-flex v-if="$auth.check()" xs12>
                            <v-tabs class="_tabs"
                                    color="transparent"
                                    centered>
                                <v-tabs-slider color="primary"></v-tabs-slider>
                                <v-tab v-for="tab in tabs"
                                       :href="'#tab-' + tab.id"
                                       :key="'art_tab-' + tab.id"
                                       :ripple="false"
                                       class="text-capitalize _tabs--tab">
                                    {{tab.name}}{{tab.count ? ` (${tab.count})`:''}}
                                </v-tab>
                                <v-tabs-items class="border--top border--grey_2">
                                    <v-tab-item v-for="tab in tabs"
                                                :value="'tab-' + tab.id"
                                                :key="'art_tab-' + tab.id">
                                        <v-layout row wrap _tabs--container>
                                            <v-flex v-if="tab.items.length === 0"
                                                    xs12>
                                                <h3 class="text--grey_1 ma-auto text-xs-center">Nothing is here yet</h3>
                                            </v-flex>
                                            <v-flex v-else
                                                    v-for="(item, index) in tab.items"
                                                    v-scrollanim="{ bEnt: 'before-fadeinup', enter: 'fadeinup', offsetBottom: 400, ind: index }"
                                                    :key="'art_'+ tab.id + item.id"
                                                    xs12 sm6 md4>
                                                <app-card-article :item="item"></app-card-article>
                                            </v-flex>
                                        </v-layout>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-tabs>
                        </v-flex>
                        <!--If user isn't logged-->
                        <v-flex v-else
                                v-for="(item, i) in tabs[0].items"
                                v-scrollanim="{ bEnt: 'before-fadeinup', enter: 'fadeinup', offsetBottom: 400, ind: i }"
                                :class="{'hidden-sm-and-down': (i === 2)}"
                                :key="'art_'+item.id"
                                xs12 sm6 md4>
                            <app-card-article :item="item"></app-card-article>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppCardArticle from '../../../../components/app-card/app-card-article'
  import AppTabsClubhouseDashboard from '../../../../components/app-tabs/clubhouse/app-tabs-clubhouse-dashboard'

  export default {
    name: 'app-home-clubhouse',
    components: {AppTabsClubhouseDashboard, AppCardArticle},
    data () {
      return {
        tabs: [
          {
            name: 'Latest article',
            id: 'latestArticle',
            count: null,
            items: []
          }, {
            name: 'My saved articles',
            id: 'savedArticle',
            count: null,
            items: []
          }
        ]
      }
    },
    computed: {
      latestArticle () {
        return this.$store.getters['articles/collection']
      },
      savedArticle () {
        return this.$store.getters['favourites/articles/collection']
      }
    },

    watch: {
      latestArticle () {
        this.tabs[0].items = this.latestArticle
      },
      savedArticle () {
        this.tabs[1].count = this.savedArticle.length
        this.tabs[1].items = this.savedArticle
      }
    },

    created () {
      this.$store.dispatch('articles/GET_FOR_HOME')
      if (this.$auth.check()) {
        this.$store.dispatch('favourites/articles/FAVOURITES_GET', 'ARTICLE')
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._clubhouse-section
        background-color currentColor
        &--title
            text-align center
            @media (max-width: 600px)
                margin-top 30px
    ._tabs
        margin-bottom 100px
        @media (min-width: 600px)
            min-height 580px
            margin-bottom 0
        &--container
            padding-top 40px
            @media (min-width: 600px)
                padding-top 80px
    @media (min-width: 600px)
        ._clubhouse-section
            position relative
            background-color transparent
            padding-bottom 150px
            &--title
                margin 100px 0 30px
            &:before
                content ''
                position absolute
                display block
                background-color currentColor
                width 100%
                bottom 0
                top 320px
                left 0
            &--public
                &:before
                    top 200px
</style>
