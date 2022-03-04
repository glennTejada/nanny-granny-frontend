<template>
    <span @click="onEmojiClick">{{emoji.value}}</span>
</template>

<script>
  export default {
    name: 'app-chat-emoji',
    data () {
      return {}
    },
    props: {
      emoji: ''
    },
    methods: {
      onEmojiClick () {
        this.$emit('click', this.emoji)
      }
    }
  }
</script>
