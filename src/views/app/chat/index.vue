<template>
    <v-layout v-if="room"
              _chat-layout
              column>
        <v-flex>
            <app-name-page v-if="room.is_group"
                           hide-divider
                           name="Group chat">
                <h3 class="primary--text py-3" style="max-height: 50px">
                    <app-svg-icon name="brand/NG_GROUP" class="mr-1"></app-svg-icon>
                    {{room.getInterLocutorName($auth.user().id)}}
                </h3>
            </app-name-page>
            <app-name-page v-else
                           :name="`Conversation with ${room.getInterLocutorName($auth.user().id)}`"/>
        </v-flex>
        <v-flex>
            <v-container fill-height grid-list-xl w--max--800>
                <v-layout column text-xs-center>
                    <v-flex my-3>
                        <h2>Write a{{room.is_group ? ' group ' : ' '}}message</h2>
                        <app-chat-input-message input-type="textarea"
                                                v-model="content"
                                                ref="inputMessage"
                                                :loading="loadingMsg"
                                                v-validate="'required'"
                                                :error-messages="errors.first('message')"
                                                data-vv-name="message"
                                                @submit="submitMessage"/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <v-flex class="mb-5">
            <v-container v-if="messages.length > 0"
                         fill-height
                         grid-list-xl
                         w--max--800>
                <v-layout column>
                    <v-flex tag="h2"
                            class="text-xs-center mb-5">Previous messages</v-flex>
                    <v-flex>
                        <chat-messages :messages="messages"></chat-messages>
                    </v-flex>
                    <v-flex v-if="pagination.last_page > 1 &&  pagination.current_page < pagination.last_page"
                            class="text-xs-center my-5">
                        <v-btn class="primary elevation-0 my-5 px-4"
                               :loading="loading"
                               @click="loadMore">Load more</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <v-flex v-if="this.$auth.check(['parent'])">
            <app-card-interview-form username="Anne"></app-card-interview-form>
        </v-flex>
        <!--BACKGROUND ELEMENTS-->
        <v-flex class="_chat-layout--bg-elements">
            <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                          name="brand/NG_ACTIVITIES"
                          color="var(--yellow)"
                          class="svg-icon--activities"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-18"
                          color="var(--blue_medium) none"
                          class="svg-icon--pattern-18"></app-svg-icon>
            <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                          name="patterns/NG_Pattern-16"
                          color="none var(--green)"
                          class="svg-icon--pattern-16"></app-svg-icon>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppNamePage from '../../../components/app-name-page'
  import AppChatInputMessage from '../../../components/app-chat/app-chat-input-message'
  import ChatMessages from './chat-messages'
  import AppCardInterviewForm from '../../../components/app-card/app-card-interview-form'
  const DEF_PER_PAGE = 25
  const DEF_TIMER = 5000
  export default {
    name: 'chat',
    components: {AppCardInterviewForm, ChatMessages, AppChatInputMessage, AppNamePage},
    props: {
      roomId: null
    },
    data () {
      return {
        currentPage: 1,
        loadingMsg: false,
        content: null,
        room: null,
        timer: null
      }
    },
    computed: {
      messages () {
        return this.$store.getters['chat/messages']
      },
      pagination () {
        return this.$store.getters['chat/pagination']
      },
      loading () {
        return this.$store.getters['chat/loading']
      }
    },

    mounted () {
      this.$store.dispatch('chat/GET_ROOM_BY_ID', this.roomId)
        .then((room) => (this.room = room))
      this.$store.dispatch('chat/GET_MESSAGES', {
        type: {
          id: this.roomId,
          name: 'chat'
        },
        params: {per_page: DEF_PER_PAGE}
      })
    },

    created () {
      const _this = this
      this.timer = setTimeout(function _msg () {
        if (_this.$auth.check()) {
          _this.getNewestMessages()
          _this.$store.dispatch('inbox/SET_READ_FOR_MESSAGES', _this.roomId)
            .then(() => {
              _this.$store.dispatch('notifications/FETCH', _this.$auth.user().role)
            })
          _this.timer = setTimeout(_msg, DEF_TIMER)
        }
      }, DEF_TIMER)
      if (this.$auth.check()) {
        this.$store.dispatch('inbox/SET_READ_FOR_MESSAGES', this.roomId)
          .then(() => {
            this.$store.dispatch('notifications/FETCH', this.$auth.user().role)
          })
      }
    },

    beforeDestroy () {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.$store.commit('chat/RESET')
    },

    methods: {
      submitMessage (message) {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.loadingMsg = true
            let _data = new FormData()
            _data.append('parent_id', 0)
            if (message.type === 'file') {
              _data.append('file', message.val)
            } else {
              _data.append('message', message.val)
            }
            this.$store.dispatch('chat/SEND_MESSAGE', {type: {id: this.roomId, name: 'chat'}, data: _data})
              .then(() => {
                this.content = null
                this.$refs.inputMessage.content = null
              })
              .finally(() => (this.loadingMsg = false))
          }
        })
      },
      getNewestMessages () {
        this.$store.dispatch('chat/GET_NEWEST_MESSAGES', {
          type: {
            id: this.roomId,
            name: 'chat'
          },
          params: {per_page: DEF_PER_PAGE}
        })
      },
      loadMore () {
        this.currentPage++
        this.$store.dispatch('chat/GET_MESSAGES', {
          type: {name: 'chat', id: this.roomId},
          params: {per_page: DEF_PER_PAGE, page: this.currentPage},
          loadMore: true
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._chat-layout
        position relative
        overflow hidden
        &--bg-elements
            .svg-icon
                position absolute
                &--activities
                    width 125px
                    height 91px
                    top 180px
                    left 10%
                    transform rotate(-18deg)
                &--pattern-16
                    width 126px
                    height 110px
                    top 800px
                    left -42px
                    transform rotate(60deg)
                &--pattern-18
                    width 126px
                    height 116px
                    top 90px
                    right -50px
                    @media (min-width 960px)
                        width 186px
                        top 530px
                        right -100px
                    @media (min-width 1170px)
                        right -50px
</style>
