<template>
    <div v-if="meetUp"
         class="fill-height d-flex align-center">
        <v-container>
            <v-scroll-x-transition mode="out-in">
                <v-layout :key="`card_meet_${meetUp.id}`" column>
                    <v-flex class="mb-4">
                        <router-link :to="`/clubhouse/club/${meetUp.club.id}`"
                                     class="club-link d-inline-block">
                            <h3>{{meetUp.club.name | capitalize}}</h3>
                        </router-link>
                        <app-btn-favourite name="club"
                                           size="12px"
                                           style="margin: -8px 6px 0"
                                           border
                                           :item="meetUp.club"></app-btn-favourite>
                    </v-flex>
                    <v-flex v-if="canCreate"
                            class="mb-3">
                        <div>{{meetUp.date_event | formatDate('MMM Do, hh:mm a')}}</div>
                        <div>{{meetUp.place.address_name}}</div>
                    </v-flex>
                    <v-flex class="text--grey_1 d-flex">
                        <div>
                            <div>{{meetUp.count_members}} members are going</div>
                            <div>Hosted by: {{meetUp.club.user.fullName()}}</div>
                        </div>
                        <v-btn v-if="canCreate"
                               @click="joinMeetUp"
                               class="primary elevation-0">{{meetUp.is_favorite ? 'Leave this meet-up' : 'Join this meet-up'}}</v-btn>
                    </v-flex>
                </v-layout>
            </v-scroll-x-transition>
        </v-container>
    </div>
    <div v-else>
        <h3 class="text--grey_1 my-5 text-xs-center">Nothing is here yet</h3>
    </div>
</template>

<script>
  import AppBtnFavourite from '../../../../../components/app-buttons/app-btn-favourite'

  export default {
    name: 'clubhouse-club-meet-up-upcoming',
    components: {AppBtnFavourite},
    computed: {
      meetUp () {
        return this.$store.getters['clubhouse/meetUp/selected']
      },
      canCreate () {
        return this.meetUp.club.is_favorite || (this.meetUp.club.user_from_id === this.$auth.user().id)
      }
    },
    methods: {
      joinMeetUp () {
        this.meetUp.is_favorite = !this.meetUp.is_favorite
        this.$store.dispatch(`favourites/FAVOURITES_${this.meetUp.is_favorite ? 'ADD' : 'DELETE'}`, {
          type: 'meetup',
          id: this.meetUp.id
        }).then((res) => {
          if (this.meetUp.is_favorite) {
            this.meetUp.count_members++
          } else {
            this.meetUp.count_members--
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .club-link
        text-decoration none
</style>
