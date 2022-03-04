import axios from 'axios'

export default {
  /**
   * Get the list of nannies
   * @param data
   * @returns {AxiosPromise<any>}
   */
  find (data) {
    if (!data.per_page) {
      data.per_page = 6
    }
    return axios.post('nanny/find', data)
  },
  /**
   * Get the list of nannies by id
   * @param data
   * @returns {AxiosPromise<any>}
   */
  findByIds (data) {
    return axios.post('nanny/recently', data)
  },
  /**
   * Get the list of nannies
   * @param params
   * @returns {AxiosPromise<any>}
   */
  getByAlerts (params) {
    return axios.get('nanny/byalerts', params)
  },
  /**
   * Get the list of nannies for homepage
   * @param params
   * @returns {AxiosPromise<any>}
   */
  forHomepage (params) {
    return axios.get('nanny/forhome', params)
  },
  /**
   * Get nanny by id
   * @param {integer} id
   * @returns {AxiosPromise<any>}
   */
  show (id) {
    return axios.get(`nanny/${id}`)
  },
  /**
   * Get connects
   * @param {Number} status
   * @returns {AxiosPromise<any>}
   */
  connect (status) {
    return axios.get(`nanny/connect/${status}`)
  },
  /**
   * Send connect request to nanny
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  connectRequest (data) {
    return axios.post('nanny/connect', data)
  },
  /**
   * Set approve request
   * @param {Number} id
   * @param {Number} status
   * @returns {AxiosPromise<any>}
   */
  connectApprove (id, status) {
    return axios.post(`nanny/connect/${id}/${status}`)
  },

  /**
   * Send recommend to friend
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  recommend (data) {
    return axios.post('nanny/recommend', data)
  },
  /**
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  notifyAvailable (data) {
    return axios.post('nanny/notify/email', data)
  },
  /**
   * Send and Update WWC Form to Check
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  wwcForm (data) {
    return axios.post('wwcform', data)
  }
}
