import ArticlesAPI from '@/api/articles'
import Pagination from '../../models/PaginationClass'
import { articles as mutations } from '../types/mutation-types'
import { articles as actions } from '../types/action-types'
import Article from '../../models/ArticleClass'

// Articles -> getters['articles']
export default {
  namespaced: true,
  state: {
    loading: false,
    selected: new Article(),
    categories: [],
    collection: [],
    pagination: new Pagination()
  },
  getters: {
    loading (state) {
      return state.loading
    },
    selected (state) {
      return state.selected
    },
    collection (state) {
      return state.collection
    },
    categories (state) {
      return state.categories
    },
    category (state) {
      return (categoryId) => state.categories.filter((item) => item.id === categoryId)[0] || {}
    },
    pagination (state) {
      return state.pagination
    }
  },
  mutations: {
    [mutations.ARTICLES_REQUEST] (state) {
      state.loading = true
    },
    [mutations.ARTICLES_SUCCESS] (state, data) {
      state.loading = false
      state.collection = data
    },
    'ARTICLES_SELECTED' (state, article) {
      state.loading = false
      state.selected = article
    },
    [mutations.ARTICLES_CATEGORIES_SUCCESS] (state, data) {
      state.loading = false
      state.categories = data
    },
    [mutations.ARTICLES_PAGINATION] (state, data) {
      state.pagination = new Pagination(data)
    },
    [mutations.ARTICLES_ERROR] (state) {
      state.loading = false
    },
    [mutations.ARTICLES_RESET] (state) {
      state.loading = false
      state.selected = new Article()
      state.collection = []
      state.pagination = new Pagination()
    }
  },
  actions: {
    [actions.ARTICLES_GET] (context, params) {
      context.commit(mutations.ARTICLES_REQUEST)
      return ArticlesAPI.get(params)
                        .then(res => {
                          // convert all raw data articles to Article class
                          const newCollection = []
                          for (const article of res.data.data) {
                            newCollection.push(new Article(article))
                          }
                          context.commit(mutations.ARTICLES_PAGINATION, res.data)
                          context.commit(mutations.ARTICLES_SUCCESS, newCollection)
                        })
                        .catch(err => {
                          context.commit(mutations.ARTICLES_ERROR)
                          return Promise.reject(err)
                        })
    },
    'GET_FOR_HOME' (context, params) {
      context.commit(mutations.ARTICLES_REQUEST)
      return ArticlesAPI.getForHome(params)
                        .then(res => {
                          // convert all raw data articles to Article class
                          const newCollection = []
                          for (const article of res.data) {
                            newCollection.push(new Article(article))
                          }
                          context.commit(mutations.ARTICLES_SUCCESS, newCollection)
                        })
                        .finally(() => (context.commit(mutations.ARTICLES_ERROR)))
    },
    [actions.ARTICLES_GET_BY_CATEGORY] (context, {id, params}) {
      context.commit(mutations.ARTICLES_REQUEST)
      return ArticlesAPI.getByCategory(id, params)
                        .then(res => {
                          // convert all raw data articles to Article class
                          const newCollection = []
                          for (const article of res.data.data) {
                            newCollection.push(new Article(article))
                          }
                          context.commit(mutations.ARTICLES_PAGINATION, res.data)
                          context.commit(mutations.ARTICLES_SUCCESS, newCollection)
                        })
                        .catch(err => {
                          context.commit(mutations.ARTICLES_ERROR)
                          return Promise.reject(err)
                        })
    },
    [actions.ARTICLES_SHOW] (context, id) {
      context.commit(mutations.ARTICLES_REQUEST)
      return ArticlesAPI.show(id)
                        .then(res => {
                          context.commit('ARTICLES_SELECTED', new Article(res.data))
                        })
                        .catch(err => {
                          context.commit(mutations.ARTICLES_ERROR)
                          return Promise.reject(err)
                        })
    },
    [actions.ARTICLES_CATEGORIES] (context, params) {
      context.commit(mutations.ARTICLES_REQUEST)
      return ArticlesAPI.categories(params)
                        .then(res => {
                          context.commit(mutations.ARTICLES_CATEGORIES_SUCCESS, res.data)
                        })
                        .catch(err => {
                          context.commit(mutations.ARTICLES_ERROR)
                          return Promise.reject(err)
                        })
    },
    'SUBSCRIBE_RECEIVE' (context, data) {
      context.commit(mutations.ARTICLES_REQUEST)
      return ArticlesAPI.subscribeReceive(data)
    }
  }
}
