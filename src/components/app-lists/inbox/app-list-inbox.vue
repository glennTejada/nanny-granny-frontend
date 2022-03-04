<template>
    <v-layout row>
        <v-flex xs12>
            <v-card flat>
                <v-list three-line>
                    <template v-for="(item, index) in items">
                        <v-list-tile :key="`chat_${item.id}`"
                                     @click="goToChat(item.chat_room_id)">
                            <v-list-tile-action v-if="selectable"
                                                @click.stop="$event.stopPropagation()">
                                <v-checkbox v-model="selected"
                                            style="margin-top: 12px"
                                            :value="item.id"
                                            :ripple="false"></v-checkbox>
                            </v-list-tile-action>
                            <v-list-tile-action>
                                <div style="width: 100%; height: 56px">
                                    <app-avatar v-if="item.user.role === 'parent'"
                                                :initials="item.user.initials()"></app-avatar>
                                    
                                    <app-avatar v-else-if="item.user.role === 'superadmin'" :src="`/static/img/logo/NG_LOGO-149x149.png`"></app-avatar>
                                    <app-avatar v-else :src="item.getAvatarRoom($auth.user().id)"></app-avatar>
                                </div>
                            </v-list-tile-action>

                            <v-list-tile-content class="pl-3">
                                <v-list-tile-title>
                                    <div class="d-flex">
                                        <div class="primary--text font--medium text-small">{{item.user.first_name}}
                                        </div>
                                        <v-spacer></v-spacer>
                                        <div class="text--grey_1 font--light text-xs-right text-small">{{item.created_at
                                            | timeAgo}}
                                        </div>
                                    </div>
                                </v-list-tile-title>
                                <v-list-tile-sub-title class="text--primary"
                                                       :class="{'font--light': item.is_read, 'font--medium': !item.is_read}">
                                    <div v-if="!item.checkType('file')">
                                      {{item.message}}
                                    </div>
                                    <div v-else class='sc-message--file-icon'>
                                        <a :href="item.image.path || '#'" target='_blank'>
                                          <v-img :src="item.image.path" max-width="140" class="elevation-3">
                                            <v-layout slot="placeholder"
                                              fill-height
                                              align-center
                                              justify-center
                                              ma-0>
                                              <v-progress-circular indeterminate color="primary"></v-progress-circular>
                                            </v-layout>
                                          </v-img>
                                        </a>
                                    </div>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <div v-if="!item.is_read" class="dot"></div>
                                <app-svg-icon v-else name="brand/NG_REPLY" width="28"
                                              color="var(--charcoal)"></app-svg-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                        <v-divider v-if="index + 1 < items.length"
                                   :key="index"
                                   class="mx-3 border--grey_3"></v-divider>
                    </template>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppAvatar from '../../app-avatar'

  export default {
    name: 'app-list-inbox',
    components: {AppAvatar},
    props: {
      value: Array,
      selectable: Boolean,
      items: Array,
      default: () => []
    },

    data () {
      return {
        selected: this.value
      }
    },

    watch: {
      selected (val) {
        this.$emit('input', val)
      }
    },
    methods: {
      goToChat (chatRoomId) {
        this.$router.push(`/chat/${chatRoomId}`)
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .dot
        border-radius 50%
        width: 10px
        height: 10px
        background-color: var(--green)

    .v-list
        > div
            padding 16px 0 !important
    .v-list__tile__action  
        @media (max-width 600px)
            display none

</style>
