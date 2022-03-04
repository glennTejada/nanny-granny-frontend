import axios from 'axios'
// Display the resource of the specified catalog.
export default {
  /**
   * Get all list of system with items
   * @returns {AxiosPromise<any>}
   */
  getAllData () {
    return axios.get('list/alldata')
  },
  /**
   * Get WWC Form by State
   * @returns {AxiosPromise<any>}
   */
  getWwcForm (state) {
    return axios.get(`wwcform/${state}`)
  },
  /**
   * Get list of State for the WWC Form
   * @returns {AxiosPromise<any>}
   */
  getWwcFormLocation () {
    // return axios.get(`wwcform/${state}`)
    return Promise.resolve([
      {id: 1, name: 'NSW'},
      {id: 2, name: 'VIC'},
      {id: 3, name: 'QLD'},
      {id: 4, name: 'WA'},
      {id: 5, name: 'SA'},
      {id: 6, name: 'ACT'}
    ])
  }
}
