<template>
    <connections-layout>
        <v-layout column>
            <v-flex>
                <app-name-page name="My Connections"></app-name-page>
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
        </v-layout>
    </connections-layout>
</template>

<script>
  import AppNamePage from '../../../components/app-name-page'
  import Connections from './connections'
  import ConnectionGroups from './connection-groups'
  import ConnectionRequests from './connection-requests'
  import ConnectionsLayout from './connections-layout'

  export default {
    components: {ConnectionsLayout, ConnectionRequests, ConnectionGroups, Connections, AppNamePage},

    data () {
      return {
        activeTab: 'ConnectionGroups'
      }
    },

    computed: {
      count () {
        return {
          connections: this.$store.getters['user/connect/collection'].length,
          requests: this.$store.getters['user/connect/requests/collection'].length,
          groups: this.$store.getters['user/connect/groups/collection'].length
        }
      },
      navItems () {
        return [
          {
            name: 'My connections',
            component: 'Connections',
            count: this.count.connections
          }, {
            name: 'Connection requests',
            component: 'ConnectionRequests',
            count: this.count.requests
          },
          {
            name: 'My groups',
            component: 'ConnectionGroups',
            count: this.count.groups
          }
        ]
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
