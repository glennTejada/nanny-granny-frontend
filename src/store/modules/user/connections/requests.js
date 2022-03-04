import Vue from 'vue'

import NanniesAPI from '@/api/nannies'
import Pagination from '@/models/PaginationClass'
import Nanny from '@/models/user/NannyClass'
import { base as mutations } from '../../../types/mutation-types'

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
    [mutations.DELETE] (state, id) {
      for (let i in state.collection) {
        if (state.collection[i].id === id) {
          Vue.delete(state.collection, i)
          break
        }
      }
      state.loading = false
    },
    [mutations.ERROR] (state) {
      state.loading = false
      state.collection = []
      state.pagination = new Pagination({})
    },
    [mutations.PAGINATION] (state, data) {
      state.pagination = new Pagination(data)
    }
  },
  actions: {
    'FETCH' ({commit}, status = 0) {
      commit(mutations.REQUEST)
      return NanniesAPI.connect(status)
        .then(response => {
          // convert all raw data users to Nanny class
          const newCollection = []
          for (const item of response.data.data) {
            if (!item.user_to) continue
            newCollection.push({
              id: item.id,
              created_at: item.created_at,
              user: new Nanny(item.user_to)
            })
          }
          commit(mutations.SUCCESS, newCollection)
          commit(mutations.PAGINATION, response.data)
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    },
    'APPLY_OR_REFUSE' (ctx, {id, status}) {
      ctx.commit(mutations.REQUEST)
      return NanniesAPI.connectApprove(id, status)
        .then(res => {
          if (status && res.data) {
            ctx.commit('user/connect/PUSH_ITEM', {
              id: res.data.id,
              created_at: res.data.created_at,
              user: new Nanny(res.data.user_to)
            }, {root: true})
            ctx.commit(mutations.SUCCESS)
          }
          ctx.commit(mutations.DELETE, id)
        })
        .catch(error => {
          ctx.commit(mutations.ERROR)
          return Promise.reject(error)
        })
    }
  }
}
