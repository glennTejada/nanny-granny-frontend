<template>
    <v-layout v-if="items.length > 0"
              column>
        <connection-user-list v-model="selected"
                              selectable
                              :headers="headers"
                              :items="items"></connection-user-list>
        <v-flex v-if="$vuetify.breakpoint.smAndUp"
                text-xs-center>
            <v-layout>
                <v-flex class="mr-auto" style="max-width: 64px">
                    <v-btn color="primary"
                           icon
                           outline
                           class="v-btn--icon_square"
                           :disabled="selected.length < 1"
                           @click="remove">
                        <app-svg-icon name="brand/NG_DELETE" height="30"></app-svg-icon>
                    </v-btn>
                </v-flex>
                <v-flex>
                    <v-btn class="primary"
                           :loading="loadingChat"
                           :disabled="selected.length < 1"
                           @click="sendMessage"
                           depressed>
                        <app-svg-icon name="brand/NG_CONTACT"
                                      width="30"
                                      class="mr-2"></app-svg-icon>
                        Send message
                    </v-btn>
                    <v-btn class="primary"
                           @click="modal = true"
                           :disabled="selected.length < 1"
                           depressed>
                        <app-svg-icon name="brand/NG_ADD_MEMBER"
                                      height="30"
                                      width="30"
                                      class="mr-2"></app-svg-icon>
                        Invite to a group
                    </v-btn>
                    <v-btn class="primary"
                           :loading="creating"
                           :disabled="selected.length < 2"
                           @click="createGroup"
                           depressed>
                        <app-svg-icon name="brand/NG_GROUP"
                                      width="30"
                                      class="mr-2"></app-svg-icon>
                        Create new group
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
        <!-- Modal -->
        <v-dialog v-model="modal"
                  max-width="450"
                  :fullscreen="$vuetify.breakpoint.xsOnly">
            <connection-invite-group :user-ids="selectedUserIds"
                                     :modal.sync="modal"/>
        </v-dialog>
    </v-layout>
    <v-layout v-else>
        <h3 class="text--grey_1 ma-auto">Nothing is here yet</h3>
    </v-layout>
</template>

<script>
  import ConnectionUserList from './connection-user-list'
  import ConnectionInviteGroup from './connection-invite-group'

  export default {
    name: 'connections',
    components: {ConnectionInviteGroup, ConnectionUserList},
    data () {
      return {
        modal: false,
        loadingChat: false,
        creating: false,
        selected: [],
        headers: [
          {
            text: '',
            sortable: false,
            style: {width: '40px'}
          }, {
            text: '',
            sortable: false,
            style: {width: '60px'}
          }, {
            text: 'Name',
            sortable: false,
            style: {width: '150px'}
          }, {
            text: 'Location',
            sortable: false
          }, {
            text: 'Connection since',
            sortable: false,
            style: {width: '100px', textAlign: 'center'}
          }
        ]
      }
    },
    computed: {
      items () {
        return this.$store.getters['user/connect/collection']
      },
      selectedUserIds () {
        return this.$lodash.map(this.selected, 'user.id')
      }
    },
    mounted () {
      this.$store.dispatch('user/connect/FETCH', {authUserId: this.$auth.user().id})
    },
    methods: {
      sendMessage () {
        if (this.selected.length > 0) {
          this.loadingChat = true
          this.$store.dispatch('chat/GET_ROOM', {user_ids: this.selectedUserIds})
            .then(res => {
              this.$router.push(`/chat/${res.data.id}`)
            })
            .finally(() => (this.loadingChat = false))
        }
      },
      createGroup () {
        if (this.selected.length < 2) return
        this.creating = true
        this.$store.dispatch('user/connect/groups/CREATE', {user_ids: this.selectedUserIds})
          .then(() => {
            this.$store.dispatch('user/connect/groups/FETCH', {authID: this.$auth.user().id})
          })
          .finally(() => {
            this.creating = false
          })
      },
      remove () {
        if (this.selected.length > 0) {
          this.$store.dispatch('user/connect/DELETE', this.selected[0].id)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .icon-NG_CONNECT
        font-size 30px
        color var(--blue)

    @media (min-width: 600px)
        ._table
            margin-bottom 50px

        table.v-table
            tbody
                td, th
                    padding-left 16px
                    padding-right 16px

                    &:last-child
                        padding-left 0
                        padding-right 0

                ._tr td
                    height 130px
</style>
