<template>
    <app-card-listing-base type="job"
                           :hide-actions="hideActions"
                           @recommend="$emit('recommend', item.id)"
                           @auth-dialog="$emit('auth-dialog')"
                           :item="item"
                           :grid="grid">
        <template slot="header">
            <v-layout class="__header">
                <v-flex>
                    <div>
                        <app-btn-view-profile :item="item"
                                              style="width: 100%">
                            <h2 class="mb-2 primary--text text-xs-left text-truncate"
                                style="width: 100%">{{item.name | capitalize}}</h2>
                        </app-btn-view-profile>
                    </div>
                    <h4 class="mb-2 text-capitalize">{{(item.postcode || {}).location | capitalize}}</h4>
                    <div>
                        Start: {{item.date_start | formatDate('DD MMM')}}
                        <span class="mx-2"></span>
                        Applications Close: {{item.date_close | formatDate('DD MMM')}}
                    </div>
                </v-flex>
            </v-layout>
        </template>
    </app-card-listing-base>
</template>

<script>
  import AppCardListingBase from './app-card-base'
  import AppBtnViewProfile from '../../app-buttons/app-btn-view-profile'

  export default {
    name: 'app-card-job',
    components: {AppBtnViewProfile, AppCardListingBase},
    props: {
      hideActions: Boolean,
      grid: Boolean,
      item: Object
    }
  }
</script>

<style lang="stylus" scoped>
    .__header
        padding 24px 0 !important
        @media (min-width: 960px)
            padding 0 8px 50px !important
</style>
