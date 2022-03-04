<template>
    <v-layout column>
        <!--JOINED-->
        <v-flex tag="h2" class="mb-5 text-xs-center">Clubs I have joined</v-flex>
        <app-table-list v-model="selected"
                        :headers="headersJoined"
                        :items="itemsJoined"
                        class="_table">
            <template slot="_items"
                      slot-scope="{props}">
                <tr class="_tr">
                    <td class="px-0 hidden-xs-only"></td>
                    <td>
                        <clubhouse-club-list-item :item="props.item"></clubhouse-club-list-item>
                    </td>
                    <td class="_td-date">
                        {{props.item.created_at | formatDate('Do MMM')}}
                    </td>
                </tr>
            </template>
        </app-table-list>
        <!--CREATED-->
        <v-flex tag="h2" class="my-5 text-xs-center">Clubs I have created</v-flex>
        <app-table-list v-model="selected"
                        :headers="headersCreated"
                        :items="itemsCreated"
                        class="_table">
            <template slot="_items"
                      slot-scope="{props}">
                <tr class="_tr">
                    <td class="px-0 hidden-xs-only">
                        <v-checkbox v-model="props.selected"
                                    :ripple="false"
                                    class="checkbox-ma-0"
                                    primary
                                    hide-details></v-checkbox>
                    </td>
                    <td>
                        <clubhouse-club-list-item :item="props.item"></clubhouse-club-list-item>
                    </td>
                    <td class="_td-date">
                        {{props.item.created_at | formatDate('Do MMM')}}
                    </td>
                    <td class="text-xs-right hidden-xs-only">
                        <app-svg-icon name="brand/NG_EDIT"
                                      width="20"
                                      style="cursor: pointer"
                                      @click="edit(props.item)"
                                      color="var(--blue)"></app-svg-icon>
                    </td>
                </tr>
            </template>
        </app-table-list>
        <v-flex v-if="$vuetify.breakpoint.smAndUp">
            <v-btn color="primary"
                   outline
                   :loading="removing"
                   :disabled="selected.length < 1"
                   class="_btn-app-icon mx-0"
                   @click="remove">
                <app-svg-icon name="brand/NG_DELETE"></app-svg-icon>
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
  import ClubhouseClubListItem from '../../clubhouse/share/clubhouse-club-list-item'
  import AppTableList from '../../../../components/app-table/app-table-list'
  export default {
    name: 'favourites-clubs',
    components: {AppTableList, ClubhouseClubListItem},
    data () {
      return {
        selected: [],
        removing: false,
        headersJoined: [
          {
            text: '',
            sortable: false,
            style: {width: '30px'}
          }, {
            text: 'Club details',
            sortable: false,
            style: {paddingLeft: '145px'}
          }, {
            text: 'Member since',
            sortable: false,
            style: {width: '100px'}
          }
        ],
        headersCreated: [
          {
            text: '',
            sortable: false,
            style: {width: '30px'}
          }, {
            text: 'Club details',
            sortable: false,
            style: {paddingLeft: '145px'}
          }, {
            text: 'Created',
            sortable: false,
            style: {width: '100px'}
          }, {
            text: 'Edit',
            sortable: false,
            style: {width: '40px'}
          }
        ]
      }
    },
    computed: {
      itemsJoined () {
        return this.$store.getters['favourites/clubs/collection']
      },
      itemsCreated () {
        return this.$store.getters['clubhouse/clubs/user/collection']
      }
    },

    mounted () {
      this.$store.dispatch('favourites/clubs/FAVOURITES_GET')
      this.$store.dispatch('clubhouse/clubs/user/FETCH', {
        userId: this.$auth.user().id
      })
    },

    methods: {
      edit (club) {
        this.$store.commit('dialog/DIALOG_SHOW', {
          show: true,
          component: 'app-dialog-club-create',
          data: {club: club},
          options: {
            maxWidth: 685
          }
        })
      },
      remove () {
        this.removing = true
        const _data = this.$lodash.map(this.selected, 'id')
        this.$store.dispatch('clubhouse/clubs/user/DELETE', _data)
          .then(() => (this.selected = []))
          .finally(() => (this.removing = false))
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._tr
        height 160px
</style>
