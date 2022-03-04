<template>
    <v-card flat class="_card-recently-job pa-3">
        <label class="_card-recently-job--label d-block border border--grey_2 pa-3"
               @click="view('job')">
            <v-card-text class="_card-recently-job--text">
                <h3 class="mb-2 primary--text text-truncate">{{item.name | capitalize}}</h3>
                <h4 class="mb-3 text-capitalize text-truncate">{{item.postcode.location | capitalize}}</h4>
                <div class="text-small">Start: {{item.date_start | formatDate('DD MMM')}}</div>
                <div class="text-small">Applications Close: {{item.date_close | formatDate('DD MMM')}}</div>
            </v-card-text>
        </label>
    </v-card>
</template>

<script>
  import Job from '@/models/JobClass'
  import ViewProfileMixin from '@/mixins/view-profile'
  import AppAvatar from '../app-avatar'

  export default {
    name: 'app-card-recently-job',
    mixins: [ViewProfileMixin],
    components: {AppAvatar},
    props: {
      item: Job
    }
  }
</script>

<style lang="stylus" scoped>
    ._card-recently-job
        min-width 260px
        max-width 260px
        background transparent !important
        @media (min-width 600px)
            min-width 320px
            max-width 320px
        &--label
            background-color #fff
            cursor pointer
</style>

