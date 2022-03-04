<template>
    <v-layout _create-layout column
              style="padding-bottom: 100px">
        <!--Header-->
        <v-flex>
            <app-name-page name="Create a new message"></app-name-page>
        </v-flex>
        <!--Content-->
        <v-flex>
            <v-container grid-list-xl w--max--750>
                <v-layout row
                          wrap
                          style="z-index: 10; position: relative">
                    <v-flex xs12 sm9>
                        <v-autocomplete label="Send to"
                                        placeholder="Type connection's name"
                                        v-model="select"
                                        :search-input.sync="search"
                                        :loading="loading"
                                        :items="contacts"
                                        height="48"
                                        :append-icon="null"
                                        item-text="first_name"
                                        cache-items
                                        return-object
                                        v-validate="'required'"
                                        :error-messages="errors.first('name')"
                                        data-vv-name="name"
                                        outline></v-autocomplete>
                    </v-flex>
                    <v-flex xs12 sm3>
                        <router-link to="/connections"
                                     class="text-small d-inline-block"
                                     :class="{'mt-5': $vuetify.breakpoint.smAndUp}">
                            View my connections
                        </router-link>
                    </v-flex>
                    <v-flex xs12 text-xs-center>
                        <app-chat-input-message label="Enter message"
                                                input-type="textarea"
                                                v-model="form.message"
                                                v-validate="'required'"
                                                :error-messages="errors.first('message')"
                                                data-vv-name="message"
                                                :loading="loadingMsg"
                                                @submit="submitMessage"></app-chat-input-message>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <!--BACKGROUND ELEMENTS-->
        <v-flex class="_create-layout--bg-elements">
            <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                          name="brand/NG_CONTACT"
                          color="var(--orange)"
                          class="svg-icon--contact"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-06"
                          color="none var(--yellow)"
                          class="svg-icon--pattern-06"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-18"
                          color="var(--blue_medium) none"
                          class="svg-icon--pattern-18"></app-svg-icon>
            <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                          name="brand/NG_HOMEWORK_SUPPORT"
                          color="var(--blue)"
                          class="svg-icon--homework"></app-svg-icon>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppNamePage from '../../../components/app-name-page'
  import AppChatInputMessage from '../../../components/app-chat/app-chat-input-message'

  export default {
    name: 'chat-message-create',

    components: {AppChatInputMessage, AppNamePage},

    data () {
      return {
        loading: false,
        loadingMsg: false,
        select: null,
        search: null,
        contacts: [],
        form: {
          user_ids: [],
          message: null
        }
      }
    },

    watch: {
      select (user) {
        if (user) {
          this.form.user_ids = [user.id]
        }
      },
      search (val) {
        this.loading = false
        val && val !== (this.select || {}).first_name && this.debouncedQueryConnections(val)
      }
    },

    created () {
      this.debouncedQueryConnections = this.$lodash.debounce(this.queryConnections, 500)
    },

    methods: {
      queryConnections (val) {
        this.loading = true
        this.$store.dispatch('user/connect/FIND', {name: val})
          .then(users => (this.contacts = users))
          .finally(() => (this.loading = false))
      },
      submitMessage (message) {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.loadingMsg = true
            this.$store.dispatch('chat/GET_ROOM', {user_ids: this.form.user_ids})
              .then(res => {
                const _roomId = res.data.id
                let _data = new FormData()
                _data.append('parent_id', 0)
                if (message.type === 'file') {
                  _data.append('file', message.val)
                } else {
                  _data.append('message', message.val)
                }
                this.$store.dispatch('chat/SEND_MESSAGE', {type: {id: _roomId, name: 'chat'}, data: _data})
                  .then(() => {
                    this.$router.push(`/chat/${_roomId}`)
                  })
              }).finally(() => (this.loadingMsg = false))
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._create-layout
        position relative
        overflow hidden
        &--bg-elements
            .svg-icon
                position absolute
                &--contact
                    width 90px
                    height 90px
                    top 270px
                    left 7%
                    transform rotate(-20deg)
                &--pattern-06
                    width 130px
                    height 120px
                    top 100px
                    right -40px
                    z-index 5
                    @media (min-width 600px)
                        width 200px
                        height 200px
                        top -57px
                        right 6%
                &--pattern-18
                    width 150px
                    height 80px
                    bottom 10px
                    left -50px
                    @media (min-width 600px)
                        width 210px
                        height 110px
                        bottom 100px
                        left -50px
                &--homework
                    width 60px
                    height 60px
                    top 520px
                    right 10%
                    transform rotate(10deg)
</style>
