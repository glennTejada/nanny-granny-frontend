<template>
    <v-layout v-if="club"
              _clubhouse-clubs
              column>
        <v-flex>
            <!--Header-->
            <clubhouse-club-header>
                <template slot="text">
                    <h1 class="mb-3">{{club.name}}</h1>
                    <div v-if="userOwner || club.is_favorite"
                         class="_clubhouse-club--description align-center text--charcoal">
                        <div class="d-inline-flex align-center">
                            <app-svg-icon name="brand/NG_CONNECT"
                                          :height="$vuetify.breakpoint.xsOnly ? '8': '15'"
                                          :width="$vuetify.breakpoint.xsOnly ? '18': '24'"
                                          class="mr-1"></app-svg-icon>
                            <span>Created by</span>
                            <app-btn-user-connect :item="club.user"></app-btn-user-connect>
                            <span class="mx-2 hidden-xs-only">|</span>
                        </div>
                        <div class="d-inline-flex align-center">
                            <app-svg-icon name="brand/NG_ACCOUNT"
                                          :color="$vuetify.theme.primary"
                                          height="18"
                                          width="18"
                                          class="mr-1"></app-svg-icon>
                            <span>{{club.count_members + 1}}</span>
                            <span class="mx-2">|</span>
                            <app-svg-icon name="brand/NG_CONTACT"
                                          :color="$vuetify.theme.primary"
                                          height="18"
                                          width="18"
                                          class="mr-1"></app-svg-icon>
                            {{club.count_posts}}
                        </div>
                        <div class="latest_post">
                            <span class="mx-2 hidden-xs-only">|</span>
                            <span>Latest post {{club.last_message | timeAgo()}}</span>
                        </div>
                    </div>
                    <p v-else class="text--charcoal">{{club.count_members}} members</p>
                </template>
            </clubhouse-club-header>
        </v-flex>
        <!--Input Message-->
        <v-flex v-if="userOwner || club.is_favorite"
                class="app-bg-sand"
                :class="[$vuetify.breakpoint.xsOnly ? 'pt-4 pb-2':'py-5']">
            <v-container style="max-width: 680px">
                <v-layout column>
                    <v-flex class="d-flex align-start">
                        <app-avatar :src="$auth.user().getAvatarUrl()"
                                    width="51px"
                                    height="51px"
                                    color="var(--sand)"
                                    class="mr-3"></app-avatar>
                        <app-chat-input-message auto-reset
                                                @submit="submitMessage"></app-chat-input-message>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <!--List message-->
        <v-flex class="_clubhouse-clubs--list_container" style="min-height: 200px">
            <v-container grid-list-xl
                         style="max-width: 680px">
                <clubhouse-club-posts-list :items="posts"
                                           :show-reply="userOwner || club.is_favorite"></clubhouse-club-posts-list>

                <div v-if="pagination.last_page > 1 &&  pagination.current_page < pagination.last_page"
                     class="text-xs-center">
                    <v-btn class="primary elevation-0 my-5 px-4"
                           :loading="loading"
                           @click="loadMore()">Load more</v-btn>
                    <app-svg-icon class="d-block mx-auto"
                                  name="brand/NG_DIVIDER"
                                  width="139"
                                  :color="$vuetify.theme.success"></app-svg-icon>
                </div>
            </v-container>
        </v-flex>
        <v-flex>
            <clubhouse-club-meet-up :club-id="club.id"
                                    :owner-club="$auth.user().id === club.user_from_id"></clubhouse-club-meet-up>
        </v-flex>
        <!--Navigation-->
        <v-flex mt-4>
            <clubhouse-navigation hide-pattern
                                  :router-prev="{to: `/clubhouse/club/category/${club.category.id}`}"
                                  latest-article>
                <template slot="router-prev-name">
                    Back to {{club.category.name}}
                </template>
            </clubhouse-navigation>
        </v-flex>
    </v-layout>
</template>

<script>
  import ClubhouseClubHeader from './clubhouse-club-header'
  import ClubhouseClubMeetUp from './meet-up/clubhouse-club-meet-up'
  import ClubhouseNavigation from '../share/clubhouse-navigation'
  import AppChatInputMessage from '../../../../components/app-chat/app-chat-input-message'
  import ClubhouseClubPostsList from './clubhouse-club-posts-list'
  import AppAvatar from '../../../../components/app-avatar'
  import AppBtnUserConnect from '../../../../components/app-buttons/app-btn-user-connect'
  const DEF_PER_PAGE = 10
  export default {
    name: 'clubhouse-club-show',
    components: {AppBtnUserConnect, AppAvatar, ClubhouseClubPostsList, AppChatInputMessage, ClubhouseNavigation, ClubhouseClubMeetUp, ClubhouseClubHeader},
    props: ['clubId'],
    data () {
      return {
        currentPage: 1
      }
    },
    computed: {
      loading () {
        return this.$store.getters['chat/loading']
      },
      posts () {
        return this.$store.getters['chat/messages']
      },
      pagination () {
        return this.$store.getters['chat/pagination']
      },
      club () {
        return this.$store.getters['clubhouse/clubs/club'](this.clubId)
      },
      userOwner () {
        return this.$auth.user().id === this.club.user_from_id
      }
    },
    mounted () {
      if (!this.club) {
        this.$store.dispatch('clubhouse/clubs/FETCH_BY_ID', this.clubId)
      }
      this.$store.dispatch('chat/GET_MESSAGES', {
        type: {name: 'club', id: this.clubId},
        params: {per_page: DEF_PER_PAGE}
      })
    },
    beforeDestroy () {
      this.$store.commit('chat/RESET')
    },
    methods: {
      submitMessage (message) {
        if (!message.val) return
        let _data = new FormData()
        _data.append('parent_id', 0)
        if (message.type === 'file') {
          _data.append('file', message.val)
        } else {
          _data.append('message', message.val)
        }
        this.$store.dispatch('chat/SEND_MESSAGE', {type: {id: this.clubId, name: 'club'}, data: _data})
            .then(() => (this.club.count_posts++))
      },
      loadMore () {
        this.currentPage++
        this.$store.dispatch('chat/GET_MESSAGES', {
          type: {name: 'club', id: this.clubId},
          params: {per_page: DEF_PER_PAGE, page: this.currentPage},
          loadMore: true
        })
      },
      profile () {
        this.$store.commit('dialog/DIALOG_SHOW', {
          show: true,
          component: 'app-dialog-club-nanny-profile',
          data: this.club.user,
          options: {
            maxWidth: 770
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._clubhouse-club--description
        display flex
        font-size 1.2857rem
        justify-content center
        flex-wrap wrap
        .latest_post
            @media (max-width 599px)
                min-width 100%
</style>
