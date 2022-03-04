<template>
    <v-layout _meet-up row wrap>
        <!--Map-->
        <v-flex xs12 md6>
            <v-layout column>
                <v-flex tag="h2" class="text-xs-center my-5">Location</v-flex>
                <v-flex>
                    <club-meet-up-map :items="items"
                                      @change-meet-up="active = 0"></club-meet-up-map>
                </v-flex>
            </v-layout>
        </v-flex>
        <!--Tabs-->
        <v-flex xs12 md6>
            <v-layout column>
                <v-flex tag="h2" class="text-xs-center my-5">Meet-ups</v-flex>
                <v-flex class="app-bg-sand _meet-up--tabs">
                    <v-tabs v-model="active"
                            grow
                            color="transparent">
                        <v-tab v-for="tab in tabs"
                               :key="tab.id"
                               :ripple="false">
                            <span class="text-capitalize">{{tab.name}}</span>
                        </v-tab>
                        <v-tab-item v-for="tab in tabs"
                                    :key="`item_${tab.id}`"
                                    class="border--top border--grey_2 _meet-up--tabs_items">
                            <component :is="tab.component"/>
                        </v-tab-item>
                    </v-tabs>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
  import ClubMeetUpMap from './clubhouse-club-meet-up-map'
  import ClubMeetUpCalendar from './clubhouse-club-meet-up-calendar'
  import ClubMeetUpUpcoming from './clubhouse-club-meet-up-upcoming'
  import ClubMeetUpCreate from './clubhouse-club-meet-up-create'

  export default {
    name: 'clubhouse-club-meet-up',
    components: {ClubMeetUpCreate, ClubMeetUpUpcoming, ClubMeetUpCalendar, ClubMeetUpMap},
    props: {
      clubId: Number,
      categoryId: Number,
      ownerClub: Boolean
    },
    data () {
      return {
        active: 0
      }
    },
    computed: {
      items () {
        return this.$store.getters['clubhouse/meetUp/collection']
      },
      selectedItem () {
        return this.$store.getters['clubhouse/meetUp/selected']
      },
      tabs () {
        let _tabs = [
          {id: 'tab1', name: 'Upcoming', component: 'ClubMeetUpUpcoming'},
          {id: 'tab2', name: 'Calendar', component: 'ClubMeetUpCalendar'},
          {id: 'tab3', name: 'Create a meet-up', component: 'ClubMeetUpCreate'}
        ]
        if (!this.selectedItem) {
          return _tabs
        }
        let _owner = this.$auth.user().id === this.selectedItem.club.user_from_id || this.ownerClub
        return this.selectedItem.club.is_favorite || _owner ? _tabs : _tabs.slice(0, 2)
      }
    },
    mounted () {
      let query = {
        by: this.categoryId ? 'category' : 'club',
        params: this.categoryId ? {category_id: this.categoryId} : {parent_id: this.clubId}
      }
      this.$store.dispatch('clubhouse/meetUp/FETCH', query).then(() => {
        if (this.items[0]) {
          this.$store.commit('clubhouse/meetUp/SELECTED', this.items[0].id)
        }
      })
    },
    beforeDestroy () {
      this.$store.commit('clubhouse/meetUp/RESET')
    }
  }
</script>

<style lang="stylus" scoped>
    ._meet-up
        &--tabs
            min-height 400px
            padding 40px 24px 40px
            @media (min-width 960px)
                padding 40px 40px 0

            &_items
                height 300px
                padding 4px 0
</style>
