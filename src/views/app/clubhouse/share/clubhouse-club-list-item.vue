<template>
    <div class="_card-club"
         :class="{'_card-club--compact': compact}">
        <div class="_card-club--icon">
            <app-brandshape :color="color"
                            :width="$vuetify.breakpoint.xsOnly ? '60px':'80px'"
                            :height="$vuetify.breakpoint.xsOnly ? '60px':'80px'">
                <div class="d-flex align-center justify-center fill-height pa-3"
                     :style="{backgroundColor: $vuetify.theme.primary}">
                    <app-svg-icon :name="`brand/${item.svg_name}`"
                                  color="#fff"></app-svg-icon>
                </div>
            </app-brandshape>
            <app-btn-favourite name="club"
                               size="12px"
                               border
                               :item="item"
                               class="btn-favourite"></app-btn-favourite>
        </div>
        <div :class="{'mx-auto': compact}">
            <div class="_card-club--name mb-2">
                <router-link :to="`/clubhouse/club/${item.id}`">
                    <component :is="compact ? 'p':'h3'"
                               class="ma-0">
                        {{item.name | capitalize}}
                    </component>
                </router-link>
            </div>
            <div v-if="!compact"
                 class="text--grey_1">
                <div class="_card-club--description align-center text--grey_1">
                    <div class="d-inline-flex align-center">
                        <app-svg-icon name="brand/NG_CONNECT"
                                      :height="$vuetify.breakpoint.xsOnly ? '8': '15'"
                                      :width="$vuetify.breakpoint.xsOnly ? '18': '24'"
                                      class="mr-1"></app-svg-icon>
                        Created by
                        <app-btn-user-connect :item="item.user"></app-btn-user-connect>
                        <span class="mx-2 hidden-xs-only">|</span>
                    </div>
                    <div class="d-inline-flex align-center">
                        <app-svg-icon name="brand/NG_ACCOUNT"
                                      :color="$vuetify.theme.primary"
                                      height="15"
                                      width="15"
                                      class="mr-1"></app-svg-icon>
                        {{item.count_members}}
                        <span class="mx-2">|</span>
                        <app-svg-icon name="brand/NG_CONTACT"
                                      :color="$vuetify.theme.primary"
                                      height="15"
                                      width="15"
                                      class="mr-1"></app-svg-icon>
                        {{item.count_posts}}
                    </div>
                    <div>
                        <span class="mx-2 hidden-xs-only">|</span>
                        Latest post {{item.last_message | timeAgo()}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import ClubClass from '@/models/ClubClass'
  import AppBrandshape from '../../../../components/app-brandshape'
  import AppBtnFavourite from '../../../../components/app-buttons/app-btn-favourite'
  import AppBtnUserConnect from '../../../../components/app-buttons/app-btn-user-connect'

  export default {
    name: 'clubhouse-club-list-item',
    components: {AppBtnUserConnect, AppBtnFavourite, AppBrandshape},
    props: {
      item: {
        type: ClubClass,
        required: true
      },
      color: {
        type: String,
        default: '#fff'
      },
      compact: Boolean
    }
  }
</script>

<style lang="stylus" scoped>
    ._card-club
        min-height 80px
        display flex
        align-items flex-start
        padding 6px 0
        @media (min-width 600px)
            align-items center

        ._card-club
            &--name a
                text-decoration none

                &:hover
                    text-decoration underline

            &--icon
                position relative
                margin-right 24px
                @media (min-width 600px)
                    margin-right 40px

                .btn-favourite
                    position absolute
                    top -2px
                    right -2px
            &--description
                @media (max-width 599px)
                    display flex
                    flex-direction column
                    align-items end
                @media (min-width 600px)
                    display inline-flex

                > div
                    margin 2px 0
        &._card-club--compact
            flex-direction column
            ._card-club
                &--icon
                    margin: auto
                &--name
                    margin-top 12px
</style>
