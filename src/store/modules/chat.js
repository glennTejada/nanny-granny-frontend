import ChatAPI from '@/api/chat'
import { base as mutations } from '../types/mutation-types'
import Vue from 'vue'
import Message from '../../models/chat/MessageClass'
import Post from '../../models/chat/PostClass'
import Pagination from '../../models/PaginationClass'
import RoomClass from '../../models/chat/RoomClass'
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    loading: false,
    messages: [],
    pagination: new Pagination()
  },
  getters: {
    loading (state) {
      return state.loading
    },
    messages (state) {
      return state.messages
    },
    pagination (state) {
      return state.pagination
    }
  },
  mutations: {
    [mutations.REQUEST] (state) {
      state.loading = true
    },
    [mutations.SUCCESS] (state, messages) {
      Vue.set(state, 'messages', messages)
      state.loading = false
    },
    [mutations.PAGINATION] (state, data) {
      state.pagination = new Pagination(data)
    },
    [mutations.FINALLY] (state) {
      state.loading = false
    },
    [mutations.RESET] (state) {
      state.loading = false
      state.messages = []
    },
    'PUSH_NEWEST_ITEM' (state, _messages) {
      const _msgSorted = _.orderBy(_messages, ['created_at'], ['asc'])
      for (let i in _msgSorted) {
        if (!_.find(state.messages, {id: _msgSorted[i].id})) {
          state.messages.unshift(_msgSorted[i])
        }
      }
    },
    [mutations.PUSH_ITEM] (state, message) {
      if (message.parent_id > 0) {
        for (let i in state.messages) {
          if (state.messages[i].id === message.parent_id) {
            state.messages[i].replies.push(message)
            break
          }
        }
      } else {
        state.messages.unshift(message)
        Vue.set(state, 'messages', state.messages)
      }
      state.loading = false
    }
  },
  actions: {
    'GET_MESSAGES' ({commit, state}, {type = {}, params = {}, loadMore}) {
      commit(mutations.REQUEST)
      const object = {club: Post, chat: Message}
      return ChatAPI.getMessageByRoom(type, params)
                    .then(res => {
                      // convert all raw data
                      const newCollection = loadMore ? state.messages : []
                      for (const msg of res.data.data) {
                        if (!msg.message && !msg.image) continue
                        newCollection.push(new object[type.name](msg))
                      }
                      commit(mutations.PAGINATION, res.data)
                      commit(mutations.SUCCESS, newCollection)
                    })
                    .finally(() => (commit(mutations.FINALLY)))
    },
    'GET_REPLIES' ({commit, state}, {roomId, parentId, params}) {
      commit(mutations.REQUEST)
      return ChatAPI.getReplyByRoom(roomId, parentId, params)
        .then(res => {
          // convert all raw data
          for (let i in state.messages) {
            if (state.messages[i].id === parentId) {
              const newCollection = []
              for (const msg of res.data.data) {
                if (!msg.message && !msg.image) continue
                newCollection.push(new Post(msg))
              }
              state.messages[i].replies = newCollection
              break
            }
          }
        })
        .finally(() => (commit(mutations.FINALLY)))
    },
    'GET_NEWEST_MESSAGES' ({commit}, {type = {}, params = {}}) {
      return ChatAPI.getMessageByRoom(type, params)
        .then(res => {
          // convert all raw data
          const newCollection = []
          for (const msg of res.data.data) {
            if (!msg.message && !msg.image) continue
            newCollection.push(new Message(msg))
          }
          commit('PUSH_NEWEST_ITEM', newCollection)
        })
    },
    'SEND_MESSAGE' ({commit}, {type, data}) {
      const object = {chat: Message, club: Post}
      return ChatAPI.storeMessage(type, data)
                    .then(res => {
                      commit(mutations.PUSH_ITEM, new object[type.name](res.data))
                    })
    },
    'GET_ROOM' (ctx, data) {
      ctx.commit(mutations.REQUEST)
      return ChatAPI.getRoom(data)
                    .then(res => res)
                    .finally(ctx.commit(mutations.FINALLY))
    },
    'GET_ROOM_BY_ID' (ctx, roomId) {
      ctx.commit(mutations.REQUEST)
      return ChatAPI.getRoomById(roomId)
                    .then(res => new RoomClass(res.data))
                    .finally(ctx.commit(mutations.FINALLY))
    }
  }
}
