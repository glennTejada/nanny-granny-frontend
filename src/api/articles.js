import axios from 'axios'

export default {
  /**
   * Get last article
   * @returns {AxiosPromise<any>}
   */
  get (params) {
    return axios.get('/article', {params})
  },

  /**
   * Get article for Home
   * @returns {AxiosPromise<any>}
   */
  getForHome (params) {
    return axios.get('/article/forhome', {params})
  },

  /**
   * Get articles by category
   * @param {number} id
   * @param {object} params
   * @returns {AxiosPromise<any>}
   */
  getByCategory (id, params = {}) {
    return axios.get(`/article/category/${id}`, {params})
  },

  /**
   * Get a article by id
   * @param {integer} id
   * @returns {AxiosPromise<any>}
   */
  show (id) {
    return axios.get(`/article/${id}`)
  },

  /**
   * Get categories of articles
   * @returns {AxiosPromise<any>}
   */
  categories () {
    return axios.get('article/categories')
  },

  /**
   * Subscribe to receive the latest feed
   * @returns {AxiosPromise<any>}
   */
  subscribeReceive (data) {
    return axios.post('article/notify', data)
  }
}
