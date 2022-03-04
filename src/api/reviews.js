import axios from 'axios'

export default {
  /**
   * Get all reviews that set current user
   * or all reviews that set to user
   * @param {String} path forme|my
   * @returns {AxiosPromise<any>}
   */
  fetch (path = 'my') {
    return axios.get(`reviews/${path}`)
  },
  /**
   * Get all reviews user
   * @param {integer} id
   * @returns {AxiosPromise<any>}
   */
  fetchForUser (id) {
    return axios.get(`reviews/forme/${id}`)
  },
  /**
   * Store a new review
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  store (data) {
    return axios.post('reviews', data)
  },
  /**
   * Store a new review
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  update (data) {
    return axios.put('reviews', data)
  },
  /**
   * Delete the review
   * @param {Object} data
   * @returns {AxiosPromise<any>}
   */
  remove (data) {
    return axios.delete(`reviews`, {params: data})
  }
}
