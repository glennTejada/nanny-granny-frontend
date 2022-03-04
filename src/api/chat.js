import axios from 'axios'

export default {
  /**
   * Get room id by the chat
   * @param {Object} data, ids of users
   * @returns {AxiosPromise<any>}
   */
  getRoom (data) {
    return axios.post('chat/room', data)
  },
  /**
   * Get room by id
   * @param {Number} roomId, id room
   * @returns {AxiosPromise<any>}
   */
  getRoomById (roomId) {
    return axios.get(`chat/room/${roomId}`)
  },
  /**
   * Get messages by the chat
   * @param {Object} type
   * @param {Object} params
   * @returns {AxiosPromise<any>}
   */
  getMessageByRoom (type, params) {
    return axios.get(`${type.name}/${type.id}/message`, {params: params})
  },
  /**
   * Get reply by the message
   * @param {Number} roomId
   * @param {Number} parentId
   * @param {Object} params
   * @returns {AxiosPromise<any>}
   */
  getReplyByRoom (roomId, parentId, params) {
    return axios.get(`chat/${roomId}/message/${parentId}`, {params: params})
  },
  /**
   * Get messages by the club
   * @param {Object} type
   * @param {Object} data
   * @returns {AxiosPromise<any>}
   */
  storeMessage (type, data = {}) {
    return axios.post(`${type.name}/${type.id}/message`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  // ========================
  // CLUBS
  // ========================
  /**
   * Get messages by the user
   * @param {number} userId
   * @param {object} params
   * @returns {AxiosPromise<any>}
   */
  getMessageByUser (userId, params = {}) {
    // return axios.get(`club/category/${id}`, {params: params})
  },

  /**
   * Get messages by the club
   * @param {number} clubId
   * @param {object} data
   * @returns {AxiosPromise<any>}
   */
  storeMessageByClub (clubId, data = {}) {
    return axios.post(`club/${clubId}/message`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  // ========================
  // GROUP
  // ========================

  /**
   * Gets group of users
   * @param {Object} params
   * @returns {AxiosPromise<any>}
   */
  getConnectGroups (params) {
    return axios.get('/chat/room/group', {params})
  },

  /**
   * Get connects
   * @param {Object} query
   * @returns {AxiosPromise<any>}
   */
  findConnections (query) {
    return axios.get('chat/connects', {params: query})
  },

  /**
   * Invite users to the group
   * @param {Object} params
   * @returns {AxiosPromise<any>}
   */
  inviteToGroup ({roomId, data}) {
    return axios.post(`/chat/room/${roomId}/users`, data)
  },

  /**
   * Make group of users
   * @param {Object} params
   * @returns {AxiosPromise<any>}
   */
  createGroup ({roomId, data}) {
    return axios.get(`/chat/room/${roomId}/users`, data)
  },

  /**
   * Update name group
   * @param {Object} data
   * @returns {AxiosPromise<any>}
   */
  updateNameGroup (roomId, data) {
    return axios.put(`/chat/room/${roomId}`, data)
  },

  /**
   * Update name group
   * @param {Object} data
   * @returns {AxiosPromise<any>}
   */
  deleteGroups (data) {
    return Promise.resolve(data)
  }
}
