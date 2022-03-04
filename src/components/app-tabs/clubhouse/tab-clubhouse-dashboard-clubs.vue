<template>
    <v-layout v-if="items.length > 0">
        <v-flex v-for="club in items"
                :key="`club_${club.id}`"
                class="_item-club">
            <clubhouse-club-list-item :item="club"
                                      compact></clubhouse-club-list-item>
        </v-flex>
    </v-layout>
    <v-layout v-else>
        <h3 class="text--grey_1 text-xs-center ma-auto pa-3">Nothing is here yet</h3>
    </v-layout>
</template>

<script>
  import ClubhouseClubListItem from '../../../views/app/clubhouse/share/clubhouse-club-list-item'
  export default {
    name: 'tab-clubhouse-dashboard-clubs',
    components: {ClubhouseClubListItem},
    props: {
      items: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._item-club
        max-width 250px
        min-width 250px
</style>
