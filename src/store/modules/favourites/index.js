import FavoritesAPI from '@/api/favourites'
import { favourites as mutations } from '../../types/mutation-types'
import { favourites as actions } from '../../types/action-types'
import ArticleModule from './articles'
import ShortlistModule from './shortlist'
import ClubsModule from './clubs'

export default {
  namespaced: true,
  state: {
    loading: false,
    types: {
      'ARTICLE': 0,
      'NANNY': 1,
      'JOB': 2,
      'CLUB': 3,
      'MEETUP': 5
    }
  },
  getters: {
    loading (state) {
      return state.loading
    }
  },
  mutations: {
    [mutations.FAVOURITES_REQUEST] (state) {
      state.loading = true
    },
    [mutations.FAVOURITES_SUCCESS] (state) {
      state.loading = false
    },
    'FINALLY' (state) {
      state.loading = false
    }
  },
  actions: {
    [actions.FAVOURITES_ADD] ({commit, state}, {type, id}) {
      commit(mutations.FAVOURITES_REQUEST)
      const _type = state.types[type.toString().toUpperCase()]
      return FavoritesAPI.add(_type, id).finally(() => (commit('FINALLY')))
    },
    [actions.FAVOURITES_DELETE] ({state, commit}, {type, id}) {
      commit(mutations.FAVOURITES_REQUEST)
      const _type = state.types[type.toString().toUpperCase()]
      return FavoritesAPI.delete(_type, id).finally(() => (commit('FINALLY')))
    }
  },
  modules: {
    articles: ArticleModule,
    shortlist: ShortlistModule,
    clubs: ClubsModule
  }
}
