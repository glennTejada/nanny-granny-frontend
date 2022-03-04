// import {base as actions} from '../types/action-types'
import {base as mutations} from '../types/mutation-types'
import UserApi from '@/api/users'
import $lodash from 'lodash'

export default {
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
      state.collection = data
    },
    [mutations.ERROR] (state) {
      state.loading = false
      state.collection = []
    }
  },
  actions: {
    'GET_PHOTOS' ({commit, state}, data) {
      commit(mutations.REQUEST)
      window.FB.login(function (response) {
        if (response.authResponse) {
          window.FB.api(
            '/me?fields=albums.fields(id,type)',
            function (response) {
              if (response && !response.error) {
                let _album = $lodash.filter(response.albums.data, {'type': 'profile'})[0]
                if (_album.id) {
                  window.FB.api(`/${_album.id}/photos?fields=id,picture,source`, (res) => {
                    commit(mutations.SUCCESS, res.data)
                  })
                }
              }
            }
          )
        } else {
        //  console.log('User cancelled login or did not fully authorize.')
        }
      })
    },
    'TO_DATA_URL' ({commit, state}, url) {
      return fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        }))
    },
    'UPLOAD_IMAGE' ({commit, state}, data) {
      return UserApi.uploadImages(data)
        .then(response => response)
    }
  }
}
