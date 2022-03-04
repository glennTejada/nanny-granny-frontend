import Vue from 'vue'

import NanniesAPI from '@/api/nannies'
import ChatAPI from '@/api/chat'
import Pagination from '@/models/PaginationClass'
import ConnectUserClass from '@/models/ConnectUserClass'
import { base as mutations } from '../../../types/mutation-types'
import RequestsModule from './requests'
import GroupsModule from './groups'

export default {
  namespaced: true,
  state: {
    loading: false,
    collection: [],
    pagination: new Pagination({})
  },
  getters: {
    loading (state) {
      return state.loading
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
    [mutations.ERROR] (state) {
      state.loading = false
      state.collection = []
      state.pagination = new Pagination({})
    },
    [mutations.PUSH_ITEM] (state, data) {
      state.collection.unshift(data)
      Vue.set(state, 'collection', state.collection)
    },
    [mutations.DELETE] (state, id) {
      for (let i in state.collection) {
        if (state.collection[i].id === id) {
          Vue.delete(state.collection, i)
          break
        }
      }
      state.loading = false
    },
    [mutations.PAGINATION] (state, data) {
      state.pagination = new Pagination(data)
    }
  },
  actions: {
    'FETCH' ({commit}, {authUserId, status = 1}) {
      commit(mutations.REQUEST)
      return NanniesAPI.connect(status)
        .then(response => {
          // convert all raw data
          const newCollection = []
          for (const item of response.data.data) {
            if (!item.user_to) continue
            let _userData = authUserId === item.user_to.id
              ? item.user_from
              : item.user_to
            item.user = _userData
            newCollection.push(new ConnectUserClass(item))
          }
          commit(mutations.SUCCESS, newCollection)
          commit(mutations.PAGINATION, response.data)
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    },
    'FIND' ({commit}, query) {
      commit(mutations.REQUEST)
      return ChatAPI.findConnections(query)
        .then(response => {
          // convert all raw data
          const newCollection = []
          for (const item of response.data) {
            newCollection.push({
              id: item.id,
              first_name: item.first_name,
              last_name: item.last_name
            })
          }
          commit(mutations.SUCCESS)
          return newCollection
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    },
    'CONNECT_REQUEST' ({commit}, {user_id}) {
      commit(mutations.REQUEST)
      return NanniesAPI.connectRequest({user_id})
        .then(response => {
          commit(mutations.SUCCESS, [])
          return response
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    },
    'DELETE' ({commit}, id) {
      commit(mutations.REQUEST)
      return NanniesAPI.connectApprove(id, 0)
        .then(response => {
          commit(mutations.DELETE, id)
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    }
  },
  // ===========
  // MODULES
  // ===========
  modules: {
    requests: RequestsModule,
    groups: GroupsModule
  }
}
