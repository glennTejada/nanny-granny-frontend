<template>
    <v-layout class="_layout-card row wrap align-center">
        <!--AVATAR-->
        <v-flex class="_layout-card--avatar xs12"
                v-scrollanim="{ bEnt: !ind ? 'before-fadein' : 'no', enter: !ind ? 'fadein' : 'no', offsetBottom: 100 }">
            <v-img :src="item.getAvatarUrl() || `/static/img/def/NG-profile-placeholder-${this.item.genderName()}.png`" height="100%"/>
        </v-flex>
        <v-flex xs12 fill-height>
            <v-container fill-height>
                <v-layout row wrap>
                    <v-flex xs12 md5 offset-lg1 lg4 d-flex align-center>
                        <v-card flat
                                light
                                class="text-xs-center _layout-card--boby">
                            <v-card-text class="px-0">
                                <h2 class="primary--text _layout-card--boby__title">{{item.first_name |
                                    capitalize}}</h2>
                                <h4 class="mt-2">
                                    {{item.postcode.location | capitalize}} |
                                    Age {{item.date_birthday | age}} |
                                    <v-rating v-model="item.rating"
                                              class="d-inline-block app-rating"
                                              :size="$vuetify.breakpoint.xsOnly ? 18 : 24"
                                              dense
                                              background-color="success"
                                              color="success"
                                              readonly></v-rating>
                                </h4>
                                <app-svg-icon name="brand/NG_DIVIDER"
                                              color="var(--green)"
                                              :width="$vuetify.breakpoint.xsOnly ? '100' : '139'"></app-svg-icon>
                                <p v-line-clamp:20="$vuetify.breakpoint.xsOnly ? 5 : 6"
                                   class="text-small mb-0">
                                    {{item.description}}
                                </p>
                            </v-card-text>
                            <v-card-text class="pb-0 px-0">
                                <!--<v-btn @click="view"-->
                                       <!--flat-->
                                       <!--class="primary ma-0">-->
                                    <!--View profile-->
                                <!--</v-btn>-->
                                <app-btn-view-profile :item="item"
                                                      :flat="false"
                                                      class="primary"
                                                      :hideBottomPanel="!$auth.check()">
                                    View profile
                                </app-btn-view-profile>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
  import Nanny from '@/models/user/NannyClass'
  import AppBtnViewProfile from '../app-buttons/app-btn-view-profile'

  export default {
    name: 'app-card-profile-nanny',
    components: {AppBtnViewProfile},
    props: {
      item: Nanny,
      ind: Number
    },

    methods: {
      view () {
        this.$store.commit('dialog/DIALOG_SHOW', {
          show: true,
          component: `app-dialog-nanny-detail`,
          data: this.item,
          options: {
            fullscreen: true
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._layout-card
        position relative
        max-width: 600px
        margin: auto
        @media (min-width: 960px)
            max-width: 100%
            height 550px

        &--avatar
            height 250px
            @media (min-width: 600px)
                height 350px
            @media (min-width: 960px)
                position absolute
                margin auto 0
                right 0
                height 500px
                min-width 50%
                z-index 5
            @media (min-width 1600px)
                min-width 750px

        &--boby
            min-height 320px
            @media (min-width: 600px)
                min-height auto

            &__title
                margin-top 20px
</style>
