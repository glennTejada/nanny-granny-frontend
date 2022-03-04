<template>
    <div class="border border--grey_2 fill-height">
        <v-layout fill-height>
            <v-flex class="_inbox">
                <v-card flat>
                    <v-card-title class="border--bottom border--grey_2">
                        <v-badge>
                            <span v-if="unreadMsg"
                                  slot="badge">{{unreadMsg}}</span>
                            <h3 class="pr-1">Inbox</h3>
                        </v-badge>
                        <v-spacer></v-spacer>
                        <router-link v-if="inbox.length > 0"
                                     tag="a"
                                     to="/inbox"
                                     class="link-small">View all
                        </router-link>
                    </v-card-title>
                    <v-card-actions class="py-0 px-3">
                        <app-list-inbox v-if="inbox.length > 0"
                                        :items="inbox"></app-list-inbox>
                        <h3 v-else
                            class="text-xs-center ma-auto text--grey_1 py-5">Nothing here yet</h3>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
  import AppListInbox from '../../../../components/app-lists/inbox/app-list-inbox'

  export default {
    name: 'dashboard-inbox',

    components: {AppListInbox},

    computed: {
      inbox () {
        return this.$store.getters['inbox/collection']
      },
      unreadMsg () {
        return this.$store.getters['notifications/messages']
      }
    },

    created () {
      let perPage = this.$auth.check(['parent']) ? 4 : 2
      this.$store.dispatch('inbox/FETCH', {per_page: perPage})
    }
  }
</script>

<style lang="stylus" scoped>
    ._inbox
        .v-card__title
            padding 20px
</style>
