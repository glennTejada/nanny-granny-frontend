import axios from 'axios'

export default {
  /**
   * Get the list of jobs
   * @param data
   * @returns {AxiosPromise<any>}
   */
  find (data) {
    if (!data.per_page) {
      data.per_page = 9
    }
    return axios.post('job/find', data)
  },
  /**
   * Get the list of jobs by id
   * @param data
   * @returns {AxiosPromise<any>}
   */
  findByIds (data) {
    return axios.post('job/recently', data)
  },
  /**
   * Get the list of jobs
   * @param params
   * @returns {AxiosPromise<any>}
   */
  getByAlerts (params) {
    return axios.get('job/byalerts', params)
  },
  /**
   * Get the job
   * @param {integer} id
   * @returns {AxiosPromise<any>}
   */
  show (id) {
    return axios.get(id ? `job/${id}` : 'job')
  },
  /**
   * Store a new job
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  store (data) {
    return axios.post('job', data)
  },
  /**
   * Update the job
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  update (data) {
    return axios.put('job', data)
  },
  /**
   * Send recommend to friend
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  recommend (data) {
    return axios.post('job/recommend', data)
  },
  /**
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  notifyAvailable (data) {
    return axios.post('job/notify/email', data)
  }
}
