import _lodash from 'lodash'
import CatalogsAPI from '../../api/catalogs'
import {catalogs as mutations} from '../types/mutation-types'
import {catalogs as actions} from '../types/action-types'

export default {
  namespaced: true,
  state: {
    loading: false,
    quote: {},
    allData: []
  },
  getters: {
    loading (state) {
      return state.loading
    },
    allData (state) {
      return state.allData
    },
    availability (state) {
      return _lodash.get(state.allData, 'availability_list.items', [])
    },
    childAge (state) {
      return _lodash.get(state.allData, 'child_age_list.items', [])
    },
    gender (state) {
      return _lodash.get(state.allData, 'gender_list.items', [])
    },
    preferences (state) {
      return _lodash.get(state.allData, 'work_preferences_list.items', [])
    },
    qualifications (state) {
      return _lodash.get(state.allData, 'personal_questions_list.items', [])
    },
    residenceStatuses (state) {
      return _lodash.get(state.allData, 'residence_status_list.items', [])
    },
    workTypes (state) {
      return _lodash.get(state.allData, 'type_work_list.items', [])
    },
    quote (state) {
      return state.quote
    }
  },
  mutations: {
    [mutations.CATALOGS_REQUEST] (state) {
      state.loading = true
    },
    [mutations.CATALOGS_SUCCESS] (state, data) {
      state.loading = false
      state.allData = data
    },
    [mutations.CATALOGS_ERROR] (state) {
      state.loading = false
      state.allData = []
    },
    [mutations.CATALOGS_QUOTE] (state, quote) {
      state.quote = quote
    }
  },
  actions: {
    [actions.FETCH_ALL_DATA] ({commit}) {
      commit(mutations.CATALOGS_REQUEST)
      return CatalogsAPI.getAllData()
        .then((res) => (commit(mutations.CATALOGS_SUCCESS, res.data)))
        .catch(error => {
          console.warn(error)
          commit(mutations.CATALOGS_ERROR)
        })
    },
    [actions.FETCH_QUOTE] ({commit}) {
      const collection = [
        {description: 'Don’t be so hard on yourself. The mum in E.T. had an alien living in her house for days & she didn’t notice.'},
        {description: 'The greatest legacy one can pass on to one\'s children and grandchildren is not money or other material things accumulated in one\'s life, but rather a legacy of character and faith.'},
        {description: 'We worry about what a child will become tomorrow, yet we forget that he is someone today.'}
      ]
      commit(mutations.CATALOGS_QUOTE, _lodash.sample(collection))
    }
  }
}
