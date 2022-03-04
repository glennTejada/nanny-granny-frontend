<template>
    <v-card flat class="_card-recently-nanny pa-3">
        <label class="_card-recently-nanny--label"
               @click="view('nanny')">
            <div class="_card-recently-nanny--avatar ma-auto">
                <app-avatar :src="item.getAvatarUrl()"></app-avatar>
            </div>
            <v-card-text class="_card-recently-nanny--text text-xs-center">
                <h3 class="primary--text">{{item.first_name}}</h3>
                <p>{{item.postcode.location | capitalize}} | Age {{item.date_birthday | age}}</p>
                <v-rating v-model="item.rating"
                          class="d-inline-block app-rating"
                          :size="$vuetify.breakpoint.xsOnly ? 18 : 24"
                          dense
                          background-color="success"
                          color="success"
                          readonly></v-rating>
            </v-card-text>
        </label>
    </v-card>
</template>

<script>
  import Nanny from '@/models/user/NannyClass'
  import ViewProfileMixin from '@/mixins/view-profile'
  import AppAvatar from '../app-avatar'

  export default {
    name: 'app-card-recently-nanny',
    mixins: [ViewProfileMixin],
    components: {AppAvatar},
    props: {
      item: Nanny
    }
  }
</script>

<style lang="stylus" scoped>
    ._card-recently-nanny
        min-width 200px
        max-width 200px
        @media (min-width 600px)
            min-width 250px
            max-width 250px
        &--label
            cursor pointer
        &--avatar
            width 108px
            @media (min-width 600px)
                width 134px
        &--text
            padding 28px 0 !important
</style>
