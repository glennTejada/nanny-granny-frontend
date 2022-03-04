import {snackbar as types} from '../types/mutation-types'

export default {
  state: {
    show: false
  },
  getters: {
    progressBarShow (state) {
      return state.show
    }
  },
  mutations: {
    [types.SET_SNACKBAR_SHOW] (state, show) {
      state.show = show
    },
    [types.SET_SNACKBAR_COLOR] (state, color) {
      state.color = color
    },
    [types.SET_SNACKBAR_TEXT] (state, text) {
      state.text = text
    },
    [types.SET_SNACKBAR_SUBTEXT] (state, subText) {
      state.subText = subText
    },
    [types.SET_SNACKBAR_TIMEOUT] (state, timeout) {
      state.timeout = timeout
    }
  }
}
