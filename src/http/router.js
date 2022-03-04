import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Store from '../store/index'
import {toolbar, dialog} from '../store/types/mutation-types'

Vue.use(VueRouter)

/**
 * The Router instance containing all the routes for the application.
 */
const router = new VueRouter({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (to.meta.transitionName === 'scale-transition') {
      return {}
    }
    return {x: 0, y: 0}
  },
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from) => {
  document.title = to.meta.title || 'NannyGranny'
  Store.commit('toolbar/' + toolbar.SET_DRAWER, false)
  Store.commit('toolbar/EXTENSION', {show: false})
  Store.commit('dialog/' + dialog.DIALOG_SHOW, false)
})

export default router
