import JobsAPI from '@/api/jobs'
import NanniesAPI from '@/api/nannies'
import { base as mutations } from '../types/mutation-types'
import Nanny from '../../models/user/NannyClass'
import Cookie from 'vue-cookie'
import Job from '../../models/JobClass'

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
    },
    cookie (state) {
      return (name) => Cookie.get(name)
    }
  },
  mutations: {
    [mutations.REQUEST] (state) {
      state.loading = true
    },
    [mutations.SUCCESS] (state, collect) {
      state.loading = false
      state.collection = collect
    },
    [mutations.ERROR] (state) {
      state.loading = false
      state.collection = []
    },
    [mutations.PUSH_ITEM] (state, data) {
      state.collection.unshift(data)
    }
  },
  actions: {
    'RECENTLY_GET' ({dispatch, commit, getters}, user) {
      commit(mutations.REQUEST)
      const data = Cookie.get(`${user.role}_${user.id}`)
      const _API = {nanny: JobsAPI, parent: NanniesAPI}
      const object = {nanny: Job, parent: Nanny}

      if (data) {
        _API[user.role].findByIds({ids: data})
               .then(response => {
                 // convert all raw data users to Nanny class
                 const newCollection = []
                 for (const item of response.data.data) {
                   newCollection.push(new object[user.role](item))
                 }
                 commit(mutations.SUCCESS, newCollection)
               })
               .catch(error => {
                 commit(mutations.ERROR)
                 return Promise.reject(error)
               })
      }
    }
  }
}
