<template>
    <v-layout v-if="items.length > 0"
              column>
        <app-table-list :headers="headers"
                        :items="items"
                        class="_table">
            <template slot="_items" slot-scope="{props}">
                <tr class="_tr">
                    <td v-if="$vuetify.breakpoint.smAndUp"
                        class="px-0">
                        <app-avatar :src="props.item.user.getAvatarUrl()"
                                    :id="`image${props.item.id}`"
                                    width="50px"
                                    height="auto"
                                    class="_avatar"></app-avatar>
                    </td>
                    <td class="font--medium primary--text _td--name">
                        <div class="d-inline-flex align-center">
                            <app-svg-icon name="brand/NG_CONNECT_W_MEMBER" class="mr-2"></app-svg-icon>
                            <span>{{props.item.user.first_name}}</span>
                        </div>
                        <div v-if="$vuetify.breakpoint.xsOnly"
                             class="text--charcoal font--light mt-1">
                            Requested {{props.item.created_at | formatDate('Do MMM')}}
                        </div>
                    </td>
                    <td v-if="$vuetify.breakpoint.smAndUp" class="_td-date">
                        {{props.item.created_at | formatDate('Do MMM')}}
                    </td>
                    <td class="text-xs-right text-sm-center">
                        <v-btn icon
                               @click="connect(props.item.id, 1)"
                               color="primary"
                               class="v-btn--icon_square">
                            <app-svg-icon name="ui/NG_TICK"></app-svg-icon>
                        </v-btn>
                        <v-btn icon
                               @click="connect(props.item.id, 0)"
                               outline
                               color="primary"
                               class="v-btn--icon_square">
                            <app-svg-icon name="ui/NG_CLOSE"></app-svg-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </app-table-list>
    </v-layout>
    <v-layout v-else>
        <h3 class="text--grey_1 ma-auto">Nothing is here yet</h3>
    </v-layout>
</template>

<script>
  import AppAvatar from '../../../components/app-avatar'
  import AppTableList from '../../../components/app-table/app-table-list'

  export default {
    name: 'connection-requests',
    components: {AppTableList, AppAvatar},
    data () {
      return {
        headers: [
          {
            text: '',
            sortable: false,
            style: {width: '60px'}
          }, {
            text: 'Name',
            sortable: false
          }, {
            text: 'Request',
            sortable: false,
            style: {width: '150px'}
          }, {
            text: 'Connect',
            sortable: false,
            style: {width: '180px', textAlign: 'center'}
          }
        ]
      }
    },
    computed: {
      items () {
        return this.$store.getters['user/connect/requests/collection']
      }
    },
    mounted () {
      this.$store.dispatch('user/connect/requests/FETCH')
    },
    methods: {
      connect (id, status) {
        this.$store.dispatch('user/connect/requests/APPLY_OR_REFUSE', {id: id, status: status})
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .v-btn--icon_square
        .svg-icon
            width 20px
            height 20px

    ._td--name
        .svg-icon
            width 32px
            height 32px
            color var(--charcoal)

    @media (max-width: 599px)
        table.v-table
            display block
            tbody
                display block
                tr, th
                    display flex
                    justify-content space-between
                    > td
                        height auto
                        padding 16px 0


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
