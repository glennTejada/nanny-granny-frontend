import Vue from 'vue'
import FavoritesAPI from '@/api/favourites'
import Pagination from '../../../models/PaginationClass'
import { favourites as mutations } from '../../types/mutation-types'
import { favourites as actions } from '../../types/action-types'
import Article from '../../../models/ArticleClass'

// Articles -> getters['favourites/articles']
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
    [mutations.FAVOURITES_SUCCESS] (state, articles) {
      state.loading = false
      Vue.set(state, 'collection', articles)
    },
    [mutations.FAVOURITES_ERROR] (state) {
      state.loading = false
      state.collection = []
    },
    [mutations.FAVOURITES_PUSH_ITEM] (state, article) {
      state.collection.unshift(article)
      Vue.set(state, 'collection', state.collection)
    },
    [mutations.FAVOURITES_DELETE] (state, articleId) {
      for (let i in state.collection) {
        if (state.collection[i].id === articleId) {
          Vue.delete(state.collection, i)
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
                           // convert all raw data articles to Article class
                           const newCollection = []
                           for (const item of res.data) {
                             newCollection.push(new Article(item.object))
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
