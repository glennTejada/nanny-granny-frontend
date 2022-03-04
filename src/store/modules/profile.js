import UsersAPI from '@/api/users'
import { base as mutations } from '../types/mutation-types'
import { profile as actions } from '../types/action-types'
import { parseUserData } from '@/util/index'
import Alerts from '../../models/AlertsClass'

export default {
  namespaced: true, // -> profile
  state: {
    loading: false,
    error: null,
    alerts: null
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    alerts (state) {
      return state.alerts
    }
  },
  mutations: {
    [mutations.REQUEST] (state) {
      state.loading = true
      state.error = null
    },
    [mutations.SUCCESS] (state, payload = {}) {
      if (payload.alerts !== undefined) {
        state.alerts = payload.alerts
      }
      state.loading = false
      state.error = null
    },
    'ALERTS' (state, data) {
      state.alerts = data
    },
    [mutations.ERROR] (state, error) {
      state.loading = false
      state.error = error
    }
  },
  actions: {
    [actions.UPDATE_ACCOUNT] ({commit}, data) {
      commit(mutations.REQUEST)
      return UsersAPI.updateAccount(data)
                     .then(response => {
                       commit(mutations.SUCCESS)
                       return parseUserData(response.data)
                     })
                     .catch(error => {
                       commit(mutations.ERROR, error)
                       return Promise.reject(error)
                     })
    },
    [actions.UPDATE_PROFILE] ({commit}, data) {
      commit(mutations.REQUEST)
      return UsersAPI.updateProfile(data)
                     .then(response => {
                       commit(mutations.SUCCESS)
                       return parseUserData(response.data)
                     })
                     .catch(error => {
                       commit(mutations.ERROR, error)
                       return Promise.reject(error)
                     })
    },
    [actions.UPDATE_THEME] ({commit}, data) {
      commit(mutations.REQUEST)
      return UsersAPI.updateTheme(data)
                     .then(response => {
                       commit(mutations.SUCCESS)
                       return response
                     })
                     .catch(error => {
                       commit(mutations.ERROR, error)
                       return Promise.reject(error)
                     })
    },
    [actions.CHANGE_PASSWORD] ({commit, state}, data) {
      commit(mutations.REQUEST)
      return UsersAPI.changePassword(data)
                     .then(response => {
                       commit(mutations.SUCCESS)
                       return response
                     })
                     .catch(error => {
                       commit(mutations.ERROR, error)
                       return Promise.reject(error)
                     })
    },
    [actions.DELETE_ACCOUNT] ({commit}) {
      commit(mutations.REQUEST)
      return UsersAPI.deleteAccount()
                     .then(response => {
                       commit(mutations.SUCCESS)
                       return response
                     })
                     .catch(error => {
                       commit(mutations.ERROR, error)
                       return Promise.reject(error)
                     })
    },
    [actions.ALERTS] ({commit}) {
      commit(mutations.REQUEST)
      return UsersAPI.getAlerts()
                     .then(response => {
                       commit(mutations.SUCCESS, {alerts: new Alerts(response.data)})
                     })
                     .catch(error => {
                       commit(mutations.ERROR, error)
                       return Promise.reject(error)
                     })
    },
    [actions.UPDATE_ALERTS] ({commit}, data) {
      commit(mutations.REQUEST)
      return UsersAPI.updateAlerts(data)
                     .then(response => {
                       commit(mutations.SUCCESS, {alerts: new Alerts(response.data)})
                     })
                     .catch(error => {
                       commit(mutations.ERROR, error)
                       return Promise.reject(error)
                     })
    },
    [actions.DELETE_IMAGES] ({commit}) {
      commit(mutations.REQUEST)
      return UsersAPI.deleteImages()
                     .then(response => {
                       commit(mutations.SUCCESS)
                       return response
                     })
                     .catch(error => {
                       commit(mutations.ERROR, error)
                       return Promise.reject(error)
                     })
    },
    'FORGOT_PASSWORD' ({commit}, data) {
      commit(mutations.REQUEST)
      return UsersAPI.forgotPasswordLink(data)
        .finally(() => commit(mutations.SUCCESS))
    }
  }
}
