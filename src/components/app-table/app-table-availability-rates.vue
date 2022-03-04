<template>
    <v-layout row wrap>
        <v-card-text class="select-all">
            <v-checkbox v-if="!readonly"
                        :ripple="false"
                        @click="clickSelectAll"
                        v-model="selecAllChecked"
                        class="mt-1"
                        hide-details>
                <template slot="label">
                    <span class="text-small text--charcoal">Select All</span>
                </template>
            </v-checkbox>
        </v-card-text>
        <!-- TABLE WITH PARAMS -->
        <v-flex xs12>
            <v-data-table :headers="headers"
                          :items="availabilityIsParam"
                          class="app-table app-table--availability"
                          hide-actions>
                <!--headers-->
                <template slot="headers"
                          slot-scope="props">
                    <th v-for="header in props.headers"
                        class="text-xs-center"
                        :key="header.type">
                        <span class="text--black app-text-medium small">{{ header.text }}</span>
                    </th>
                </template>
                <!--items-->
                <template slot="items"
                          slot-scope="props">
                    <tr>
                        <td>
                            <p class="my-0 text--black app-text-medium small">{{props.item.name}}</p>
                            <span>{{props.item.description}}</span>
                        </td>
                        <td class="text-xs-center">
                            <v-checkbox v-model="props.item.mon"
                                        :readonly="readonly"
                                        :ripple="false"
                                        @change="checkSelectAll()"
                                        class="justify-center"
                                        hide-details></v-checkbox>
                        </td>
                        <td>
                            <v-checkbox v-model="props.item.tue"
                                        :readonly="readonly"
                                        :ripple="false"
                                        @change="checkSelectAll()"
                                        class="justify-center"
                                        hide-details></v-checkbox>
                        </td>
                        <td>
                            <v-checkbox v-model="props.item.wed"
                                        :readonly="readonly"
                                        :ripple="false"
                                        @change="checkSelectAll()"
                                        class="justify-center"
                                        hide-details></v-checkbox>
                        </td>
                        <td>
                            <v-checkbox v-model="props.item.thu"
                                        :readonly="readonly"
                                        :ripple="false"
                                        @change="checkSelectAll()"
                                        class="justify-center"
                                        hide-details></v-checkbox>
                        </td>
                        <td>
                            <v-checkbox v-model="props.item.fri"
                                        :readonly="readonly"
                                        :ripple="false"
                                        @change="checkSelectAll()"
                                        class="justify-center"
                                        hide-details></v-checkbox>
                        </td>
                        <td>
                            <v-checkbox v-model="props.item.sat"
                                        :readonly="readonly"
                                        :ripple="false"
                                        @change="checkSelectAll()"
                                        class="justify-center"
                                        hide-details></v-checkbox>
                        </td>
                        <td>
                            <v-checkbox v-model="props.item.sun"
                                        :readonly="readonly"
                                        :ripple="false"
                                        @change="checkSelectAll()"
                                        class="justify-center"
                                        hide-details></v-checkbox>
                        </td>
                        <td>
                            <v-text-field v-model="props.item.pay"
                                          :disabled="readonly"
                                          hide-details
                                          :mask="maskPay"
                                          class="app-text-medium small text-xs-right pa-0 mb-0"
                                          prefix="$"></v-text-field>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-flex>
        <!-- TABLE WITHOUT PARAMS -->
        <v-flex xs12 mt-4>
            <v-data-table :items="availabilityIsNotParam"
                          hide-headers
                          class="app-table app-table--availability-without-params"
                          hide-actions>
                <!--items-->
                <template slot="items"
                          slot-scope="props">
                    <tr>
                        <td width="168px">
                            <p class="my-0 text--black app-text-medium small">{{props.item.name}}</p>
                            <span>{{props.item.description}}</span>
                        </td>
                        <td class="px-4">
                            <v-checkbox v-model="props.item.mon"
                                        @change="selectAll(props.item)"
                                        :disabled="readonly"
                                        :ripple="false"
                                        hide-details></v-checkbox>
                        </td>
                        <td width="160px">
                            <v-text-field v-model="props.item.pay"
                                          :disabled="readonly"
                                          hide-details
                                          :mask="maskPay"
                                          class="app-text-medium small text-xs-right pa-0 ma-0"
                                          prefix="$"></v-text-field>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'app-table-availability-rates',

    props: {
      value: {
        type: Array,
        default: () => []
      },
      readonly: Boolean
    },

    data () {
      return {
        selecAllChecked: this.checkSelectAll(),
        maskPay: '###',
        headers: [
          {
            text: '',
            value: 'type',
            sortable: false,
            width: '160px',
            align: 'center'
          }, {
            text: 'M',
            value: 'mon',
            sortable: false,
            align: 'center'
          }, {
            text: 'T',
            value: 'tue',
            sortable: false,
            align: 'center'
          }, {
            text: 'W',
            value: 'wed',
            sortable: false,
            align: 'center'
          }, {
            text: 'T',
            value: 'thu',
            sortable: false,
            align: 'center'
          }, {
            text: 'F',
            value: 'fri',
            sortable: false,
            align: 'center'
          }, {
            text: 'S',
            value: 'sat',
            sortable: false,
            align: 'center'
          }, {
            text: 'S',
            value: 'sun',
            sortable: false,
            align: 'center'
          }, {
            text: 'Pay per hour',
            value: 'pay',
            sortable: false,
            width: '160px',
            align: 'center'
          }
        ],
        items: this.value
      }
    },

    computed: {
      availabilityIsParam () {
        return this.$lodash.filter(this.items, {param: '1'})
      },
      availabilityIsNotParam () {
        return this.$lodash.filter(this.items, {param: '0'})
      }
    },

    watch: {
      items () {
        this.$emit('input', this.items)
      }
    },

    created () {
      if (this.readonly) {
        this.$vuetify.icons.checkboxOn = 'a-icon a-icon__checkbox a-icon__checkbox-on readonly'
        this.$vuetify.icons.checkboxOff = 'a-icon a-icon__checkbox a-icon__checkbox-off readonly'
      }
      this.items = this.value && this.value.length > 0 ? this.value : this.defaultItems(this.$store.getters['catalogs/availability'])
    },

    destroyed () {
      this.$vuetify.icons.checkboxOn = 'a-icon a-icon__checkbox a-icon__checkbox-on'
      this.$vuetify.icons.checkboxOff = 'a-icon a-icon__checkbox a-icon__checkbox-off'
    },

    methods: {
      clickSelectAll () {
        if (this.selecAllChecked) {
          this.items = this.defaultItems(this.items)
          this.selecAllChecked = false
        } else {
          this.items = this.defaultItems(this.items, true, 15)
          this.selecAllChecked = true
        }
      },
      checkSelectAll () {
        if (!Array.isArray(this.items)) {
          this.selecAllChecked = false
          return false
        }
        let allcheck = true
        this.$lodash.forEach(this.items, (v, k) => {
          ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].forEach((val) => {
            if (!this.items[k][val]) {
              allcheck = false
            }
          })
        })
        this.selecAllChecked = allcheck
        return allcheck
      },
      defaultItems (list, ch = false, pay = null) {
        this.$lodash.forEach(list, (v, k) => {
          ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].forEach((val) => {
            list[k][val] = ch
            if (list[k]['pay'] != null) {
              list[k]['pay'] = pay
            }
          })
        })
        return list
      },
      selectAll (item) {
        ['tue', 'wed', 'thu', 'fri', 'sat', 'sun'].forEach((v) => {
          item[v] = item.mon
        })
        this.checkSelectAll()
      }
    },
    mounted () {
      this.checkSelectAll()
    }
  }
</script>

<style lang="stylus" scoped>
    .select-all
        padding 5px 0
        span
            font-weight 600
    @import "../../styles/stylus/settings/_variables.styl"
    @media (max-width: 768px)
        tbody
            tr
                td
                    display flex
                    align-items center
                    position relative
                    padding 0 !important
                    > div
                        padding-top 0 !important
                    &:before
                        position absolute
                        left 16px
                        z-index 1
                    .v-text-field
                        justify-content center
                td:first-child
                    display block
        .app-table--availability-without-params
            tbody
                tr
                    display flex
                    flex-direction row
                    flex-wrap wrap
                    td
                        min-width 50%
                        max-width 50%
                        display flex
                        padding 20px 16px !important
                        .v-input--checkbox
                            justify-content flex-end
                    td:last-child
                        min-width 100%
                        height 70px
                        &:before
                            font-family $body-font-family-medium
                            content: 'Pay/hour'
</style>
