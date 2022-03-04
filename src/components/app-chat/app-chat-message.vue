<template>
    <div>
        <app-chat-file-message v-if="item.checkType('file')"
                               :file="item.image"></app-chat-file-message>
        <app-chat-text-message v-else
                               :message="item.message"></app-chat-text-message>
    </div>
</template>

<script>
  import MessageClass from '../../models/chat/MessageClass'
  import PostClass from '../../models/chat/PostClass'
  import AppChatTextMessage from './app-chat-text-message'
  import AppChatFileMessage from './app-chat-file-message'

  export default {
    name: 'app-chat-message',
    components: {AppChatFileMessage, AppChatTextMessage},
    props: {
      item: {
        type: [MessageClass, PostClass],
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
