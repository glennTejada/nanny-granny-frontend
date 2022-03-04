import axios from 'axios'

export default {
  /**
   * Gets notifications of user for a dashboard
   * @param {String} role The user role
   * @returns {AxiosPromise<any>}
   */
  dashboard (role) {
    return axios.get(`/${role}dashboard`)
  }
}
