import NanniesAPI from '@/api/nannies'
import { base as mutations } from '../../types/mutation-types'
import Pagination from '@/models/PaginationClass'
import Nanny from '@/models/user/NannyClass'

export default {
  namespaced: true,
  state: {
    loading: false,
    selected: new Nanny(),
    postcode: null,
    collection: [],
    pagination: new Pagination({})
  },
  getters: {
    loading (state) {
      return state.loading
    },
    postcode (state) {
      return state.postcode
    },
    collection (state) {
      return state.collection
    },
    pagination (state) {
      return state.pagination
    }
  },
  mutations: {
    [mutations.REQUEST] (state) {
      state.loading = true
    },
    [mutations.SUCCESS] (state, nannies) {
      state.loading = false
      if (nannies) {
        state.collection = nannies
      }
    },
    'NANNIES_SELECTED' (state, nanny) {
      state.loading = false
      state.selected = nanny
    },

    'POSTCODE' (state, postcode) {
      state.postcode = postcode
    },
    [mutations.ERROR] (state) {
      state.loading = false
      state.pagination = new Pagination({})
      state.collection = []
      state.postcode = null
    },
    [mutations.PAGINATION] (state, data) {
      state.pagination = new Pagination(data)
    },
    [mutations.NANNIES_RESET] (state) {
      state.loading = false
      state.selected = new Nanny()
      state.postcode = null
      state.collection = []
      state.pagination = new Pagination({})
    }

  },
  actions: {
    'FIND' ({commit}, data) {
      commit(mutations.REQUEST)
      return NanniesAPI.find(data)
                       .then(response => {
                         // convert all raw data users to Nanny class
                         const newCollection = []
                         for (const nanny of response.data.data) {
                           newCollection.push(new Nanny(nanny))
                         }
                         commit(mutations.SUCCESS, newCollection)
                         commit(mutations.PAGINATION, response.data)
                         return response
                       })
                       .catch(error => {
                         commit(mutations.ERROR)
                         return Promise.reject(error)
                       })
    },
    'GET' ({commit}, id) {
      commit(mutations.REQUEST)
      return NanniesAPI.show(id)
                       .then(response => {
                         commit('NANNIES_SELECTED', [new Nanny(response.data)])
                         return response
                       })
                       .catch(error => {
                         commit(mutations.ERROR)
                         return Promise.reject(error)
                       })
    },
    'GET_BY_ALERTS' ({commit}, params) {
      commit(mutations.REQUEST)
      return NanniesAPI.getByAlerts(params)
                       .then(response => {
                         // convert all raw data users to Nanny class
                         const newCollection = []
                         for (const nanny of response.data.data) {
                           newCollection.push(new Nanny(nanny))
                         }
                         commit(mutations.SUCCESS, newCollection)
                         return response
                       })
                       .catch(error => {
                         commit(mutations.ERROR)
                         return Promise.reject(error)
                       })
    },
    'GET_FOR_HOMEPAGE' ({commit}, params) {
      commit(mutations.REQUEST)
      return NanniesAPI.forHomepage(params)
                       .then(response => {
                         // convert all raw data users to Nanny class
                         const newCollection = []
                         for (const nanny of response.data) {
                           newCollection.push(new Nanny(nanny))
                         }
                         commit(mutations.SUCCESS, newCollection)
                         return response
                       })
                       .catch(error => {
                         commit(mutations.ERROR)
                         return Promise.reject(error)
                       })
    },
    'RECOMMEND' ({commit}, data) {
      commit(mutations.REQUEST)
      return NanniesAPI.recommend(data)
                       .then(response => {
                         //  for the loading
                         commit(mutations.SUCCESS)
                         return response
                       })
                       .catch(error => {
                         // for the loading
                         commit(mutations.SUCCESS)
                         return Promise.reject(error)
                       })
    },
    'NOTIFY_AVAILABLE' ({commit}, data) {
      return NanniesAPI.notifyAvailable(data)
    }
  }
}
