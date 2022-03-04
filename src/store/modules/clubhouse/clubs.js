import ClubsAPI from '@/api/clubs'
import Pagination from '@/models/PaginationClass'
import {base as mutations} from '../../types/mutation-types'
import {base as actions} from '../../types/action-types'
import Club from '../../../models/ClubClass'
import Post from '../../../models/chat/PostClass'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    loading: false,
    categories: [],
    collection: [],
    pagination: new Pagination()
  },
  getters: {
    loading (state) {
      return state.loading
    },
    categories (state) {
      return state.categories
    },
    category (state) {
      return (categoryId) => state.categories.filter(item => item.id === Number(categoryId))[0]
    },
    collection (state) {
      return state.collection
    },
    club (state) {
      return (clubId) => state.collection.filter(item => item.id === Number(clubId))[0]
    },
    pagination (state) {
      return state.pagination
    }
  },
  mutations: {
    [mutations.REQUEST] (state) {
      state.loading = true
    },
    [mutations.FINALLY] (state) {
      state.loading = false
    },
    [mutations.SUCCESS] (state, data) {
      state.loading = false
      if (data) {
        state.collection = data
      }
    },
    [mutations.PAGINATION] (state, data) {
      state.pagination = new Pagination(data)
    },
    [mutations.RESET] (state) {
      state.loading = false
      state.categories = []
      state.collection = []
      state.pagination = new Pagination()
    },
    'PUSH_CATEGORY' (state, data) {
      state.categories.push(data)
      state.loading = false
    },
    'CATEGORIES' (state, data) {
      state.loading = false
      state.categories = data
    }
  },
  actions: {
    [actions.FETCH] (context, {categoryId, params}) {
      context.commit(mutations.REQUEST)
      return ClubsAPI.getByCategory(categoryId, params)
        .then(res => {
          // convert all raw data posts to Club class
          const newCollection = []
          for (const club of res.data.data) {
            if (!club.user_from) continue
            newCollection.push(new Club(club))
          }
          context.commit(mutations.PAGINATION, res.data)
          context.commit(mutations.SUCCESS, newCollection)
        })
        .finally(() => (context.commit(mutations.FINALLY)))
    },
    'FETCH_BY_ID' (context, clubId) {
      context.commit(mutations.REQUEST)
      return ClubsAPI.show(clubId)
        .then(res => {
          context.commit(mutations.SUCCESS, [new Club(res.data)])
        })
        .finally(() => (context.commit(mutations.FINALLY)))
    },
    [actions.STORE] (context, data) {
      context.commit(mutations.REQUEST)
      return ClubsAPI.store(data.category_id, data)
        .finally(() => (context.commit(mutations.FINALLY)))
    },
    'STORE_CATEGORY' (context, data) {
      context.commit(mutations.REQUEST)
      return ClubsAPI.storeCategory(data)
        .then(res => {
          context.commit('PUSH_CATEGORY', res.data)
        })
        .finally(() => (context.commit(mutations.FINALLY)))
    },
    'CATEGORIES' (context, params) {
      context.commit(mutations.REQUEST)
      return ClubsAPI.categories(params)
        .then(res => {
          context.commit('CATEGORIES', res.data)
        })
        .finally(() => (context.commit(mutations.FINALLY)))
    }
  },
  // ======================
  // MODULES
  // ======================
  modules: {
    // User module
    user: {
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
        },
        pagination (state) {
          return state.pagination
        }
      },
      mutations: {
        [mutations.REQUEST] (state) {
          state.loading = true
        },
        [mutations.SUCCESS] (state, data) {
          state.loading = false
          if (data) {
            state.collection = data
          }
        },
        [mutations.PAGINATION] (state, data) {
          state.pagination = new Pagination(data)
        },
        [mutations.UPDATE] (state, club) {
          for (let i in state.collection) {
            if (state.collection[i].id === club.id) {
              Vue.set(state.collection, i, club)
              break
            }
          }
          state.loading = false
        },
        [mutations.DELETE] (state, clubIds) {
          for (let i in state.collection) {
            if (clubIds.indexOf(state.collection[i].id) !== -1) {
              Vue.delete(state.collection, i)
            }
          }
          state.loading = false
        },
        [mutations.RESET] (state) {
          state.loading = false
          state.collection = []
          state.pagination = new Pagination()
        },
        [mutations.FINALLY] (state) {
          state.loading = false
        }
      },
      actions: {
        'FETCH' (context, {userId, params, global = true}) {
          context.commit(mutations.REQUEST)
          return ClubsAPI.getByUser(userId, params)
            .then(res => {
              // convert all raw data posts to Club class
              const newCollection = []
              for (const club of res.data.data) {
                newCollection.push(new Club(club))
              }
              if (global) {
                context.commit(mutations.PAGINATION, res.data)
                context.commit(mutations.SUCCESS, newCollection)
              } else {
                context.commit(mutations.SUCCESS)
                return newCollection
              }
            })
            .catch(err => {
              context.commit(mutations.SUCCESS)
              return Promise.reject(err)
            })
        },
        'UPDATE' (context, data) {
          context.commit(mutations.REQUEST)
          return ClubsAPI.update(data.id, data)
            .then(res => {
              context.commit('UPDATE', new Club(res.data))
            })
            .finally(() => (context.commit(mutations.FINALLY)))
        },
        'DELETE' (context, clubIds) {
          context.commit(mutations.REQUEST)
          return ClubsAPI.delete(clubIds)
            .then(res => {
              context.commit(mutations.DELETE, clubIds)
            })
            .catch(err => {
              context.commit(mutations.SUCCESS)
              return Promise.reject(err)
            })
        }
      }
    },
    // Posts module
    posts: {
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
        [mutations.SUCCESS] (state, data) {
          state.loading = false
          if (data) {
            state.collection = data
          }
        },
        [mutations.RESET] (state) {
          state.loading = false
          state.collection = []
        }
      },
      actions: {
        'GET_BY_USER' (context, {userId, params, global = true}) {
          context.commit(mutations.REQUEST)
          return ClubsAPI.getMessagesByUser(userId, params)
            .then(res => {
              // convert all raw data posts to Post class
              const newCollection = []
              for (const post of res.data.data) {
                newCollection.push(new Post(post))
              }
              if (global) {
                context.commit(mutations.SUCCESS, newCollection)
              } else {
                context.commit(mutations.SUCCESS)
                return newCollection
              }
            })
            .catch(err => {
              context.commit(mutations.SUCCESS)
              return Promise.reject(err)
            })
        },
        'GET_LATEST' (ctx, params) {
          ctx.commit(mutations.REQUEST)
          return ClubsAPI.getLatestMessages(params)
            .then(res => {
              // convert all raw data
              const newCollection = []
              for (const msg of res.data.data) {
                if (!msg.user) continue
                newCollection.push(new Post(msg))
              }
              ctx.commit(mutations.SUCCESS)
              return newCollection
            })
            .catch(err => {
              ctx.commit(mutations.SUCCESS)
              return Promise.reject(err)
            })
        }
      }
    }
  }
}
