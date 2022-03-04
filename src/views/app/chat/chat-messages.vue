<template>
    <v-layout column>
        <transition-group name="fade-transition" tag="div">
            <v-flex v-for="(m) in messages"
                    :key="`message_${m.id}`"
                    class="transition-item _message"
                    :class="{
                        sent: m.user.id === $auth.user().id,
                        received: m.user.id !== $auth.user().id
                    }">
                <v-card flat
                        color="transparent">
                    <v-card-text class="pa-0 _message--card">
                        <div class="_message--content d-flex">
                            <div class="_message--avatar">
                                <app-avatar v-if="m.user.role === 'parent'"
                                            :initials="m.user.initials()"></app-avatar>
                                <app-avatar v-else :src="m.user.getAvatarUrl()"></app-avatar>
                            </div>
                            <div class="_message--text font--light">
                                <app-chat-message :item="m"></app-chat-message>
                            </div>
                        </div>
                        <div class="_message--date">
                            {{m.created_at | timeAgo | capitalize}}
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </transition-group>
    </v-layout>
</template>

<script>
  import AppAvatar from '../../../components/app-avatar'
  import AppChatMessage from '../../../components/app-chat/app-chat-message'
  export default {
    name: 'chat-messages',
    components: {AppChatMessage, AppAvatar},
    props: {
      messages: Array
    }
  }
</script>

<style lang="stylus" scoped>
    ._message
        &--content
            align-items center
        &--avatar
            min-width 31px
            max-width 31px
            height 31px
            @media (min-width 600px)
                min-width 51px
                max-width 51px
                height 51px
        &--text
            padding 24px
            color var(--charcoal)
            line-height 1.71
            position relative
            &:before
                content ''
                display block
                width 16px
                height 16px
                position absolute
                top calc(50% - 8px)
                transform rotate(45deg)
        &--date
            color var(--grey_1)
            line-height 1.43
        &.sent
            ._message
                &--content
                    flex-direction row-reverse
                    padding-left 47px
                    @media (min-width 600px)
                        padding-left 81px
                &--avatar
                    margin-left 16px
                    @media (min-width 600px)
                        margin-left 30px
                &--text
                    background-color var(--sand)
                    &:before
                        right -8px
                        background-color var(--sand)
                &--date
                    padding 12px 48px 12px 0
                    text-align right
                    @media (min-width 600px)
                        padding 12px 81px 12px 0
        &.received
            ._message
                &--content
                    padding-right 47px
                    @media (min-width 600px)
                        padding-right 81px
                &--text
                    background-color var(--white)
                    border 1px solid var(--grey_2)
                    &:before
                        left -8px
                        border 1px solid
                        background-color #fff
                        border-color transparent transparent var(--grey_2) var(--grey_2)
                &--avatar
                    margin-right 16px
                    @media (min-width 600px)
                        margin-right 30px
                &--date
                    padding 12px 0 12px 48px
                    @media (min-width 600px)
                        padding 12px 0 12px 81px
    .transition-item
        transition all .2s
</style>
