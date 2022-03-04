<template>
    <app-chat-input-message :submitText="handleSubmitText"></app-chat-input-message>
</template>

<script>
  import AppChatInputMessage from '../../../../components/app-chat/app-chat-input-message'
  export default {
    name: 'clubhouse-post-reply-item',
    components: {AppChatInputMessage},
    props: {
      postId: {
        type: Number,
        required: true
      }
    },
    methods: {
      handleSubmitText (val) {
        this.$emit('submit-text', {postId: this.postId, message: val})
      }
    }
  }
</script>

<style scoped>

</style>
