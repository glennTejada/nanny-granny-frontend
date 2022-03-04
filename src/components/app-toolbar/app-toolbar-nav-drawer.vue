<template>
    <v-navigation-drawer fixed
                         temporary
                         class="app-navigation-drawer"
                         :value="drawer"
                         :right="true"
                         :width="259">
        <v-list class="pt-0">
            <v-list-tile class="app-drawer-tools">
                <v-list-tile-title class="text-xs-right app-list-tile-title">
                    <v-icon @click="SET_DRAWER(false)">
                        app-close
                    </v-icon>
                </v-list-tile-title>
            </v-list-tile>
            <v-list-tile class="app-drawer-auth">
                <v-container class="px-0 py-0" fill-height>
                    <v-layout v-if="$auth.check()" row>
                        <v-flex xs6 text-xs-center>
                            <router-link :to="$auth.check('parent') ? '/account' : '/profile'"
                                         tag="a"
                                         class="d-inline-flex justify-center align-center fill-height">
                                <app-svg-icon width="14"
                                              class="mr-2 mb-2"
                                              name="brand/NG_ACCOUNT_FILLED"></app-svg-icon>
                                {{$auth.check('nanny')? 'My Profile' : 'My Account'}}
                            </router-link>
                        </v-flex>
                        <v-flex xs6>
                            <router-link to="/logout"
                                         tag="a"
                                         class="d-flex justify-center align-center fill-height text-xs-center">
                                <span>Log out</span>
                            </router-link>
                        </v-flex>
                    </v-layout>
                    <v-layout v-else row>
                        <v-flex xs6 text-xs-center>
                            <router-link to="/login"
                                         tag="a"
                                         class="d-inline-flex justify-center align-center fill-height">
                                <app-svg-icon width="18"
                                              class="mr-2"
                                              name="brand/NG_ACCOUNT"></app-svg-icon>
                                Login
                            </router-link>
                        </v-flex>
                        <v-flex xs6>
                            <router-link to="/signup"
                                         tag="a"
                                         class="d-flex justify-center align-center fill-height text-xs-center">
                                <span>Register</span>
                            </router-link>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-list-tile>
            <v-list-tile v-for="item in items"
                         :key="item.title"
                         :to="item.path"
                         class="app-list-tile">
                <v-list-tile-content class="app-text-light">{{item.title}}</v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  import '../app-icons/brand'

  export default {
    name: 'app-toolbar-nav-drawer',

    props: {
      items: Array
    },

    computed: {
      ...mapGetters('toolbar', [
        'drawer'
      ])
    },

    methods: {
      ...mapMutations('toolbar', [
        'SET_DRAWER'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
    .app-navigation-drawer
        background-color var(--blue) !important
        z-index 999
        .v-list
            .v-list__tile__content
                color #ffffff
                font-size 16px
            .app-list-tile
                padding 16px 0 16px 19px
        .app-drawer-auth
            margin-bottom 35px
            border-top 1px solid #fff
            border-bottom 1px solid #fff
            .container
                margin-left -16px
                margin-right -16px
                .row .flex > a
                    font-family: inherit
                    font-size 14px
                    letter-spacing .3px
                    color #fff
                    text-decoration none
                .row > div:first-child
                    border-right 1px solid #fff
</style>
