import Vue from 'vue'
import FavoritesAPI from '@/api/favourites'
import { favourites as mutations } from '../../types/mutation-types'
import { favourites as actions } from '../../types/action-types'
import Pagination from '../../../models/PaginationClass'
import Nanny from '../../../models/user/NannyClass'
import Job from '../../../models/JobClass'

// Shortlist -> getters['favourites/shortlist']
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
    }
  },
  mutations: {
    [mutations.FAVOURITES_REQUEST] (state) {
      state.loading = true
    },
    [mutations.FAVOURITES_SUCCESS] (state, data) {
      state.loading = false
      state.collection = data
    },
    [mutations.FAVOURITES_ERROR] (state) {
      state.loading = false
      state.collection = []
    },
    [mutations.FAVOURITES_DELETE] (state, objId) {
      for (let i in state.collection) {
        if (state.collection[i].id === objId) {
          Vue.delete(state.collection, i)
          break
        }
      }
      state.loading = false
    },
    [mutations.FAVOURITES_UPDATE] (state, item) {
      for (let i in state.collection) {
        if (state.collection[i].id === item.id) {
          Vue.set(state.collection, i, item)
          break
        }
      }
      state.loading = false
    }
  },
  actions: {
    [actions.FAVOURITES_GET] (context, type) {
      context.commit(mutations.FAVOURITES_REQUEST)
      const _type = context.rootState.favourites.types[type.toString().toUpperCase()]
      return FavoritesAPI.get(_type)
                         .then(res => {
                           // convert all raw data to Nanny class
                           const newCollection = []
                           for (const item of res.data) {
                             item.object = type === 'JOB' ? new Job(item.object) : new Nanny(item.object)
                             newCollection.push(item)
                           }
                           context.commit(mutations.FAVOURITES_SUCCESS, newCollection)
                         })
                         .catch(err => {
                           context.commit(mutations.FAVOURITES_ERROR)
                           return Promise.reject(err)
                         })
    },
    [actions.FAVOURITES_ADD_NOTE] (context, {type, id, notes}) {
      context.commit(mutations.FAVOURITES_REQUEST)
      const _type = context.rootState.favourites.types[type.toString().toUpperCase()]
      return FavoritesAPI.addNote(_type, id, notes)
        .then(res => {
          let _item = res.data
          // convert all raw data to Nanny class
          _item.object = type === 'JOB' ? new Job(_item.object) : new Nanny(_item.object)
          context.commit(mutations.FAVOURITES_UPDATE, _item)
        })
        .catch(err => {
          context.commit(mutations.FAVOURITES_ERROR)
          return Promise.reject(err)
        })
    }
  }
}
