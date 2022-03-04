import axios from 'axios'

// Types:
// 0 -> article
// 1 -> nanny
// 2 -> job
// 3 -> club
export default {
  /**
   * Get all favourite by a type
   * @param {number} type
   * @returns {AxiosPromise<any>}
   */
  get (type) {
    return axios.get('favorites/' + type)
  },

  /**
   * Add in favourite by a type
   * @param {integer} type
   * @param {integer} id
   * @returns {AxiosPromise<any>}
   */
  add (type, id) {
    return axios.post(`favorites`, {type: type, id: id})
  },

  /**
   * Add a note in the favourite
   * @param {integer} type
   * @param {integer} id
   * @param {string} notes
   * @returns {AxiosPromise<any>}
   */
  addNote (type, id, notes) {
    return axios.post(`favorites/addnote`, {type: type, id: id, notes: notes})
  },

  /**
   * Delete favourite from the storage
   * @param {integer} type
   * @param {integer} id
   * @returns {AxiosPromise<any>}
   */
  delete (type, id) {
    return axios.delete(`favorites/${type}/${id}`)
  }
}
