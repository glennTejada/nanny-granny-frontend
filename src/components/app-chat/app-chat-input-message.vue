<template>
    <v-layout row wrap>
        <v-flex class="p-relative xs12">
            <!--Input-->
            <v-text-field v-if="inputType === 'input'"
                          :label="label"
                          v-model="content"
                          @keydown.enter="handleSubmitText"
                          :class="{'v-text-field--small': small}"
                          :error-messages="errorMessages"
                          solo>
                <template slot="append" class="mt-0">
                    <div class="append-tools">
                        <app-chat-emoji-picker class="emoji-picker"
                                               @click="addMessage"></app-chat-emoji-picker>
                        <!--<app-chat-file-picker :on-change="handleFileSubmit"></app-chat-file-picker>-->
                      
                    </div>
                </template>
            </v-text-field>
            <!--Textarea-->
            <div v-if="inputType === 'textarea'">
                <v-textarea v-model="content"
                            :label="label"
                            :error-messages="errorMessages"
                            class="p-relative"
                            auto-grow
                            :rows="$vuetify.breakpoint.xsOnly ? '5':'8'"
                            @keydown.ctrl.enter="handleSubmitText"
                            outline>
                    <template slot="append" class="mt-0">
                        <div class="append-tools append-tools--textarea">
                            <app-chat-emoji-picker class="emoji-picker"
                                                   @click="addMessage"></app-chat-emoji-picker>
                            <!--<app-chat-file-picker :on-change="handleFileSubmit"></app-chat-file-picker>-->
                        </div>
                    </template>
                </v-textarea>
            </div>
        </v-flex>
        <v-flex v-if="inputType === 'textarea'" xs12>
            <v-btn class="primary elevation-0 px-5"
                   :loading="loading"
                   :class="{'my-4': $vuetify.breakpoint.smAndUp}"
                   :block="$vuetify.breakpoint.xsOnly"
                   @click="handleSubmitText">Send
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppChatEmojiPicker from './app-chat-emoji-picker'
  import AppChatFilePicker from './app-chat-file-picker'

  export default {
    name: 'app-chat-input-message',
    components: {AppChatFilePicker, AppChatEmojiPicker},
    $_veeValidate: {
      value () {
        return this.content
      },
      name () {
        return this.name
      }
    },
    props: {
      name: String,
      errorMessages: null,
      label: {
        type: String
      },
      inputType: {
        type: String,
        default: 'input',
        validator: type => ['input', 'textarea'].includes(type)
      },
      small: Boolean,
      loading: Boolean,
      autoReset: Boolean
    },
    data () {
      return {
        emojiPanel: false,
        inputActive: true,
        content: this.value || ''
      }
    },
    methods: {
      addMessage (emoji) {
        if (!this.content) {
          this.content = ''
        }
        this.content += emoji.value
      },
      handleSubmitText () {
        this.$emit('input', this.content)
        this.$emit('submit', {type: 'text', val: this.content})
        if (this.autoReset) {
          this.content = null
        }
      },
      handleFileSubmit (file) {
        this.$emit('input', file)
        this.$emit('submit', {type: 'file', val: file})
        if (this.autoReset) {
          this.content = null
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .v-text-field--small
        font-size 1rem
    .append-tools
        margin-top -11px
        display flex

        &.append-tools--textarea
            position absolute
            bottom 16px
            right 12px
</style>
