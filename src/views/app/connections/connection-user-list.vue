<template>
    <app-table-list v-model="selected"
                    :headers="headers"
                    :hide-headers="hideHeaders"
                    :items="items"
                    class="_table">
        <template slot="_items" slot-scope="{props}">
            <tr class="_tr" style="height: 130px">
                <td v-if="$vuetify.breakpoint.smAndUp"
                    class="px-0">
                    <v-checkbox v-if="selectable"
                                v-model="props.selected"
                                :ripple="false"
                                primary
                                hide-details></v-checkbox>
                </td>
                <td v-if="$vuetify.breakpoint.smAndUp"
                    class="px-0">
                    <app-avatar :src="props.item.user.getAvatarUrl()"
                                :id="`image${props.item.id}`"
                                width="50px"
                                height="auto"
                                class="_avatar"></app-avatar>
                </td>
                <td class="font--medium primary--text _td--name">
                    {{props.item.user.first_name}}
                </td>
                <td class="font--medium">
                    {{(props.item.user.postcode.location || '') | capitalize}}
                </td>
                <td class="px-0 text-xs-center">
                    <div class="d-inline-flex align-center">
                        <span>{{props.item.created_at | formatDate('Do MMM')}}</span>
                        <!--<span class="icon-NG_CONNECT"></span>-->
                        <app-svg-icon name="brand/NG_CONNECT"
                                      color="var(--blue)"
                                      class="ml-4"
                                      height="36"
                                      width="36"></app-svg-icon>
                    </div>
                </td>
            </tr>
        </template>
    </app-table-list>
</template>

<script>
  import AppTableList from '../../../components/app-table/app-table-list'
  import AppAvatar from '../../../components/app-avatar'

  export default {
    name: 'connection-user-list',
    components: {AppAvatar, AppTableList},
    props: {
      selectable: Boolean,
      value: null,
      items: {
        type: Array,
        required: true
      },
      headers: {
        type: Array
      },
      hideHeaders: Boolean
    },

    data () {
      return {
        selected: this.value || []
      }
    },

    watch: {
      selected (val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style scoped>

</style>
