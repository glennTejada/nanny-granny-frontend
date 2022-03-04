import CatalogsAPI from '@/api/catalogs'
import NanniesAPI from '@/api/nannies'
import {base as mutations} from '../types/mutation-types'
import {base as actions} from '../types/action-types'

export default {
  namespaced: true,
  state: {
    loading: false,
    locations: [],
    dataForm: {}
  },
  getters: {
    loading (state) {
      return state.loading
    },
    locations (state) {
      return state.locations
    },
    dataForm (state) {
      return state.dataForm
    }
  },
  mutations: {
    [mutations.REQUEST] (state) {
      state.loading = true
    },
    [mutations.SUCCESS] (state, payload) {
      state.loading = false
      state.dataForm = payload
    },
    [mutations.FINALLY] (state) {
      state.loading = false
    },
    [mutations.ERROR] (state) {
      state.loading = false
      state.dataForm = {}
    },
    'SET_LOCATIONS' (state, payload) {
      state.loading = false
      state.locations = payload
    }
  },
  actions: {
    [actions.FETCH] ({commit}, state) {
      commit(mutations.REQUEST)
      return CatalogsAPI.getWwcForm(state)
        .then(res => {
          commit(mutations.SUCCESS, res.data)
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    },
    [actions.UPDATE] ({commit}, data) {
      commit(mutations.REQUEST)
      return NanniesAPI.wwcForm(data)
        .then(res => {
          commit(mutations.FINALLY)
          return res
        })
        .catch(error => {
          commit(mutations.FINALLY)
          return Promise.reject(error)
        })
    },
    'LOCATIONS' ({commit}) {
      commit(mutations.REQUEST)
      return CatalogsAPI.getWwcFormLocation()
        .then(res => {
          commit('SET_LOCATIONS', res)
          commit(mutations.FINALLY)
        })
        .catch(error => {
          commit(mutations.FINALLY)
          return Promise.reject(error)
        })
    }
  }
}
