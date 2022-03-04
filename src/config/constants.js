// Testing
export const DEBUG = true

// Backend API endpoints
// export const SOCKET_URL = 'http://nannyg.loc:3000'
// export const API_BASE_URL = 'http://nannyg.loc/api/v1/'
// export const IMAGE_BASE_URL = 'http://nannyg.loc/'
export const SOCKET_URL = 'https://audev.api.nannygranny.com.au:3000'
export const API_BASE_URL = 'https://audev.api.nannygranny.com.au/api/v1/'
export const IMAGE_BASE_URL = 'https://audev.api.nannygranny.com.au/'
export const AUTH_PATH_URL = 'login'
export const AUTH_FETCH_USER_URL = 'account'
export const ANIMATION_UP = 0.15
export const ANIMATION_DOWN = -0.15
export const UPLOAD_AVATAR_URL = API_BASE_URL + 'profile/image'
// Credentials
// export const GOOGLE_API_KEY = 'AIzaSyCMmntwMOqxGgYl6_i8k2azYodPSHPEXpk'
export const GOOGLE_API_KEY = 'AIzaSyDvBBhw56PaeaAFM5Fa7ylgmMvTBM0oMfs'
export const GOOGLE_CLIENT_ID = '391776929652-d7rfuu722103aq8iansqd5kbd2q9vdql.apps.googleusercontent.com'
export const GOOGLE_ANALYTICS_ID = 'UA-135636561-1'

export const FB_CLIENT_ID = '472841546456035'

/**
 * Key for local storage.
 *
 * Set the key to use in local storage to hold persistant data. If logged in,
 * you can see this key by going to Chrome > dev tools > application tab,
 * then choosing "Local Storage" and "http://localhost:8080".
 *
 * @type {string}
 */
export const AUTH_KEY = '_token'

export const USER_ROLES = {
  PARENT: 'parent',
  NANNY: 'nanny'
}
