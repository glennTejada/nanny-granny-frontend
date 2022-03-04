import Vue from 'vue'
import ReviewAPI from '@/api/reviews'
import {base as mutations} from '../types/mutation-types'
import {base as actions} from '../types/action-types'
import Review from '../../models/ReviewClass'

export default {
  namespaced: true,
  state: {
    loading: false,
    collection: []
  },
  getters: {
    loading (state) {
      return state.loading
    },
    collection (state) {
      return state.collection
    }
  },
  mutations: {
    [mutations.REQUEST] (state) {
      state.loading = true
    },
    [mutations.SUCCESS] (state, reviews) {
      state.loading = false
      state.collection = reviews
    },
    [mutations.PUSH_ITEM] (state, data) {
      state.collection.unshift(data)
    },
    [mutations.UPDATE] (state, review) {
      for (let i in state.collection) {
        if (state.collection[i].id === review.id) {
          Vue.set(state.collection, i, review)
          break
        }
      }
      state.loading = false
    },
    [mutations.DELETE] (state, reviewIds) {
      const newCollection = state.collection.filter(item => reviewIds.indexOf(item.id) === -1)
      Vue.set(state, 'collection', newCollection)
      state.loading = false
    },
    [mutations.ERROR] (state) {
      state.loading = false
    },
    [mutations.RESET] (state) {
      state.loading = false
      state.collection = []
    }
  },
  actions: {
    [actions.FETCH] ({commit}, path) {
      commit(mutations.REQUEST)
      return ReviewAPI.fetch(path)
        .then(res => {
          // convert all raw data reviews to Review class
          const newCollection = []
          for (const review of res.data) {
            if (!review.user || !review.review_user) continue
            newCollection.push(new Review(review))
          }
          commit(mutations.SUCCESS, newCollection)
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    },
    'FETCH_FOR_USER' ({commit}, id) {
      commit(mutations.REQUEST)
      return ReviewAPI.fetchForUser(id)
        .then(res => {
          // convert all raw data reviews to Review class
          const newCollection = []
          for (const review of res.data) {
            newCollection.push(new Review(review))
          }
          commit(mutations.SUCCESS, newCollection)
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    },
    [actions.STORE] ({commit}, data) {
      commit(mutations.REQUEST)
      return ReviewAPI.store(data)
        .then(res => {
          commit(mutations.PUSH_ITEM, new Review(res.data))
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    },
    [actions.UPDATE] ({commit}, data) {
      commit(mutations.REQUEST)
      return ReviewAPI.update(data)
        .then(res => {
          commit(mutations.UPDATE, new Review(res.data))
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    },
    [actions.DELETE] ({commit}, data) {
      commit(mutations.REQUEST)
      return ReviewAPI.remove(data)
        .then(res => {
          commit(mutations.DELETE, data.ids)
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    }
  }
}
