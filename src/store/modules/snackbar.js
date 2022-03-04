import {snackbar as types} from '../types/mutation-types'

export default {
  state: {
    show: false,
    color: 'error',
    text: 'An error occurred',
    subText: '',
    timeout: 6000
  },
  getters: {
    snackbarShow (state) {
      return state.show
    },
    snackbarColor (state) {
      return state.color
    },
    snackbarText (state) {
      return state.text
    },
    snackbarSubtext (state) {
      return state.subText
    },
    snackbarTimeout (state) {
      return state.timeout
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
