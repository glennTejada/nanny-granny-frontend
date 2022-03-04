import InboxAPI from '@/api/inbox'
import {base as mutations} from '../types/mutation-types'
import {base as actions} from '../types/action-types'
import InboxClass from '../../models/chat/InboxClass'
import Pagination from '../../models/PaginationClass'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    loading: false,
    collection: [],
    pagination: new Pagination()
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
    [mutations.SUCCESS] (state, data) {
      state.loading = false
      if (data) {
        state.collection = data
      }
    },
    [mutations.PAGINATION] (state, data) {
      state.pagination = new Pagination(data)
    },
    [mutations.DELETE] (state, chatIds) {
      const newCollection = state.collection.filter(item => chatIds.indexOf(item.id) === -1)
      Vue.set(state, 'collection', newCollection)
      state.loading = false
    },
    [mutations.RESET] (state) {
      state.loading = false
      state.collection = []
      state.pagination = new Pagination()
    }
  },
  actions: {
    [actions.FETCH] ({commit}, params) {
      commit(mutations.REQUEST)
      return InboxAPI.get(params)
        .then(res => {
          // convert all raw data
          const newCollection = []
          for (const msg of res.data.data) {
            if (!msg.user) continue
            newCollection.push(new InboxClass(msg))
          }
          commit(mutations.PAGINATION, res.data)
          commit(mutations.SUCCESS, newCollection)
        })
        .catch(error => {
          commit(mutations.SUCCESS)
          return Promise.reject(error)
        })
    },
    [actions.DELETE] ({commit}, data) {
      commit(mutations.REQUEST)
      return InboxAPI.delete(data)
        .then(res => {
          commit(mutations.DELETE, data.ids)
        })
        .catch(error => {
          commit(mutations.SUCCESS)
          return Promise.reject(error)
        })
    },
    'SET_READ_FOR_MESSAGES' (ctx, roomId) {
      return InboxAPI.setReadForMessages(roomId)
    }
  }
}
