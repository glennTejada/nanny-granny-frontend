import NanniesAPI from '@/api/nannies'
import { nannies as mutations } from '../types/mutation-types'
import { nannies as actions } from '../types/action-types'
import Pagination from '../../models/PaginationClass'
import Nanny from '../../models/user/NannyClass'

export default {
  namespaced: true,
  state: {
    loading: false,
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
    [mutations.NANNIES_REQUEST] (state) {
      state.loading = true
    },
    [mutations.NANNIES_SUCCESS] (state, nannies) {
      state.loading = false
      if (nannies) {
        state.collection = nannies
      }
    },
    [mutations.POSTCODE] (state, postcode) {
      state.postcode = postcode
    },
    [mutations.ERROR] (state) {
      state.loading = false
      state.pagination = new Pagination({})
      state.collection = []
      state.postcode = null
    },
    [mutations.NANNIES_PAGINATION] (state, data) {
      state.pagination = new Pagination(data)
    },
    [mutations.NANNIES_RESET] (state) {
      state.loading = false
      state.postcode = null
      state.collection = []
      state.pagination = new Pagination({})
    }
  },
  actions: {
    [actions.NANNIES_FIND] ({commit}, data) {
      commit(mutations.NANNIES_REQUEST)
      return NanniesAPI.find(data)
                       .then(response => {
                         // convert all raw data users to Nanny class
                         const newCollection = []
                         for (const nanny of response.data.data) {
                           newCollection.push(new Nanny(nanny))
                         }
                         commit(mutations.NANNIES_SUCCESS, newCollection)
                         commit(mutations.NANNIES_PAGINATION, response.data)
                         return response
                       })
                       .catch(error => {
                         commit(mutations.ERROR)
                         return Promise.reject(error)
                       })
    },
    [actions.NANNIES_GET] ({commit}, id) {
      commit(mutations.NANNIES_REQUEST)
      return NanniesAPI.show(id)
                       .then(response => {
                         commit(mutations.NANNIES_SUCCESS, [new Nanny(response.data)])
                         return response
                       })
                       .catch(error => {
                         commit(mutations.ERROR)
                         return Promise.reject(error)
                       })
    },
    [actions.MATCH_CRITERIA] ({commit}, params) {
      commit(mutations.NANNIES_REQUEST)
      return NanniesAPI.matchCriteria(params)
                       .then(response => {
                         // convert all raw data users to Nanny class
                         const newCollection = []
                         for (const nanny of response.data.data) {
                           newCollection.push(new Nanny(nanny))
                         }
                         commit(mutations.NANNIES_SUCCESS, newCollection)
                         return response
                       })
                       .catch(error => {
                         commit(mutations.ERROR)
                         return Promise.reject(error)
                       })
    },
    [actions.RECOMMEND] ({commit}, data) {
      commit(mutations.NANNIES_REQUEST)
      return NanniesAPI.recommend(data)
        .then(response => {
          //  for the loading
          commit(mutations.NANNIES_SUCCESS)
          return response
        })
        .catch(error => {
          // for the loading
          commit(mutations.NANNIES_SUCCESS)
          return Promise.reject(error)
        })
    }
  }
}
