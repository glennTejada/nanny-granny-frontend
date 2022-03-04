<template>
    <div>
        <v-container grid-list-xl>
            <v-layout column>
                <v-flex>
                    <v-tabs color="transparent"
                            fixed-tabs
                            centered>
                        <v-tabs-slider color="primary"></v-tabs-slider>
                        <v-tab v-for="tab in tabs"
                               :href="'#tab-' + tab.slug"
                               :key="'tab-' + tab.slug"
                               :ripple="false"
                               class="text-capitalize _tabs--tab">
                            {{tab.name}}{{tab.count && tab.items.length ? ` (${tab.items.length})`:''}}
                        </v-tab>
                        <v-tabs-items class="border--top border--grey_2 _tabs--items overflow-x-hidden"
                                      touchless>
                            <v-tab-item v-for="tab in tabs"
                                        class="overflow-hidden"
                                        :value="'tab-' + tab.slug"
                                        :key="'item-' + tab.slug">
                                <component :is="tab.component"
                                           :input-key="tab.slug"
                                           :items="tab.items"></component>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-tabs>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
  import TabClubhouseDashboardClubs from './tab-clubhouse-dashboard-clubs'
  import TabClubhouseDashboardConnections from './tab-clubhouse-dashboard-connections'
  import TabClubhouseDashboardPosts from './tab-clubhouse-dashboard-posts'

  export default {
    name: 'app-tabs-clubhouse-dashboard',
    components: {TabClubhouseDashboardPosts, TabClubhouseDashboardConnections, TabClubhouseDashboardClubs},
    props: {
      hideLatestPosts: Boolean,
      hideMyPosts: Boolean
    },
    data () {
      return {
        latestPosts: []
      }
    },
    computed: {
      tabs () {
        return [
          {
            name: 'Latest forum posts',
            slug: 'latestPosts',
            component: 'TabClubhouseDashboardPosts',
            items: this.latestPosts,
            count: false,
            visible: !this.hideLatestPosts
          }, {
            name: 'My clubs',
            slug: 'myClubs',
            component: 'TabClubhouseDashboardClubs',
            items: this.$store.getters['favourites/clubs/collection'],
            count: true,
            visible: true
          }, {
            name: 'My forum posts',
            slug: 'myPosts',
            component: 'TabClubhouseDashboardPosts',
            items: this.$store.getters['clubhouse/clubs/posts/collection'],
            count: true,
            visible: !this.hideMyPosts
          }, {
            name: 'My connections',
            slug: 'connections',
            component: 'TabClubhouseDashboardConnections',
            items: this.$store.getters['user/connect/collection'],
            count: true,
            visible: true
          }
        ].filter(item => item.visible)
      }
    },
    mounted () {
      if (!this.hideLatestPosts) {
        this.$store.dispatch('clubhouse/clubs/posts/GET_LATEST', {per_page: 3})
            .then(data => (this.latestPosts = data))
      }
      if (!this.hideMyPosts) {
        this.$store.dispatch('clubhouse/clubs/posts/GET_BY_USER', {
          userId: this.$auth.user().id,
          params: {per_page: 15}
        })
      }
      this.$store.dispatch('favourites/clubs/FAVOURITES_GET')
      this.$store.dispatch('user/connect/FETCH', {authUserId: this.$auth.user().id})
    }
  }
</script>

<style lang="stylus" scoped>
    ._tabs--items
        padding 100px 0 60px
        overflow hidden
        height 320px
</style>
