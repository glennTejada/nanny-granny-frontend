import Vue from 'vue'
import Vuex from 'vuex'

import {modules} from './modules/index'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: modules,
  plugins: [createPersistedState({
    // An array of any paths to partially persist the state.
    // If no paths are given, the complete state is persisted.
    paths: [
      'page.data',
      'nannies.postcode',
      'jobs.postcode',
      'subscription.plans'
    ]
  })]
})
