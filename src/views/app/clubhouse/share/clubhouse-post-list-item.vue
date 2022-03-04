<template>
    <v-card _post-card
            flat
            color="transparent">
        <v-card-text class="d-flex pa-0">
            <div class="_post-card--avatar mr-3">
                <app-avatar :src="item.user.getAvatarUrl()"
                            :color="colorMaskAvatar"></app-avatar>
            </div>
            <div class="text-small">
                <div v-line-clamp:20="4" class="text--charcoal">
                    <slot name="message"
                          :item="item">
                        {{item.message}}
                    </slot>
                </div>
                <div class="d-inline-flex align-center text--grey_1 mt-4">
                    <div v-if="!hideConnect" class="d-inline-flex align-center">
                        <span class="icon-NG_CONNECT mr-1"
                              :style="{
                                color: $vuetify.theme.grey1,
                                fontSize: '20px',
                                lineHeight: '14px'
                              }"></span>
                        <app-btn-user-connect :item="item.user"></app-btn-user-connect>
                        <span class="mx-1">|</span>
                    </div>
                    {{item.created_at | timeAgo}}
                    <div v-if="!hideCountMessage"
                         class="d-inline-flex align-center">
                        <span class="mx-1">|</span>
                        <span class="icon-NG_CONTACT mr-1"
                              :style="{
                                color: $vuetify.theme.primary,
                                fontSize: '16px',
                                lineHeight: '14px'
                              }"></span>
                        {{item.count_reply}}
                    </div>
                </div>
                <div v-if="!hideClub"
                     class="text--grey_1"
                     :class="{'d-inline-block': hideConnect}">
                    <span v-if="hideConnect" class="mx-1">|</span>in
                    <router-link :to="`/clubhouse/club/${(item.club || {}).id}`"
                                 tag="a"
                                 class="text-small">{{(item.club || {}).name}}
                    </router-link>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
  import Post from '@/models/chat/PostClass'
  import AppAvatar from '../../../../components/app-avatar'
  import AppBtnUserConnect from '../../../../components/app-buttons/app-btn-user-connect'

  export default {
    name: 'clubhouse-post-list-item',
    components: {AppBtnUserConnect, AppAvatar},
    props: {
      item: {
        type: Post,
        required: true
      },
      colorMaskAvatar: {
        type: String,
        default: '#fff'
      },
      hideCountMessage: Boolean,
      hideConnect: Boolean,
      hideClub: Boolean
    }
  }
</script>

<style lang="stylus" scoped>
    ._post-card
        &--avatar
            max-width 31px
            min-width 31px
            height 31px
            @media (min-width 600px)
                max-width 51px
                min-width 51px
                height 51px
</style>
