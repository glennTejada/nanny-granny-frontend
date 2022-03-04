import SubscriptionAPI from '@/api/subscription'
import {payments as types} from '../types/mutation-types'
import Vue from 'vue'
import Invoice from '../../models/InvoiceClass'

export default {
  namespaced: true,
  state: {
    loading: false,
    error: null,
    selectedPlan: null,
    plans: []
  },
  getters: {
    loading (state) {
      return state.loading
    },
    selectedPlan (state) {
      return state.selectedPlan
    },
    getPlan (state) {
      return (id) => state.plans.filter(item => item.id === id)[0]
    },
    hasError (state) {
      return state.error !== null
    },
    error (state) {
      return state.error
    },
    hasPlans (state) {
      return state.plans.length > 0
    },
    plans (state) {
      return state.plans
    }
  },
  mutations: {
    [types.SET_PLAN] (state, plan) {
      state.selectedPlan = Object.assign({}, plan)
    },
    [types.FETCHING_PLANS] (state) {
      state.loading = true
      state.error = null
    },
    [types.FETCHING_PLANS_SUCCESS] (state, plans) {
      state.loading = false
      state.error = null
      state.plans = plans
    },
    [types.FETCHING_PLANS_ERROR] (state, error) {
      state.loading = false
      state.error = error
    }
  },
  actions: {
    FETCH_PLANS ({commit}) {
      commit(types.FETCHING_PLANS)
      return SubscriptionAPI.getPlans()
        .then(res => commit(types.FETCHING_PLANS_SUCCESS, res.data))
        .catch(err => commit(types.FETCHING_PLANS_ERROR, err))
    }
  },
  // ========================
  // MODULES
  // ========================
  modules: {
    // subscription/payment
    payments: {
      namespaced: true,
      state: {
        loading: false,
        invoice: new Invoice(),
        promocode: null
      },
      getters: {
        loading (state) {
          return state.loading
        },
        invoice (state) {
          return state.invoice
        }
      },
      mutations: {
        'REQUEST' (state) {
          state.loading = true
        },
        'SUCCESS' (state) {
          state.loading = false
        },
        'SET_INVOICE' (state, invoice) {
          Vue.set(state, 'invoice', invoice)
        },
        'FINALLY' (state) {
          state.loading = false
        }
      },
      actions: {
        'CREDIT_CARD' ({commit}, data) {
          commit('REQUEST')
          return SubscriptionAPI.paymentCreditCard(data)
            .then(res => {
              commit('SUCCESS')
              return res.data
            })
            .finally(() => (commit('FINALLY')))
        },
        'GET_INVOICES' ({commit}, params) {
          commit('REQUEST')
          return SubscriptionAPI.getAllInvoices(params)
            .then(res => {
              const collection = []
              for (const inv of res.data) {
                collection.push(new Invoice(inv))
              }
              return collection
            })
            .finally(() => (commit('FINALLY')))
        },
        'APPLY_PROMOCODE' (ctx, data) {
          return SubscriptionAPI.checkPromocode(data)
            .then((res) => {
              const _invoice = ctx.getters['invoice']
              _invoice.amount = res.data.summ
              _invoice.promocode = data.codenumber
              ctx.commit('SET_INVOICE', _invoice)
            })
        }
      }
    }
  }
}
