import { AUTH_FETCH_USER_URL, AUTH_PATH_URL, AUTH_KEY, GOOGLE_CLIENT_ID, FB_CLIENT_ID } from './constants'
import { parseUserData as parseUser } from '../util/index'

export default {
  // auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  auth: {
    request: function (req, token) {
      this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token})
    },
    response: function (res) {
      let token = (res.data || {}).token
      if (token) {
        return token.trim()
      }
    }
  },
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  authRedirect: {path: '/login'},
  loginData: {
    url: AUTH_PATH_URL,
    fetchUser: false,
    redirect: '/dashboard'
  },
  logoutData: {
    url: 'logout',
    redirect: 'login'
  },
  rolesVar: 'role',
  fetchData: {url: AUTH_FETCH_USER_URL, enabled: true},
  refreshData: {enabled: false},
  parseUserData: (data) => parseUser(data),
  tokenDefaultName: AUTH_KEY,
  tokenExpired: false,
  facebookOauth2Data: {
    clientId: FB_CLIENT_ID, // <- app
    scope: 'email,user_photos'
  },
  googleOauth2Data: {
    clientId: GOOGLE_CLIENT_ID
  }
}
