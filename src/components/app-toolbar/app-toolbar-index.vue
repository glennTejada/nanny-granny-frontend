<template>
    <div class="app-toolbar-container">
        <v-toolbar flat
                   app
                   height="208"
                   :extension-height="stickySearch ? 96 : undefined"
                   v-scroll="onScroll"
                   :scroll-off-screen="$vuetify.breakpoint.smAndUp"
                   :class="{'app-toolbar': true, 'app-toolbar-min': minToolbar}">
            <!--LOGO-->
            <v-toolbar-title class="app-toolbar-title">
                <router-link to="/"
                             tag="div"
                             class="app-toolbar-logo"></router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <!--MENU ITEMS MOBILE-->
            <v-toolbar-items class="hidden-md-and-up"
                             :class="{'btn-active-search': extended}">
                <v-btn @click="$store.commit('toolbar/EXTENSION', {show: true, type: 'parent'})"
                       :ripple="false"
                       class="mx-0"
                       icon>
                    <app-svg-icon width="20" name="brand/NG_SEARCH"></app-svg-icon>
                </v-btn>
            </v-toolbar-items>
            <!--MENU ITEMS DESKTOP-->
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn v-for="item in items"
                       :id="item.id"
                       :key="item.title"
                       :to="item.path"
                       :ripple="false"
                       flat>
                    {{item.title}}
                </v-btn>
            </v-toolbar-items>

            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <!--MENU-->
            <v-toolbar-items class="app-toolbar-items-auth">
                <v-menu v-if="$auth.check()"
                        transition="slide-y-transition"
                        attach=".app-toolbar-items-auth"
                        nudge-bottom="16px"
                        min-width="220"
                        offset-y>
                    <v-btn flat
                           :ripple="false"
                           class="v-btn-user-activator"
                           slot="activator">
                        <v-badge :value="notify"
                                 overlap>
                            <span slot="badge">{{notify}}</span>
                            <app-svg-icon width="18"
                                          class="mx-1"
                                          name="brand/NG_ACCOUNT_FILLED"></app-svg-icon>
                        </v-badge>
                        <span class="hidden-sm-and-down ml-2">{{$auth.user().first_name}}</span>
                    </v-btn>
                    <v-list>
                        <v-list-tile v-for="item in menuItems"
                                     :key="item.title"
                                     :to="item.path">
                            <v-list-tile-title>{{item.title}}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <template v-else>
                    <v-btn to="/login"
                           :ripple="false"
                           flat>
                        <app-svg-icon width="18"
                                      class="mx-2"
                                      name="brand/NG_ACCOUNT"></app-svg-icon>
                        <span class="hidden-sm-and-down">Login</span>
                    </v-btn>
                    <v-btn to="/signup"
                           :ripple="false"
                           flat
                           class="border--left border--blue hidden-sm-and-down">
                        Register
                    </v-btn>
                </template>
            </v-toolbar-items>
            <!--MOBILE NAV-->
            <v-toolbar-items class="hidden-md-and-up">
                <v-btn @click.stop="SET_DRAWER(true)" 
                       class="mx-0"
                       icon>
                    <app-svg-icon width="24" name="ui/NG_MOBILE_NAV"></app-svg-icon>
                </v-btn>
            </v-toolbar-items>
            <!--SEARCH OVERLAY-->
            <transition name="slide-y-transition" tag="div">
                <app-toolbar-extension v-if="extended"></app-toolbar-extension>
            </transition>
            <!--STICKY SEARCH-->
            <template v-if="stickySearch" slot="extension">
                <app-toolbar-sticky-search></app-toolbar-sticky-search>
            </template>
        </v-toolbar>
        <app-toolbar-nav-drawer :items="items"></app-toolbar-nav-drawer>
    </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import AppToolbarNavDrawer from './app-toolbar-nav-drawer'
  import '../app-icons/brand'
  import AppToolbarExtension from './app-toolbar-extension'
  import AppToolbarStickySearch from './app-toolbar-sticky-search'

  export default {
    components: {AppToolbarStickySearch, AppToolbarExtension, AppToolbarNavDrawer},

    props: {
      min: Boolean
    },

    data () {
      return {
        modalSearch: true,
        offsetTop: 0
      }
    },

    computed: {
      minToolbar () {
        return this.$store.getters['toolbar/minToolbar']
      },
      stickySearch () {
        return this.$store.getters['toolbar/stickySearch']
      },
      items () {
        return this.$store.getters['toolbar/items'](this.$auth.check() ? this.$auth.user().role : 'public')
      },
      menuItems () {
        return this.$store.getters['toolbar/menuItems'](this.$auth.check() ? this.$auth.user().role : 'public')
      },
      extended () {
        return this.$store.getters['toolbar/extension']
      },
      notify () {
        return this.$store.getters['notifications/messages']
      }
    },

    methods: {
      ...mapMutations('toolbar', [
        'SET_DRAWER'
      ]),
      onScroll (e) {
        if (this.$vuetify.breakpoint.smAndUp) {
          this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
          this.$store.commit('toolbar/SET_MIN_TOOLBAR', this.offsetTop > 500)
        }
      }
    }

  }
</script>

<style lang="stylus" scoped>
    @import "../../styles/stylus/components/_toolbar.styl"
</style>

