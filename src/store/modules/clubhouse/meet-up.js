import ClubsAPI from '@/api/clubs'
import { base as mutations } from '../../types/mutation-types'
import { base as actions } from '../../types/action-types'
import MeetUp from '../../../models/MeetUpClass'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    loading: false,
    selected: null,
    collection: []
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
    }
  },
  mutations: {
    [mutations.REQUEST] (state) {
      state.loading = true
    },
    [mutations.SUCCESS] (state, data) {
      state.loading = false
      state.collection = data
    },
    [mutations.PUSH_ITEM] (state, meetUp) {
      state.collection.unshift(meetUp)
      Vue.set(state, 'collection', state.collection)
      state.loading = false
    },
    [mutations.UPDATE] (state, meetUp) {
      for (let i in state.collection) {
      //  console.log(state.collection[i].id)
      //  console.log(meetUp.id)
        if (state.collection[i].id === meetUp.id) {
          Vue.set(state.collection, i, meetUp)
          break
        }
      }
      state.loading = false
    },
    [mutations.ERROR] (state) {
      state.loading = false
    },
    [mutations.RESET] (state) {
      state.loading = false
      state.selected = null
      state.collection = []
    },
    'SELECTED' (state, meetUpId) {
      state.selected = state.collection.filter(item => item.id === meetUpId)[0] || new MeetUp()
    }
  },
  actions: {
    [actions.FETCH] (context, {by = 'category', params}) {
      context.commit(mutations.REQUEST)
      const action = by === 'category' ? 'meetupByCategory' : 'meetupByClub'
      return ClubsAPI[action](params)
        .then(res => {
          // convert all raw data
          const newCollection = []
          for (const item of res.data.data) {
            newCollection.push(new MeetUp(item))
          }
          context.commit(mutations.SUCCESS, newCollection)
        })
        .catch(err => {
          context.commit(mutations.ERROR)
          return Promise.reject(err)
        })
    },
    [actions.STORE] (context, data) {
      context.commit(mutations.REQUEST)
      return ClubsAPI.storeMeetUp(data)
        .then(res => {
          // convert all raw data posts to Club class
          context.commit(mutations.PUSH_ITEM, new MeetUp(res.data))
        })
        .catch(err => {
          context.commit(mutations.ERROR)
          return Promise.reject(err)
        })
    }
  }
}
