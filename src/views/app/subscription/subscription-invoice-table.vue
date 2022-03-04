<template>
    <v-data-table :headers="headers"
                  :items="items"
                  class="_table"
                  hide-actions>
        <!--HEADERS-->
        <template slot="headers"
                  slot-scope="props">
            <th v-for="header in props.headers"
                class="hidden-xs-only"
                :key="header.type">
                <h4 class="text-xs-left font--medium small text--black _th-td">{{ header.text }}</h4>
            </th>
        </template>
        <!--ITEMS-->
        <template slot="items"
                  slot-scope="props">
            <tr class="_body-tr">
                <td>{{props.item.status}}</td>
                <td>{{props.item.created_at | formatDate}}</td>
                <td>{{props.item.id}}</td>
                <td>{{props.item.name}}</td>
                <td>{{props.item.amount}} {{props.item.currency}}</td>
<!--
                <td class="text-xs-right text-sm-left">
                    <a :href="props.item.link_download" class="link-small">Download invoice</a>
                </td>
-->
            </tr>
        </template>
        <template slot="no-data">
            <tr style="height: 130px">
                <td :colspan="headers.length"
                    class="text-xs-center">
                    <h3 class="text--grey_1">Nothing is here yet</h3>
                </td>
            </tr>
        </template>
    </v-data-table>
</template>

<script>
  export default {
    name: 'subscription-invoice-table',

    data () {
      return {
        headers: [
          {text: 'Status', value: 'status', sortable: false},
          {text: 'Date', value: 'created_at', sortable: false},
          {text: 'Invoice number', value: 'id', sortable: false},
          {text: 'Name', value: 'name', sortable: false},
          {text: 'Amount', value: 'amount', sortable: false}
          // {text: 'Download', value: 'download', sortable: false}
        ],
        items: []
      }
    },

    created () {
      this.$store.dispatch('subscription/payments/GET_INVOICES')
        .then((data) => {
          this.items = data
          console.log(this.items)
        })
    }
  }
</script>

<style lang="stylus" scoped>
    ._table
        border-bottom 1px solid var(--grey_3)
        ._th-td
            min-height 60px
        ._body-tr
            height 108px
            &:hover
                background-color transparent !important
    @media (max-width: 599px)
        ._body-tr
            td:nth-child(3),
            td:first-child
                display none
</style>
