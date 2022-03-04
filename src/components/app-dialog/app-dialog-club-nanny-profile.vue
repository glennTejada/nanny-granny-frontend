<template>
    <v-layout _card-profile
              column
              :style="{backgroundColor: $vuetify.theme.sand}">
        <!--Header-->
        <v-flex class="_header xs12 p-relative overflow-hidden"
                :style="{backgroundColor: (item.theme_body || {}).bgColor}">
            <v-container fill-height
                         grid-list-xl>
                <v-layout row wrap>
                    <v-flex :class="{'text--white': (item.theme_body.bgColor === '#039e8b' || item.theme_body.bgColor === '#4d4dff')}">
                        <v-layout row
                                  align-center
                                  layout--header>
                            <v-flex class="_flex-avatar">
                                <app-avatar :src="item.getAvatarUrl()"
                                            :color="(item.theme_body || {}).bgColor"></app-avatar>
                            </v-flex>
                            <v-flex>
                                <h2 class="primary--text">{{item.first_name | capitalize}}</h2>
                                <h4 class="">
                                    <span class="text-capitalize d-inline-block mt-1">{{item.postcode.location | capitalize}}</span>
                                    | Age {{item.date_birthday | age}}
                                </h4>
                                <p class="text-small text--grey_1 mt-2">
                                    Member since {{item.created_at | formatDate('MMM YYYY')}}
                                </p>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex v-if="$auth.user().id !== item.id"
                            class="_card-profile--actions">
                        <v-btn class="primary elevation-0"
                               :loading="loading"
                               @click="connect"
                               block>
                            <app-svg-icon name="brand/NG_CONNECT"
                                          width="28"
                                          height="18"
                                          class="mr-2"></app-svg-icon>
                            Connect
                        </v-btn>
                        <app-btn-chat-room :user-ids="[item.id]"
                                           block
                                           class="elevation-0 primary mt-3 _btn-chat-room">
                            <app-svg-icon name="brand/NG_CONTACT"
                                          width="24"
                                          height="18"
                                          class="mr-2"></app-svg-icon>
                            Send a message
                        </app-btn-chat-room>
                    </v-flex>
                </v-layout>
            </v-container>
            <app-svg-icon class="_pattern _pattern--profile"
                          preserveAspectRatio="xMinYMin meet"
                          :name="`themes/profile/NG_BG-0${(item.theme_body || {}).pattern}`"
                          :color="`${(item.theme_body || {}).borderColor} url(#svgicon_themes_profile_NG_BG-0${(item.theme_body || {}).pattern}_a)`"
                          :original="true"></app-svg-icon>
        </v-flex>
        <!--Body-->
        <v-flex>
            <v-container grid-list-xl>
                <v-layout column>
                    <v-flex v-if="item.skills()">
                        <h3>My Interests</h3>
                        <p class="mb-0 text-small text--charcoal mt-2">{{item.skills()}}</p>
                    </v-flex>
                    <v-flex tag="h3"
                            class="mt-5">{{item.first_name}}'s club
                    </v-flex>
                    <v-flex v-for="club in clubs"
                            :key="`club_${club.id}`">
                        <clubhouse-club-list-item :item="club" :color="$vuetify.theme.sand"></clubhouse-club-list-item>
                    </v-flex>
                    <v-flex tag="h3"
                            class="mt-5">{{item.first_name}}'s recent posts
                    </v-flex>
                    <v-flex v-for="post in posts"
                            :key="`post-${post.id}`" class="xs12 sm4">
                        <clubhouse-post-list-item :item="post"
                                                  colorMaskAvatar="var(--sand)"
                                                  hide-connect></clubhouse-post-list-item>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
  import Nanny from '@/models/user/NannyClass'
  import AppAvatar from '../app-avatar'
  import ClubhouseClubListItem from '../../views/app/clubhouse/share/clubhouse-club-list-item'
  import ClubhousePostListItem from '../../views/app/clubhouse/share/clubhouse-post-list-item'
  import AppBtnChatRoom from '../app-buttons/app-btn-chat-room'

  export default {
    name: 'app-dialog-club-nanny-profile',

    components: {AppBtnChatRoom, ClubhousePostListItem, ClubhouseClubListItem, AppAvatar},

    props: {
      rawData: {
        type: Nanny,
        required: true
      }
    },

    data () {
      return {
        item: this.rawData,
        posts: [],
        clubs: []
      }
    },

    computed: {
      loading () {
        return this.$store.getters['user/connect/loading']
      }
    },

    mounted () {
      this.$store.dispatch('clubhouse/clubs/user/FETCH', {
        userId: this.item.id,
        global: false
      }).then(data => (this.clubs = data))
      this.$store.dispatch('clubhouse/clubs/posts/GET_BY_USER', {
        userId: this.item.id,
        global: false,
        params: {per_page: 2}
      }).then(data => (this.posts = data))
    },

    methods: {
      connect () {
        this.$store.dispatch('user/connect/CONNECT_REQUEST', {user_id: this.item.id})
            .then(() => {
              this.showSnackBar('The request has been sent.', 'success')
            })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._card-profile
        > .flex
            padding 40px 0
            @media (min-width 600px)
                padding 40px
        ._header
            min-height 334px
        ._flex-avatar
            min-width 122px
            max-width 122px
            @media (min-width 600px)
                min-width 158px
                max-width 158px
        ._btn-chat-room
            height 48px !important
            font-size 1.167em !important
            @media (min-width 600px)
                font-size 1.286em !important
        ._pattern
            position absolute
            display block
            left 0
            right 0
            width 100%
            height 100%
            z-index 10
            &--profile
                bottom -50px
                height 110px
                @media (min-width 600px)
                    height 160px
                    bottom -74px
        &--actions
            @media (max-width 599px)
                margin-bottom 40px
</style>
