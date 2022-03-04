<template>
    <div v-text="message"
         style="white-space: pre-wrap"></div>
</template>

<script>
  export default {
    name: 'app-chat-text-message',
    props: {
      message: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
