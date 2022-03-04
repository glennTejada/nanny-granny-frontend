<template>
    <v-layout _clubhouse-nav column>
        <v-flex v-if="!hidePattern" _clubhouse-nav--pattern>
            <app-svg-icon preserveAspectRatio="xMinYMin meet"
                          name="themes/profile/NG_BG-04"
                          color="var(--blue_medium) url(#svgicon_themes_profile_NG_BG-04_a)"
                          :original="true"></app-svg-icon>
        </v-flex>
        <v-flex _clubhouse-nav--actions>
            <router-link :to="linkPrev"
                         flat
                         tag="a"
                         class="_clubhouse-nav--link">
                <app-svg-icon name="ui/NG_NEXT_PREV"
                              :color="$vuetify.theme.primary"
                              class="svg-icon--prev"></app-svg-icon>
                <slot name="router-prev-name">
                    <app-svg-icon name="brand/NG_CLUB_HOUSE"
                                  :color="$vuetify.theme.primary"
                                  class="svg-icon--house"></app-svg-icon>
                    Back to ClubHouse home
                </slot>
            </router-link>
            <v-spacer></v-spacer>
            <router-link v-if="latestArticle"
                         to="/clubhouse"
                         flat
                         tag="a"
                         class="_clubhouse-nav--link link-right">
                <slot name="router-next-name">
                    Explore the latest articles
                </slot>
                <app-svg-icon name="ui/NG_NEXT_PREV"
                              :color="$vuetify.theme.primary"
                              class="svg-icon--next ml-3"></app-svg-icon>
            </router-link>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'clubhouse-navigation',
    props: {
      hidePattern: Boolean,
      routerPrev: {
        type: Object
      },
      latestArticle: Boolean
    },
    computed: {
      linkPrev () {
        const _defLink = `/clubhouse${this.$auth.check(['nanny']) ? '/nanny' : ''}`
        return (this.routerPrev || {}).to || _defLink
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._clubhouse-nav
        &--pattern
            overflow hidden
            height 78px
            .svg-icon
                overflow visible
                width 140px
                height 190px
        &--actions
            padding 38px 24px
            @media (min-width 600px)
                display flex
        &--link
            text-decoration none
            display flex
            align-items center
            &.link-right
                @media (max-width 599px)
                    margin-top 30px
                    justify-content flex-end
            .svg-icon
                width 36px
                height 36px
                margin-right 16px
                @media (min-width 600px)
                    margin-right 30px
                &--prev
                    transform rotate(180deg)
</style>
