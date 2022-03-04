/**
 * Every route becomes a chunk, loaded only when used.
 * Reduces size of initial App load.
 */
export default [
  {
    path: '*',
    redirect: {
      path: '/404'
    }
  }, {
    name: 'default',
    path: '/',
    title: 'NannyGranny',
    component: require('@/views/app/home/index.vue').default,
    meta: {title: 'NannyGranny'}
  }, {
    name: 'login',
    path: '/login',
    component: require('@/views/app/auth/login/index.vue').default,
    meta: {auth: false, title: 'Login - NannyGranny'}
  }, {
    path: '/oauth2/:type/:role',
    name: 'oauth2-type',
    component: require('@/views/app/auth/components/auth-social.vue').default
  }, {
    path: '/signup',
    component: require('@/views/app/auth/signup/index.vue').default,
    meta: {auth: false, title: 'Signup - NannyGranny'},
    children: [
      {
        path: '',
        component: require('@/views/app/auth/signup/components/auth-signup-step-1.vue').default
      }, {
        path: ':step(step-2)/:role(parent)',
        component: require('@/views/app/auth/signup/components/auth-signup-step-2-parent.vue').default,
        props: true
      }, {
        path: ':step(step-2)/:role(nanny)',
        component: require('@/views/app/auth/signup/components/auth-signup-step-2-nanny.vue').default,
        props: true
      }, {
        path: ':step(step-3)/:role(parent)',
        component: require('@/views/app/auth/signup/components/auth-signup-step-3-parent.vue').default,
        props: true
      }, {
        path: ':step(step-3)/:role(nanny)',
        component: require('@/views/app/auth/signup/components/auth-signup-step-3-nanny.vue').default,
        props: true
      }, {
        path: ':step(step-3)/:role(nanny)/fill-profile',
        component: require('@/views/app/profile/index').default,
        props: {isFromSignup: true}
      }
    ]
  }, {
    name: 'logout',
    path: '/logout',
    component: require('@/views/app/auth/components/auth-logout.vue').default
  }, {
    name: 'forgot-password',
    path: '/forgot-password',
    component: require('@/views/app/auth/password/reset-password.vue').default,
    meta: {title: 'Forgot password - NannyGranny'}
  }, {
    name: 'account',
    path: '/account',
    component: require('@/views/app/account/index').default,
    meta: {auth: true, title: 'My Account - NannyGranny'}
  }, {
    name: 'profile',
    path: '/profile',
    component: require('@/views/app/profile/index').default,
    meta: {auth: ['nanny'], title: 'My Profile - NannyGranny'},
    props: {isFromSignup: false}
  }, {
    name: 'dashboard',
    path: '/dashboard',
    component: require('@/views/app/dashboard/index').default,
    meta: {auth: true, title: 'Dashboard - NannyGranny'}
  }, {
    name: 'subscription',
    path: '/subscription',
    component: require('@/views/app/subscription/index.vue').default,
    meta: {auth: ['parent'], title: 'My Subscription - NannyGranny'}
  },
  // NANNIES
  // ====================
  {
    path: '/nannies',
    component: require('@/views/app/nannies/nannies.vue').default,
    meta: {title: 'Find a NannyGranny - NannyGranny', postcode: null}
  }, {
    path: '/nanny-show/:nannyId',
    component: require('@/views/app/nannies/nanny-detail.vue').default,
    meta: {title: 'NannyGranny profile - NannyGranny', transitionName: 'scale-transition'},
    props: true
  },

  // JOBS
  // =====================
  {
    path: '/jobs',
    component: require('@/views/app/jobs/jobs.vue').default,
    meta: {title: 'Find a job - NannyGranny', postcodeId: null}
  }, {
    path: '/job-show/:jobId',
    component: require('@/views/app/jobs/job-detail.vue').default,
    meta: {title: 'Job - NannyGranny', transitionName: 'scale-transition'},
    props: true
  }, {
    name: 'job-post',
    path: '/job-post',
    component: require('@/views/app/jobs/job-post.vue').default,
    meta: {auth: ['parent'], title: 'Post job - NannyGranny'},
    props: {isListing: false}
  }, {
    name: 'job-listing',
    path: '/job-listing',
    component: require('@/views/app/jobs/job-update.vue').default,
    props: {isListing: true},
    meta: {auth: ['parent'], title: 'Job listing - NannyGranny'}
  },
  // INBOX
  // ====================
  {
    name: 'inbox',
    path: '/inbox',
    component: require('@/views/app/inbox/index.vue').default,
    meta: {auth: true, title: 'Inbox - NannyGranny'}
  },
  // CHAT
  // ====================
  {
    path: '/chat/:roomId(\\d+)',
    component: require('@/views/app/chat/index.vue').default,
    meta: {auth: true, title: 'Chat - NannyGranny'},
    props: true
  }, {
    path: '/chat/message-create',
    component: require('@/views/app/chat/chat-message-create.vue').default,
    meta: {auth: ['nanny'], title: 'Create a message - NannyGranny'}
  },
  // FAVOURITES
  // ====================
  {
    name: 'favourites',
    path: '/favourites',
    component: require('@/views/app/favourites/index.vue').default,
    meta: {auth: true, title: 'My favourites - NannyGranny'}
  },
  // CONNECTIONS
  // ====================
  {
    name: 'connections',
    path: '/connections',
    component: require('@/views/app/connections/index.vue').default,
    meta: {auth: true, title: 'My connections - NannyGranny'}
  },
  // ALERTS
  // ====================
  {
    name: 'alerts',
    path: '/alerts',
    component: require('@/views/app/alerts/index.vue').default,
    meta: {auth: true, title: 'My Alerts - NannyGranny'}
  },
  // REVIEWS
  // ====================
  {
    name: 'reviews',
    path: '/reviews',
    component: require('@/views/app/reviews/index.vue').default,
    meta: {auth: true, title: 'My Reviews - NannyGranny'}
  },
  // OTHER
  // ====================
  // {
  //   name: 'search',
  //   path: '/search-nanny',
  //   title: 'Find NannyGranny',
  //   component: require('@/views/app/search/search-nanny.vue').default
  // },
  // CLUBHOUSE
  // ====================
  {
    path: '/clubhouse',
    component: require('@/views/app/clubhouse/index.vue').default,
    meta: {title: 'ClubHouse - NannyGranny'},
    children: [
      {
        name: 'clubhouse',
        path: '/',
        component: require('@/views/app/clubhouse/public/index.vue').default
      }, {
        path: '/clubhouse/nanny',
        component: require('@/views/app/clubhouse/nanny/clubhouse-nanny.vue').default,
        meta: {auth: ['nanny']}
      }, {
        path: '/clubhouse/category/:categoryId(\\d+)',
        component: require('@/views/app/clubhouse/public/clubhouse-category.vue').default,
        props: true
      }, {
        path: '/clubhouse/article/:articleId(\\d+)',
        component: require('@/views/app/clubhouse/article/clubhouse-article.vue').default,
        props: true
      }, {
        path: '/clubhouse/forum',
        component: require('@/views/app/clubhouse/forum/clubhouse-forum.vue').default,
        meta: {auth: ['nanny']}
      }, {
        path: '/clubhouse/club/category/:categoryId(\\d+)',
        component: require('@/views/app/clubhouse/clubs/index.vue').default,
        meta: {auth: ['nanny']},
        props: true
      }, {
        path: '/clubhouse/club/:clubId(\\d+)',
        component: require('@/views/app/clubhouse/clubs/clubhouse-club-show.vue').default,
        meta: {auth: ['nanny']},
        props: true
      }
    ]
  },
  // CONTENT PAGES
  // ====================
  {
    name: 'contact-us',
    path: '/contact-us',
    component: require('@/views/content/contact-us/index.vue').default,
    meta: {title: 'Contact us - NannyGranny'}
  }, {
    name: 'about-us',
    path: '/about-us',
    component: require('@/views/content/about-us/index.vue').default,
    meta: {title: 'About us - NannyGranny'}
  }, {
    name: 'faqs',
    path: '/faqs',
    component: require('@/views/content/faqs/index.vue').default,
    meta: {title: 'FAQs - NannyGranny'}
  },
/*
  // {
    // name: 'safety',
    // path: '/safety',
    // component: require('@/views/content/safety/index.vue').default,
    // meta: {title: 'Online Safety - NannyGranny'}
  // },
*/
  {
    name: 'testimonials',
    path: '/testimonials',
    component: require('@/views/content/testimonials/index.vue').default,
    meta: {title: 'Testimonials - NannyGranny'}
  }, {
    name: 'how-it-works',
    path: '/how-it-works',
    component: require('@/views/content/how-it-works/index.vue').default,
    meta: {title: 'How it works - NannyGranny'}
  }, {
    name: 'legal',
    path: '/legal',
    component: require('@/views/content/legal/index.vue').default,
    meta: {title: 'Legal - NannyGranny'}
  }, {
    name: 'privacy-policy',
    path: '/privacy-policy',
    component: require('@/views/content/privacy-policy/index.vue').default,
    meta: {title: 'Privacy Policy - NannyGranny'}
  }, {
    name: 'child-care-rebate',
    path: '/child-care-rebate',
    component: require('@/views/content/child-care-rebate/index.vue').default,
    meta: {title: 'Child Care Subsidy - NannyGranny'}
  }, {
    path: '/404',
    name: 'not-found',
    component: require('@/views/errors/not-found.vue').default,
    meta: {title: '404 - NannyGranny'}
  }, {
    path: '/403',
    name: 'access-denied',
    component: require('@/views/errors/access-denied.vue').default,
    meta: {title: '403 - NannyGranny'}
  }, {
    path: '/500',
    name: 'server-error',
    component: require('@/views/errors/error.vue').default,
    meta: {title: '500 - NannyGranny'}
  }
]

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
// function lazyLoadView (AsyncView) {
//   const AsyncHandler = () => ({
//     component: AsyncView,
//     // A component to use while the component is loading.
//     loading: require('@/components/app-loading.vue').default,
//     // A fallback component in case the timeout is exceeded
//     // when loading the component.
//     error: require('@/views/errors/error.vue').default,
//     // Delay before showing the loading component.
//     // Default: 200 (milliseconds).
//     delay: 500,
//     // Time before giving up trying to load the component.
//     // Default: Infinity (milliseconds).
//     timeout: 10000
//   })
//
//   return Promise.resolve({
//     functional: true,
//     render (h, { data, children }) {
//       // Transparently pass any props or children
//       // to the view component.
//       return h(AsyncHandler, data, children)
//     }
//   })
// }
