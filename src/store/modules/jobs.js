// import Vue from 'vue'
import JobsAPI from '@/api/jobs'
import {jobs as mutations} from '../types/mutation-types'
import {jobs as actions} from '../types/action-types'
import Job from '../../models/JobClass'
import Pagination from '../../models/PaginationClass'

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
    [mutations.JOBS_REQUEST] (state) {
      state.loading = true
    },
    [mutations.JOBS_SUCCESS] (state, jobs) {
      state.loading = false
      if (jobs) {
        state.collection = jobs
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
    [mutations.JOBS_PAGINATION] (state, data) {
      state.pagination = new Pagination(data)
    }
  },
  actions: {
    [actions.JOBS_FIND] ({commit}, data) {
      commit(mutations.JOBS_REQUEST)
      return JobsAPI.find(data)
        .then(response => {
          // convert all raw data jobs to Job class
          const newCollection = []
          for (const job of response.data.data) {
            newCollection.push(new Job(job))
          }
          commit(mutations.JOBS_SUCCESS, newCollection)
          commit(mutations.JOBS_PAGINATION, response.data)
          return response
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    },
    [actions.JOBS_GET] ({commit}, id) {
      commit(mutations.JOBS_REQUEST)
      return JobsAPI.show(id)
        .then(response => {
          commit(mutations.JOBS_SUCCESS, [new Job(response.data)])
          return response
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    },
    [actions.JOBS_UPDATE] ({commit}, data) {
      commit(mutations.JOBS_REQUEST)
      return JobsAPI.update(data)
        .then(response => {
          commit(mutations.JOBS_SUCCESS, [new Job(response.data)])
          return response
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    },
    [actions.JOBS_STORE] ({commit}, data) {
      commit(mutations.JOBS_REQUEST)
      return JobsAPI.store(data)
        .then(response => {
          commit(mutations.JOBS_SUCCESS, [new Job(response.data)])
          return response
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    },
    'GET_BY_ALERTS' ({commit}) {
      commit(mutations.JOBS_REQUEST)
      return JobsAPI.getByAlerts()
        .then(response => {
          // convert all raw data jobs to Job class
          const newCollection = []
          for (const job of response.data.data) {
            newCollection.push(new Job(job))
          }
          commit(mutations.JOBS_SUCCESS, newCollection)
          return response
        })
        .catch(error => {
          commit(mutations.ERROR)
          return Promise.reject(error)
        })
    },
    [actions.RECOMMEND] ({commit}, data) {
      commit(mutations.JOBS_REQUEST)
      return JobsAPI.recommend(data)
        .then(res => {
          //  for the loading
          commit(mutations.JOBS_SUCCESS)
          return res
        })
        .catch(error => {
          // for the loading
          commit(mutations.JOBS_SUCCESS)
          return Promise.reject(error)
        })
    },
    'NOTIFY_AVAILABLE' ({commit}, data) {
      return JobsAPI.notifyAvailable(data)
    }
  }
}
