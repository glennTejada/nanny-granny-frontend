<template>
    <v-layout v-if="items.length > 0"
              column>
        <v-flex d-flex justify-center>
            <v-expansion-panel flat class="app-expansion-panel w--max--800">

                <v-expansion-panel-content v-for="(item, i) in items"
                                           :key="'panel' + item.id">
                    <div slot="header" class="font--medium ma-0 text--black">
                        <div class="d-flex align-center">
                            <v-checkbox v-model="selectedGroup"
                                        :ripple="false"
                                        :value="item.id"
                                        class="ma-0 pa-0"
                                        style="max-width: 35px"
                                        @click.stop
                                        primary
                                        hide-details></v-checkbox>
                            <connection-name-group :item="item"/>
                            <div class="font--light px-2"
                                 style="max-width: 100px">{{item.created_at | formatDate('Do MMM') }}</div>
                        </div>
                    </div>

                    <connection-user-list v-model="selectedUsers"
                                          :hide-headers="false"
                                          :selectable="false"
                                          :headers="headers"
                                          :items="item.members"/>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-flex>
        <v-flex text-xs-center>
            <v-layout my-5>
                <v-flex class="mr-auto"
                        style="max-width: 64px">
                    <v-btn color="primary"
                           :loading="deleting"
                           :disabled="selectedGroup.length < 1"
                           icon
                           outline
                           class="v-btn--icon_square">
                        <app-svg-icon name="brand/NG_DELETE" height="30"></app-svg-icon>
                    </v-btn>
                </v-flex>
                <v-flex>
                    <v-btn class="primary"
                           @click="sendMessage"
                           :disabled="selectedGroup.length !== 1"
                           depressed>
                        <app-svg-icon name="brand/NG_CONTACT"
                                      width="30"
                                      class="mr-2"></app-svg-icon>
                        Send message
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
    <v-layout v-else>
        <h3 class="text--grey_1 ma-auto">Nothing is here yet</h3>
    </v-layout>
</template>

<script>
  import ConnectionUserList from './connection-user-list'
  import ConnectionNameGroup from './connection-name-group'

  export default {
    name: 'connection-groups',

    components: {ConnectionNameGroup, ConnectionUserList},

    data () {
      return {
        selectedGroup: [],
        selectedUsers: [],
        deleting: false,
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
            text: '',
            sortable: false,
            style: {width: '150px'}
          }, {
            text: '',
            sortable: false
          }, {
            text: '',
            sortable: false,
            style: {width: '130px', textAlign: 'center'}
          }
        ]
      }
    },

    computed: {
      items () {
        return this.$store.getters['user/connect/groups/collection']
      }
    },

    mounted () {
      this.$store.dispatch('user/connect/groups/FETCH', {authID: this.$auth.user().id})
    },

    methods: {
      sendMessage () {
        this.$router.push(`/chat/${this.selectedGroup[0]}`)
      },
      remove () {
        this.deleting = true
        this.$store.dispatch('user/connect/groups/DELETE', {ids: this.selectedGroup})
          .finally(() => (this.deleting = false))
      }
    }
  }
</script>

<style scoped>

</style>
