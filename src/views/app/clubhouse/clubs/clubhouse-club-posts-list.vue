<template>
    <v-layout _post-list-container column>
        <transition-group name="fade-transition">
            <v-flex v-for="post in items"
                    :key="`post_${post.id}`"
                    class="post-item">
                <v-layout column>
                    <!--Post-->
                    <v-flex class="mb-4">
                        <clubhouse-post-list-item :item="post"
                                                  hide-club>
                            <template slot="message"
                                      slot-scope="{item}">
                                <p class="font--medium ma-0">
                                    <app-chat-message :item="item"></app-chat-message>
                                </p>
                            </template>
                        </clubhouse-post-list-item>
                    </v-flex>
                    <!--Reply-->
                    <v-flex v-for="reply in post.replies"
                            :key="`reply_${reply.id}`"
                            class="post-reply">
                        <clubhouse-post-list-item :item="reply"
                                                  hide-count-message
                                                  hide-club></clubhouse-post-list-item>
                    </v-flex>

                    <v-flex v-if="post.count_reply > 2 && post.replies.length < post.count_reply"
                            class="post-reply text-xs-center">
                        <a class="text-small"
                               @click="loadMore(post)">
                            <v-progress-circular v-if="loadingReply"
                                                 :size="16"
                                                 indeterminate
                                                 :width="2"
                                                 color="primary"></v-progress-circular>
                            <span v-else>View all</span>
                        </a>
                    </v-flex>

                    <v-flex v-if="showReply"
                            class="post-reply input-reply d-flex align-start">
                        <div class="reply-avatar">
                            <app-avatar :src="$auth.user().getAvatarUrl()"></app-avatar>
                        </div>
                        <app-chat-input-message label="Reply"
                                                small
                                                auto-reset
                                                @submit="submitMessage(post, $event)"></app-chat-input-message>
                    </v-flex>
                </v-layout>
            </v-flex>
        </transition-group>
    </v-layout>
</template>

<script>
  import ClubhousePostListItem from '../share/clubhouse-post-list-item'
  import AppAvatar from '../../../../components/app-avatar'
  import AppChatInputMessage from '../../../../components/app-chat/app-chat-input-message'
  import ClubhousePostReplyItem from '../share/clubhouse-post-reply-item'
  import AppChatMessage from '../../../../components/app-chat/app-chat-message'

  const DEF_PER_PAGE = 100

  export default {
    name: 'clubhouse-club-posts-list',
    components: {AppChatMessage, ClubhousePostReplyItem, AppChatInputMessage, AppAvatar, ClubhousePostListItem},
    props: {
      items: {
        type: Array,
        required: true
      },
      showReply: Boolean
    },
    data () {
      return {
        loadingReply: false
      }
    },
    methods: {
      loadMore (post) {
        this.loadingReply = true
        this.$store.dispatch('chat/GET_REPLIES', {
          roomId: post.chat_room_id,
          parentId: post.id,
          params: {per_page: DEF_PER_PAGE}
        })
          .finally(() => (this.loadingReply = false))
      },
      submitMessage (item, message) {
        if (!message.val) return
        let _data = new FormData()
        _data.append('parent_id', item.id)
        if (message.type === 'file') {
          _data.append('file', message.val)
        } else {
          _data.append('message', message.val)
        }
        this.$store.dispatch('chat/SEND_MESSAGE', {type: {id: item.chat_room_id, name: 'club'}, data: _data})
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._post-list-container
        .post-item
            transition all .3s
            border-bottom 1px solid var(--grey_2)
            padding-top 50px !important
            padding-bottom 50px !important
            &:last-child
                border-bottom none
            .post-reply
                margin-left 46px
                @media (min-width 600px)
                    margin-left 66px
            .input-reply
                margin-left 58px
                @media (min-width 600px)
                    margin-left 78px
                .reply-avatar
                    padding 10px 12px 0 0
                    min-width 44px
                    max-width 44px
                    height 44px
                    @media (min-width 600px)
                        min-width 50px
                        max-width 50px
                        height 50px
</style>
