<template>
    <v-layout>
        <v-container>
            <!--Tabs-->
            <v-layout column>
                <v-flex>
                    <v-tabs v-model="active"
                            centered
                            fixed-tabs
                            color="transparent">
                        <v-tab v-for="tab in tabs"
                               :key="tab.id"
                               :ripple="false">
                            <span class="text-capitalize">{{tab.name}}</span>
                        </v-tab>
                        <v-tabs-slider color="primary"></v-tabs-slider>
                        <v-tab-item v-for="tab in tabs"
                                    :key="`item_${tab.id}`"
                                    class="border--top border--grey_2 py-5">
                            <v-progress-linear v-if="loading"
                                               indeterminate
                                               height="2"></v-progress-linear>
                            <v-container grid-list-md>
                                <v-layout row wrap>
                                    <v-flex v-for="cat in categoriesSorted(tab.sortBy)"
                                            :key="`tab_item_${tab.id}_${cat.id}`"
                                            xs6 sm4 md3>
                                        <router-link :to="`/clubhouse/club/category/${cat.id}`"
                                                     class="club-category-item">
                                            <app-brandshape-border :width="$vuetify.breakpoint.xsOnly ? '100px':'120px'"
                                                                   :height="$vuetify.breakpoint.xsOnly ? '100px':'120px'">
                                                <app-svg-icon :name="`brand/${cat.svg_name}`"
                                                              width="66"
                                                              :class="[$vuetify.breakpoint.xsOnly?'py-1':'py-4']"
                                                              height="auto"></app-svg-icon>
                                            </app-brandshape-border>
                                            <p class="my-3 text-truncate">{{cat.name}}</p>
                                        </router-link>
                                    </v-flex>
                                    <v-flex xs6 sm4 md3>
                                        <app-btn-club-category-create></app-btn-club-category-create>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-tab-item>
                    </v-tabs>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
</template>

<script>
  import AppBrandshapeBorder from '../../../../components/app-brandshape-border'
  import AppBtnClubCategoryCreate from '../../../../components/app-buttons/app-btn-club-category-create'

  export default {
    name: 'clubhouse-forum-club-categories',
    components: {AppBtnClubCategoryCreate, AppBrandshapeBorder},
    data () {
      return {
        active: 0,
        tabs: [
          {id: 'tab_cat_1', name: 'All clubs', sort: null},
          {id: 'tab_cat_2', name: 'Latest activity', sortBy: 'id'}, // todo: set field
          {id: 'tab_cat_3', name: 'Most popular', sortBy: 'count_members'}
        ]
      }
    },
    computed: {
      loading () {
        return this.$store.getters['clubhouse/clubs/loading']
      },
      categories () {
        return this.$store.getters['clubhouse/clubs/categories']
      }
    },
    async mounted () {
      await this.$store.dispatch('clubhouse/clubs/CATEGORIES')
    },
    methods: {
      categoriesSorted (field) {
        if (!field) {
          return this.categories
        }
        return this.$lodash.sortBy(this.categories, [field])
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .club-category-item
        align-items center
        text-decoration none
        display flex
        flex-direction column
    .v-progress-linear
        margin 0
        position absolute !important
        left 0
        top 0
</style>
