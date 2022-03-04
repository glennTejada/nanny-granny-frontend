import Vue from 'vue'

import ChatAPI from '@/api/chat'
import Pagination from '@/models/PaginationClass'
import GroupUserClass from '@/models/GroupUserClass'
import { base as mutations } from '../../../types/mutation-types'

export default{
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
    },
    [mutations.FINALLY] (state) {
      state.loading = false
    }
  },
  actions: {
    'FETCH' ({commit}, {authID, params}) {
      commit(mutations.REQUEST)
      return ChatAPI.getConnectGroups(params)
        .then(response => {
          // convert all raw data
          const newCollection = []
          for (const item of response.data.data) {
            newCollection.push(new GroupUserClass(item, authID))
          }
          commit(mutations.SUCCESS, newCollection)
          commit(mutations.PAGINATION, response.data)
        })
        .finally(() => (commit(mutations.FINALLY)))
    },
    'CREATE' ({commit}, data) {
      commit(mutations.REQUEST)
      return ChatAPI.getRoom(data).finally(() => commit(mutations.FINALLY))
    },
    'INVITE_TO' ({commit}, data) {
      commit(mutations.REQUEST)
      return ChatAPI.inviteToGroup(data).finally(() => commit(mutations.FINALLY))
    },
    'UPDATE_NAME' (ctx, data) {
      // todo: waiting backend...
      return ChatAPI.updateNameGroup(data.id, data)
    },
    'DELETE' (ctx, data) {
      // todo: waiting backend...
      return ChatAPI.deleteGroups(data)
    }
  }
}
