import axios from 'axios'

export default {
  /**
   * Handle a registration request for the application.
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  social (data) {
    return axios.post(`/social`, data)
  },

  /**
   * Handle a registration request for the application.
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */

  registerEmail (data) {
    data.role_id = data.role // <- todo: to delete later
    return axios.post(`/register`, data)
  },

  /**
   * Update the user's account
   * @param {object} user
   * @returns {AxiosPromise<any>}
   */
  updateAccount (user) {
    return axios.post(`account`, user)
  },

  /**
   * Update the user's password
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  changePassword (data) {
    return axios.post('account/password', data)
  },

  /**
   * Update the user's password
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  forgotPasswordLink (data) {
    return axios.post('/forgotpasswordlink', data)
  },

  /**
   * Delete the user's account
   * @returns {AxiosPromise<any>}
   */
  deleteAccount () {
    return axios.delete('account')
  },

  /**
   * Update the nanny's profile
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  updateProfile (data) {
    return axios.post('profile', data)
  },

  /**
   * Update the nanny's profile
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  updateTheme (data) {
    return axios.post('account/themebody', data)
  },

  /**
   * Update the user's avatars
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  uploadImages (data) {
    return axios.post('profile/image', data)
  },

  /**
   * Delete the user's image
   * @param {number} id
   * @returns {AxiosPromise<any>}
   */
  deleteImage (id) {
    return axios.delete('profile/image/' + id)
  },

  /**
   * Delete the user's images
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  deleteImages (data) {
    return axios.delete('profile/image')
  },

  /**
   * Get alerts data
   * @returns {AxiosPromise<any>}
   */
  getAlerts () {
    return axios.get('alerts')
  },

  /**
   * Update alert data for user
   * @returns {AxiosPromise<any>}
   */
  updateAlerts (data) {
    return axios.post('alerts', data)
  },

  /**
   * Create or update the user's subscriptions
   * @param {object} user
   * @param {string} user.stripe_token
   * @param {number} user.plan
   * @returns {Promise<any>}
   */
  subscriptions (user) {
    // return axios.post('subscriptions', data)
    // For testing
    return new Promise((resolve, reject) => {
      resolve(user)
    })
  }
}
