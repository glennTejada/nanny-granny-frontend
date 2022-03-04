<template>
    <app-card-listing-base type="nanny"
                           :hide-actions="hideActions"
                           @recommend="$emit('recommend', item.id)"
                           @auth-dialog="$emit('auth-dialog')"
                           :item="item"
                           :grid="grid">
        <template slot="header">
            <v-layout row class="__header align-center">
                <v-flex class="_box--avatar">
                    <app-avatar :src="item.getAvatarUrl()"></app-avatar>
                </v-flex>
                <v-flex>
                    <app-btn-view-profile :item="item">
                        <h2 class="mb-0 primary--text">{{item.first_name | capitalize}}</h2>
                    </app-btn-view-profile>
                    <p class="mb-0">
                        <span class="text-capitalize">{{item.postcode.location | capitalize}}</span> | Age
                        {{item.date_birthday | age}}
                        <v-rating v-model="item.rating"
                                  class="d-block app-rating"
                                  dense
                                  size="18"
                                  background-color="success"
                                  color="success"
                                  readonly></v-rating>
                    </p>
                </v-flex>
            </v-layout>
        </template>
    </app-card-listing-base>
</template>

<script>
  import AppCardListingBase from './app-card-base'
  import Nanny from '@/models/user/NannyClass'
  import AppAvatar from '../../app-avatar'
  import AppBtnViewProfile from '../../app-buttons/app-btn-view-profile'

  export default {
    name: 'app-card-nanny',

    components: {AppBtnViewProfile, AppAvatar, AppCardListingBase},

    props: {
      hideActions: Boolean,
      grid: Boolean,
      item: [Nanny, Object]
    }
  }
</script>

<style lang="stylus" scoped>
    .__header
        ._box--avatar
            max-width 120px
            ._avatar
                width 81px
                height 82px
    @media (min-width: 600px)
        .__header
            margin-bottom 0px !important
            ._box--avatar
                max-width 168px
            ._avatar
                min-width 132px
                min-height 134px
</style>
