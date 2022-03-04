// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// =============================================================================
import 'babel-polyfill'
import 'vue-svgicon/dist/polyfill'
import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import store from './store'
import {router} from './http'
import VeeValidate from 'vee-validate'
import Lodash from 'lodash'
import VueAuth from '@websanova/vue-auth'
import VueAuthOption from './config/auth'
import App from './App'
import AppToolbar from './components/app-toolbar/app-toolbar-index'
import AppFooter from './components/app-footer'
import AppInputPostcode from './components/app-input/app-input-postcode'
import {Vuetify} from 'vuetify'
import {APP_THEME, APP_COMPONENTS, APP_DERECTIVES, APP_ICONS} from './config/vuetify'
import VueClip from 'vue-clip'
import LineClamp from 'vue-line-clamp'
import SvgIcon from 'vue-svgicon'
import VueCookie from 'vue-cookie'
import * as VueGoogleMaps from 'vue2-google-maps'
import * as filters from './util/filters'
import snackbarMixin from './mixins/snackbar'
import Helpers from './util/helpers'
import {GOOGLE_API_KEY, GOOGLE_ANALYTICS_ID} from './config/constants'
import SocialSharing from 'vue-social-sharing'
import VueAnalytics from 'vue-analytics'
import { ScrollAnimation, ScrollParallax } from './util/directives'
import VueParallaxJs from 'vue-parallax-js'
import { createSimpleTransition } from 'vuetify/es5/util/helpers'

// Register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// Register global directives.
Vue.directive('scrollanim', ScrollAnimation)
Vue.directive('parallaxxy', ScrollParallax)
// Register global mixins.
Vue.mixin(snackbarMixin)

// Auth
// =====================================================================
Vue.use(VueAuth, VueAuthOption)

// sync the router with the vuex store.
// this registers `store.state.route`
// =====================================================================
sync(store, router)

Vue.use(VueAnalytics, {
  id: GOOGLE_ANALYTICS_ID,
  router
})

// Plugins
// =====================================================================
Vue.use(Helpers)
Vue.use(VueClip)
Vue.use(LineClamp)
Vue.use(VueCookie)
Vue.use(SvgIcon, {
  tagName: 'app-svg-icon'
})
Vue.use(VeeValidate, {
  events: 'change'
})
Vue.use(Vuetify, {
  theme: APP_THEME,
  components: APP_COMPONENTS,
  directives: APP_DERECTIVES,
  icons: APP_ICONS
})
Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_API_KEY,
    libraries: 'places' // necessary for places input
  }
})
Vue.use(SocialSharing)
Vue.use(VueParallaxJs)

Vue.prototype.$lodash = Lodash
Vue.config.productionTip = false

// Styles
// =====================================================================
require('./styles/css/_variable.css')
require('./styles/stylus/main.styl')

// Global Components
// =====================================================================
Vue.component('app-toolbar', AppToolbar)
Vue.component('app-footer', AppFooter)
Vue.component('app-input-postcode', AppInputPostcode)

const myTransition = createSimpleTransition('fadeinup-transition')
Vue.component('fadeinup-transition', myTransition)

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
// =====================================================================
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
