import { toolbar as types } from '../types/mutation-types'

export default {
  namespaced: true,
  state: {
    scrollPosition: {x: 0, y: 0},
    drawer: false,
    extension: false,
    extensionType: 'parent',
    stickySearch: false,
    minToolbar: false,
    items: [
      {
        id: 'menuFindFor_parent',
        title: 'Find a NannyGranny',
        path: '/nannies',
        visible: ['public', 'parent']
      }, {
        id: 'menuFindFor_nanny',
        title: 'Become a NannyGranny',
        path: '/jobs',
        visible: ['public']
      }, {
        id: 'menuPostJob',
        title: 'Post a Job',
        path: '/job-post',
        visible: ['parent']
      }, {
        id: 'menuNannyJob',
        title: 'NannyGranny Jobs',
        path: '/jobs',
        visible: ['nanny']
      }, {
        id: 'menuClubhouse',
        title: 'ClubHouse',
        path: '/clubhouse',
        visible: ['public', 'parent']
      }, {
        id: 'menuClubhouseNanny',
        title: 'ClubHouse',
        path: '/clubhouse/nanny',
        visible: ['nanny']
      }, {
        id: 'menuWorks',
        title: 'How it works',
        path: '/how-it-works',
        visible: ['public', 'nanny', 'parent']
      }, {
        id: 'menuForum',
        title: 'Forum',
        path: '/clubhouse/forum',
        visible: ['nanny']
      }
    ],
    menuItems: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        visible: ['parent', 'nanny']
      }, {
        title: 'Inbox',
        path: '/inbox',
        visible: ['parent', 'nanny']
      }, {
        title: 'My Favourites',
        path: '/favourites',
        visible: ['parent', 'nanny']
      }, {
        title: 'My Connections',
        path: '/connections',
        visible: ['nanny']
      }, {
        title: 'My Account',
        path: '/account',
        visible: ['parent', 'nanny']
      }, {
        title: 'My Profile',
        path: '/profile',
        visible: ['nanny']
      }, {
        title: 'My Subscription',
        path: '/subscription',
        visible: ['parent']
      }, {
        title: 'My Job',
        path: '/job-listing',
        visible: ['parent']
      }, {
        title: 'My Alerts',
        path: '/alerts',
        visible: ['parent', 'nanny']
      }, {
        title: 'My Reviews',
        path: '/reviews',
        visible: ['parent', 'nanny']
      }, {
        title: 'Log out',
        path: '/logout',
        visible: ['parent', 'nanny']
      }
    ]
  },
  getters: {
    items (state) {
      return (role) => state.items.filter((item) => item.visible.indexOf(role) > -1)
    },
    menuItems (state) {
      return (role) => state.menuItems.filter((item) => item.visible.indexOf(role) > -1)
    },
    drawer (state) {
      return state.drawer
    },
    minToolbar (state) {
      return state.minToolbar
    },
    extension (state) {
      return state.extension
    },
    extensionType (state) {
      return state.extensionType
    },
    stickySearch (state) {
      return state.stickySearch
    }
  },
  mutations: {
    [types.SET_MIN_TOOLBAR] (state, val) {
      state.minToolbar = val
    },
    [types.SET_DRAWER] (state, val) {
      state.drawer = val
    },
    [types.EXTENSION] (state, {show, type = 'parent'}) {
      state.extensionType = type
      state.extension = show
    },
    [types.STICKY_SEARCH] (state, val) {
      state.stickySearch = val
    }
  },
  actions: {
    //
  }
}
