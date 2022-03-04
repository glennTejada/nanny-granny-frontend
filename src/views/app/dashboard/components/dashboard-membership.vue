<template>
    <v-layout>
        <v-flex class="_membership">
            <v-card class="border border--grey_2" flat>
                <v-card-title class="border--bottom border--grey_2">
                    <h3>My membership details</h3>
                    <v-spacer></v-spacer>
                    <router-link tag="a"
                                 to="/subscription"
                                 class="link-small">Extend subscription</router-link>
                </v-card-title>
                <v-card-text class="d-flex text-xs-center justify-space-between">
                    <div>
                        <div class="font--medium">Status</div>
                        <div v-if="subscription">{{subscription.active ? 'Active' : 'Inactive'}}</div>
                    </div>
                    <div>
                        <div class="font--medium">Expires</div>
                        <div v-if="subscription">{{subscription.ends_at.date | formatDate}}</div>
                    </div>
                    <div>
                        <div class="font--medium">Subscription</div>
                        <div v-if="subscription">{{$auth.user().plan().invoice_period}} Month</div>
                    </div>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'dashboard-membership',

    computed: {
      subscription () {
        return this.$auth.user().subscription
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._membership
        margin-top 30px
        .v-card__title
            padding 20px
        .v-card__text
            padding 26px
            > div
                max-width 100px
</style>
