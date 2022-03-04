import axios from 'axios'

export default {
  /**
   * Get list of messages
   * @returns {AxiosPromise<any>}
   */
  get (params) {
    return axios.get('inbox/all', {params: params})
  },

  /**
   * Set read by room
   * @returns {AxiosPromise<any>}
   */
  setReadForMessages (roomId) {
    return axios.get(`/inbox/room/${roomId}`)
  },

  /**
   * Delete the chat
   * @param {Object} data id of chats
   * @returns {Promise<any>}
   */
  delete (data) {
    return axios.delete(`inbox`, {data: data})
  }
}
