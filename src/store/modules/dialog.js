import {dialog as types} from '../types/mutation-types'
import _lodash from 'lodash'

export default {
  namespaced: true,
  state: {
    show: false,
    data: null,
    component: null,
    options: {
      fullscreen: null,
      maxWidth: null,
      hideOverlay: null,
      transition: null
    }
  },
  getters: {
    show (state) {
      return state.show
    },
    data (state) {
      return state.data
    },
    component (state) {
      return state.component
    },
    options (state) {
      return state.options
    }
  },
  mutations: {
    [types.DIALOG_SHOW] (state, {show, component, data, options}) {
      if (!show) {
        // Reset
        state.show = show
        setTimeout(() => {
          state.component = null
          state.data = null
          _lodash.forOwn(state.options, (val, key) => {
            state.options[key] = null
          })
        }, 500)
      } else {
        if (options) {
          _lodash.forOwn(options, (val, key) => {
            state.options[key] = val
          })
        }
        state.data = data
        state.component = component
        state.show = show
      }
    }
  }
}
