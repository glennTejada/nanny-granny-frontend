import Vue from 'vue'
import UsersAPI from '@/api/users'
import {parseUserData} from '@/util/index'
import {register as actions} from '../types/action-types'
import {register as mutations} from '../types/mutation-types'

export default {
  namespaced: true,
  state: {
    stepperType: 'parent',
    loading: false,
    error: null,
    data: null
  },
  getters: {
    stepperType (state) {
      return state.stepperType
    },
    loading (state) {
      return state.loading
    },
    hasError (state) {
      return state.error !== null
    },
    error (state) {
      return state.error
    },
    data (state) {
      return state.data
    }
  },
  mutations: {
    [mutations.REGISTER_REQUEST] (state) {
      state.loading = true
      state.error = null
    },
    [mutations.REGISTER_SUCCESS] (state, data) {
      state.loading = false
      state.error = null
      state.data = data
    },
    [mutations.REGISTER_ERROR] (state, error) {
      state.loading = false
      state.error = error
    },
    [mutations.REGISTER_RESET] (state) {
      state.loading = false
      state.error = null
      state.data = null
    },
    [mutations.REGISTER_STEPPER_TYPE] (state, type) {
      state.stepperType = type
    }
  },
  actions: {
    [actions.STEP_1] ({commit, dispatch}, {data, social = false}) {
      commit(mutations.REGISTER_REQUEST)
      const _action = social
        ? 'social'
        : 'registerEmail'

      return UsersAPI[_action](data)
        .then((response) => {
          Vue.auth.user(parseUserData(response.data))
          Vue.auth.watch.authenticated = false
          commit(mutations.REGISTER_SUCCESS, data)
          return Vue.auth.user()
        })
        .catch((error) => {
          commit(mutations.REGISTER_ERROR, error.response)
          return Promise.reject(error)
        })
    },
    [actions.STEP_2] ({commit, state}, {data}) {
      commit(mutations.REGISTER_REQUEST)
      if (state.stepperType === 'nanny') {
        return UsersAPI.updateAccount(data)
          .then((response) => {
            commit(mutations.REGISTER_SUCCESS, response.data)
            return response.data
          })
          .catch(error => {
            commit(mutations.REGISTER_ERROR, error.response)
            return Promise.reject(error)
          })
      } else {
        return new Promise((resolve, reject) => {
          commit(mutations.REGISTER_SUCCESS, state.data)
          resolve(state.data)
        })
      }
    },
    [actions.STEP_3] ({commit, state}, {data}) {
      commit(mutations.REGISTER_REQUEST)
      return UsersAPI.updateAccount(data)
        .then(response => {
          commit(mutations.REGISTER_RESET)
          return response
        })
        .catch(error => {
          commit(mutations.REGISTER_ERROR, error.response)
          return Promise.reject(error)
        })
    }
  }
}
