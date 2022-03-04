<template>
    <v-menu bottom
            left
            max-height="166"
            max-width="314"
            offset-y
            nudge-bottom="13"
            nudge-right="42"
            transition="slide-y-transition"
            content-class="emoji-container elevation-4"
            lazy>
        <v-btn icon
               slot="activator"
               :ripple="false"
               class="blue--text emoji-panel mr-2 text--grey_1">
            <app-svg-icon name="ui/NG_SMILE_ICON"
                          width="22"
                          height="22"
                          :original="true"></app-svg-icon>
        </v-btn>
        <div class="emoji-picker">
            <v-card flat class="elevation-3">
                <v-card-text class="pa-0">
                    <div class="emoji-content pa-2">
                        <app-chat-emoji v-for="emoji in emojis"
                                        :key="emoji.key"
                                        :emoji="emoji"
                                        @click="onEmojiClick"></app-chat-emoji>
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </v-menu>
</template>

<script>
  import EmojiApi from '@/api/emoji'
  import AppChatEmoji from './app-chat-emoji'

  export default {
    name: 'app-chat-emoji-picker',
    data () {
      return {
        emojis: []
      }
    },
    props: {
      show: Boolean
    },
    created () {
      EmojiApi.fetch().then(response => {
        this.emojis = response.peoples.people
      })
    },
    methods: {
      onEmojiClick (emoji) {
        this.$emit('click', emoji)
      },
      closePicker () {
        this.$emit('close')
      }
    },
    components: {AppChatEmoji}
  }
</script>

<style lang="stylus" scoped>
    .emoji-panel
        width 24px
        height 24px
        margin 0
        color var(--grey_2)
    .emoji-picker
       span
           cursor pointer
           font-size 24px
    .emoji-container
        border: 1px solid var(--grey_2)
</style>
