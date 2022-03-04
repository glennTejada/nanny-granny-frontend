import NotificationAPI from '@/api/notifications'
import {base as mutations} from '../types/mutation-types'
import Vue from 'vue'
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    loading: false,
    notification: {
      connections: 0,
      clubs: 0,
      reviews: 0,
      messages: 0,
      favourites: 0
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    connections (state) {
      return state.notification.connections
    },
    clubs (state) {
      return state.notification.clubs
    },
    reviews (state) {
      return state.notification.reviews
    },
    messages (state) {
      return state.notification.messages
    },
    favourites (state) {
      return state.notification.favourites
    }
  },
  mutations: {
    [mutations.REQUEST] (state) {
      state.loading = true
    },
    [mutations.SUCCESS] (state, data) {
      state.loading = false
      state.notification = data
    },
    [mutations.UPDATE] (state, data = {}) {
      if (!data) return
      _.forOwn(data, (v, k) => {
        if (state.notification[k] !== undefined) {
          Vue.set(state.notification, k, v)
        }
      })
    },
    [mutations.RESET] (state) {
      _.forOwn(state.notification, (v, k) => {
        Vue.set(state.notification, k, 0)
      })
    },
    [mutations.FINALLY] (state) {
      state.loading = false
    }
  },
  actions: {
    'FETCH' ({commit}, role) {
      commit(mutations.REQUEST)
      return NotificationAPI.dashboard(role)
        .then(res => {
          commit(mutations.UPDATE, res.data)
        })
        .finally(() => (commit(mutations.FINALLY)))
    }
  }
}
