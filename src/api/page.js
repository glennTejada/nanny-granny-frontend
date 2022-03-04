import axios from 'axios'

export default {
  /**
   * Get all page of system
   * @returns {AxiosPromise<any>}
   */
  getListPage () {
    return axios.get('/page/all')
  },

  /**
   * Get all page of system
   * @returns {AxiosPromise<any>}
   */
  getAllPageData () {
    return axios.get('/page/alldata')
  },

  /**
   * Get all testimonials of system
   * @param {String} path all|forhome
   * @param {Object} query
   * @returns {AxiosPromise<any>}
   */
  testimonials (path = 'all', query = {}) {
    return axios.get(`/testimonials/${path}`, {params: query})
  },

  /**
   * Send an email to the admin
   * @param {String} path all|forhome
   * @param {Object} query
   * @returns {AxiosPromise<any>}
   */
  contactus (data) {
    return axios.post(`/contactus`, data)
  }
}
