<template>
    <v-app>
        <!--Loading-->
        <app-loader v-if="loading"></app-loader>
        <!--Content-->
        <app-toolbar id="appToolbar"></app-toolbar>
        <v-content id="appContent">
            <transition :name="transitionName" :mode="transitionMode">
                <router-view></router-view>
            </transition>
        </v-content>
        <app-footer></app-footer>
        <app-snackbar></app-snackbar>
        <app-dialog></app-dialog>
    </v-app>
</template>

<script>
  import AppSnackbar from './components/app-snackbar'
  import onlineMixin from './mixins/online'
  import AppDialog from './components/app-dialog/app-dialog'
  import AppLoader from './components/app-loader'
  import NotificationsMixin from './mixins/notifications'

  const DEFAULT_TRANSITION = 'slide-y-transition'
  const DEFAULT_TRANSITION_MODE = 'out-in'

  export default {
    components: {AppLoader, AppDialog, AppSnackbar},

    mixins: [onlineMixin, NotificationsMixin],

    data () {
      return {
        loading: true,
        toolbar: true,
        transitionName: DEFAULT_TRANSITION,
        transitionMode: DEFAULT_TRANSITION_MODE,
        state: {
          online: navigator.onLine
        }
      }
    },

    mounted () {
      // Get global data
      this.$store.dispatch('page/GET_ALL_DATA')
      this.$store.dispatch('catalogs/FETCH_ALL_DATA')
      this.$store.dispatch('subscription/FETCH_PLANS')
    },

    created () {
      // ServiceWorker registration
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
          console.log('ServiceWorker registration successful!')
        }).catch(function (err) {
          console.log('ServiceWorker registration failed: ', err)
        })
      }
      // Single callback which will fire once (on refresh or entry).
      this.$auth.ready(function () {
        this.loading = false
      })
    }
  }
</script>

<style lang="stylus">
    [v-cloak] {
        display: none;
    }
    #appContent
        min-height: calc(100vh - 200px)
        padding-top 0 !important
</style>
