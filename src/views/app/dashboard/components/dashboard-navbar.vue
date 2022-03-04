<template>
    <v-layout row wrap>
        <v-flex class="xs12 _nav--item hidden-sm-and-up">
            <router-link to="/inbox" class="link-small">
                <div class="text-xs-center _nav--item__content">
                    <v-badge class="_nav-badge--dashboard">
                        <app-svg-icon name="brand/NG_INBOX" width="50"></app-svg-icon>
                        <span slot="badge">2</span>
                    </v-badge>
                    <span class="d-block _nav--name">Inbox</span>
                </div>
            </router-link>
        </v-flex>
        <v-flex v-for="item in computedItems"
                :key="item.icon"
                class="xs6 sm4 _nav--item">
            <router-link :to="item.path"
                         class="link-small">
                <div class="text-xs-center _nav--item__content">
                    <v-badge class="_nav-badge--dashboard">
                        <app-svg-icon :name="`brand/${item.icon}`"></app-svg-icon>
                        <span v-if="item.count"
                              slot="badge">{{item.count}}</span>
                    </v-badge>
                    <span class="d-block _nav--name">{{item.name}}</span>
                </div>
            </router-link>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'dashboard-navbar',

    computed: {
      items () {
        return [
          {
            name: 'My Favourites',
            path: '/favourites',
            icon: 'NG_FAVOURITES',
            auth: ['parent', 'nanny'],
            count: this.$store.getters['notifications/favourites']
          }, {
            name: 'My Connections',
            path: '/connections',
            icon: 'NG_CONNECTIONS',
            auth: ['nanny'],
            count: this.$store.getters['notifications/connections']
          }, {
            name: 'My Clubs',
            path: '/favourites',
            icon: 'NG_CLUB_HOUSE',
            auth: ['nanny'],
            count: this.$store.getters['notifications/clubs']
          }, {
            name: 'My Alerts',
            path: '/alerts',
            icon: 'NG_ALERTS',
            auth: ['parent', 'nanny']
          }, {
            name: 'Post a job',
            path: '/job-post',
            icon: 'NG_POST_A_JOB',
            auth: ['parent']
          }, {
            name: 'My Reviews',
            path: '/reviews',
            icon: 'NG_REVIEWS',
            auth: ['parent', 'nanny'],
            count: 0
          }, {
            name: 'My Account',
            path: '/account',
            icon: 'NG_MY_ACCOUNT',
            auth: ['parent', 'nanny']
          }, {
            name: 'My Subscription',
            path: '/subscription',
            icon: 'NG_SUBSCRIPTION',
            auth: ['parent']
          }
        ]
      },
      computedItems () {
        let role = this.$auth.user().role
        return this.items.filter((item) => item.auth.indexOf(role) > -1)
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._nav
        &--item
            height 140px
            border-bottom 1px solid var(--grey_2)
            &:nth-child(2n)
                border-right 1px solid var(--grey_2)
            a
                color var(--blue)
                text-decoration none
                &:hover
                    color var(--blue_hover)
            .svg-icon
                width 42px
                height 60px
        &--name
            margin-top 16px

    @media (max-width: 599px)
        ._nav
            &--item__content
                padding-top 12px

    @media (min-width: 600px)
        ._nav
            &--item
                height 190px
                border-bottom none
                &:nth-child(2n)
                    border-right none
                a
                    text-decoration none
                .svg-icon
                    width 66px
                    height 80px
            &--name
                margin-top 30px
</style>
