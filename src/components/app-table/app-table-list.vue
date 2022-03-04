<template>
    <v-layout row>
        <v-flex xs12>
            <v-card flat>
                <v-data-table v-model="selected"
                              :headers="headers"
                              :items="items"
                              :hide-headers="hideHeaders"
                              hide-actions
                              :expand="expand"
                              item-key="id"
                              class="elevation-0">
                    <!--headers-->
                    <template slot="headers"
                              slot-scope="props">
                        <tr class="hidden-xs-only">
                            <th v-for="header in props.headers" :style="header.style">
                                <span class="text--black app-text-medium">{{ header.text }}</span>
                            </th>
                        </tr>
                    </template>
                    <!--items-->
                    <template slot="items" slot-scope="props">
                        <slot name="_items" :props="props"></slot>
                    </template>
                    <template slot="no-data">
                        <tr style="height: 130px">
                            <td :colspan="headers.length"
                                class="text-xs-center">
                                <h3 class="text--grey_1">Nothing is here yet</h3>
                            </td>
                        </tr>
                    </template>
                    <template slot="expand" slot-scope="props">
                        <slot name="expand" :props="props"></slot>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'app-table-list',
    props: {
      headers: Array,
      items: Array,
      expand: Boolean,
      hideHeaders: Boolean
    },
    data () {
      return {
        selected: []
      }
    },
    watch: {
      selected () {
        this.$emit('input', this.selected)
      }
    }
  }
</script>

<style lang="stylus" scoped>
    table.v-table
        thead
            th
                padding-left 16px
                padding-right 16px
                text-align left
        ._tr
            height 130px
</style>
