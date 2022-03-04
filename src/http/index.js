import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {API_BASE_URL} from '../config/constants'
import router from './router'
import store from '../store/index'

Vue.router = router

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = API_BASE_URL
Vue.axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Unauthorized Access
    if (error.response === undefined || error.response.status >= 500) { // <- System Error
      if (error.response.status >= 505) {
        store.commit('SET_SNACKBAR_TEXT', error.response.data.message)
        store.commit('SET_SNACKBAR_COLOR', 'error')
        store.commit('SET_SNACKBAR_SHOW', true)
      } else {
        store.commit('SET_SNACKBAR_TEXT', 'Sorry, the server is down.')
        store.commit('SET_SNACKBAR_COLOR', 'error')
        store.commit('SET_SNACKBAR_SHOW', true)
      }
    } else if (error.response.status === 401 && ['UnauthorizedAccess', 'InvalidToken'].indexOf(error.response.data.error) > -1) {
      Vue.auth.logout({redirect: {name: 'login'}})
    }
    return Promise.reject(error)
  }
)

export {router}
