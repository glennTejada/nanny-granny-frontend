<template>
    <v-btn :flat="flat"
           :block="block"
           class="_btn-room"
           @click="goToRoom"
           :ripple="false">
        <slot></slot>
    </v-btn>
</template>

<script>
  export default {
    name: 'app-btn-chat-room',
    props: {
      flat: Boolean,
      block: Boolean,
      userIds: {
        type: Array,
        required: true
      }
    },
    methods: {
      goToRoom () {
        if (this.$auth.check()) {
          this.$store.dispatch('chat/GET_ROOM', {user_ids: this.userIds})
            .then(res => {
              this.$router.push(`/chat/${res.data.id}`)
            })
        } else {
          this.$router.push('/login')
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._btn-room
        height auto !important
        padding 0
        font-size inherit
        color inherit
        margin 0
        &:before
            content none
</style>
