import Vue from 'vue'
import FavoritesAPI from '@/api/favourites'
import Pagination from '../../../models/PaginationClass'
import { favourites as mutations } from '../../types/mutation-types'
import { favourites as actions } from '../../types/action-types'
import Club from '../../../models/ClubClass'

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
    [mutations.FAVOURITES_SUCCESS] (state, clubs) {
      state.loading = false
      Vue.set(state, 'collection', clubs)
    },
    [mutations.FAVOURITES_ERROR] (state) {
      state.loading = false
    },
    [mutations.FAVOURITES_DELETE] (state, clubId) {
      for (let i in state.collection) {
        if (state.collection[i].id === clubId) {
          Vue.delete(state.collection, i)
          break
        }
      }
      state.loading = false
    }
  },
  actions: {
    [actions.FAVOURITES_GET] (context) {
      context.commit(mutations.FAVOURITES_REQUEST)
      const _type = context.rootState.favourites.types['CLUB']
      return FavoritesAPI.get(_type)
        .then(res => {
          // convert all raw data articles to Club class
          const newCollection = []
          for (const item of res.data) {
            newCollection.push(new Club(item.object))
          }
          context.commit(mutations.FAVOURITES_SUCCESS, newCollection)
        })
        .catch(err => {
          context.commit(mutations.FAVOURITES_ERROR)
          return Promise.reject(err)
        })
    }
  }
}
