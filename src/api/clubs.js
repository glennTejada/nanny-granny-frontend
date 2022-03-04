import axios from 'axios'

export default {
  /**
   * Get clubs by category
   * @param {number} id
   * @param {object} params
   * @returns {AxiosPromise<any>}
   */
  getByCategory (id, params = {}) {
    return axios.get(`club/category/${id}`, {params: params})
  },
  /**
   * Get clubs by category
   * @param {number} id
   * @param {object} params
   * @returns {AxiosPromise<any>}
   */
  getByUser (id, params = {}) {
    return axios.get(`club/user/${id}`, {params: params})
  },

  /**
   * Get a article by id
   * @param {integer} id
   * @returns {AxiosPromise<any>}
   */
  show (id) {
    return axios.get(`club/${id}`)
  },

  /**
   * Make club by category
   * @param {integer} categoryId
   * @param {Object} data
   * @returns {AxiosPromise<any>}
   */
  store (categoryId, data) {
    return axios.post(`club/category/${categoryId}`, data)
  },

  /**
   * Update club by category
   * @param {integer} clubId
   * @param {Object} data
   * @returns {AxiosPromise<any>}
   */
  update (clubId, data) {
    return axios.put(`club/${clubId}`, data)
  },

  /**
   * Delete club by id
   * @param {integer} clubId
   * @returns {AxiosPromise<any>}
   */
  delete (clubId) {
    // todo
    return axios.delete(`club/${clubId[0]}`)
  },

  /**
   *  Get messages of club by user
   * @param {Number} userId
   * @param {Object} params
   * @returns {AxiosPromise<any>}
   */
  getMessagesByUser (userId, params) {
    return axios.get(`club/user/${userId}/messages`, {params: params})
  },
  /**
   *  Get latest posts of club
   * @param {Object} params
   * @returns {AxiosPromise<any>}
   */
  getLatestMessages (params) {
    return axios.get(`club/messages/latest`, {params: params})
  },

  /**
   * Get categories of club
   * @param {Object} params
   * @returns {AxiosPromise<any>}
   */
  categories (params) {
    return axios.get('club/categories')
  },

  /**
   * Get categories of club
   * @param {Object} data
   * @returns {AxiosPromise<any>}
   */
  storeCategory (data) {
    return axios.post('club/category', data)
  },
  // ================
  // MEET-UP
  // ================
  /**
   * Get meet-up of club
   * @param {Object} params
   * @returns {AxiosPromise<any>}
   */
  meetupByClub (params) {
    return axios.get('meetupbyroom', {params})
  },
  /**
   * Get meet-up of club
   * @param {Object} params
   * @returns {AxiosPromise<any>}
   */
  meetupByCategory (params) {
    return axios.get('meetupbycategory', {params})
  },

  /**
   * Make meet-up by category club
   * @param {Object} data
   * @returns {AxiosPromise<any>}
   */
  storeMeetUp (data) {
    return axios.post('meetup', data)
  }
}
