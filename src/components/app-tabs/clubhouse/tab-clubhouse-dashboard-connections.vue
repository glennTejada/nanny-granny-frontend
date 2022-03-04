<template>
    <v-layout v-if="items.length > 0">
        <v-flex v-for="connect in items"
                :key="`connect_${connect.id}`"
                class="_item-connect">
            <div class="primary--text font--medium">
                <app-avatar :src="connect.user.getAvatarUrl()"
                            class="mx-auto"
                            :width="$vuetify.breakpoint.xsOnly ? '60px':'80px'"
                            :height="$vuetify.breakpoint.xsOnly ? '60px':'80px'"></app-avatar>
                <p class="_item-connect--name my-2 text-xs-center">
                    <app-btn-user-connect :item="connect.user"></app-btn-user-connect>
                </p>
            </div>
        </v-flex>
    </v-layout>
    <v-layout v-else>
        <h3 class="text--grey_1 text-xs-center ma-auto pa-3">Nothing is here yet</h3>
    </v-layout>
</template>

<script>
  import AppAvatar from '../../app-avatar'
  import AppBtnUserConnect from '../../app-buttons/app-btn-user-connect'
  export default {
    name: 'tab-clubhouse-dashboard-connections',
    components: {AppBtnUserConnect, AppAvatar},
    props: {
      items: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._item-connect
        max-width 200px
        min-width 200px
        &--name
            font-size 1.4286rem
</style>
