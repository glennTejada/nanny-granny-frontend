import PageAPI from '@/api/page'
import {base as mutations} from '../types/mutation-types'
import Testimonial from '../../models/TestimonialClass'

export default {
  namespaced: true,
  state: {
    loading: false,
    testimonials: [],
    data: {}
  },
  getters: {
    loading (state) {
      return state.loading
    },
    content (state) {
      return (page) => (state.data[page] || {}).items || []
    },
    testimonials (state) {
      return state.testimonials
    }
  },
  mutations: {
    [mutations.REQUEST] (state) {
      state.loading = true
    },
    [mutations.SUCCESS] (state, data) {
      state.loading = false
      state.data = data
    },
    [mutations.ERROR] (state) {
      state.loading = false
      state.data = {}
    },
    'TESTIMONIALS' (state, data) {
      state.loading = false
      state.testimonials = data
    }
  },
  actions: {
    'GET_ALL_DATA' ({dispatch, commit, getters}) {
      commit(mutations.REQUEST)
      PageAPI.getAllPageData()
        .then(res => {
          commit(mutations.SUCCESS, res.data)
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    },
    'GET_TESTIMONIALS' ({dispatch, commit}, {path, query}) {
      commit(mutations.REQUEST)
      PageAPI.testimonials(path, query)
        .then(res => {
          const _data = res.data.current_page
            ? res.data.data
            : res.data
          const newCollection = []
          for (const article of _data) {
            newCollection.push(new Testimonial(article))
          }
          commit('TESTIMONIALS', newCollection)
        })
        .catch(error => {
          commit('TESTIMONIALS', [])
          return Promise.reject(error)
        })
    }
  }
}
