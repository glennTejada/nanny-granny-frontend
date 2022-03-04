import axios from 'axios'

export default {
  find (query) {
    return axios.get('/findsuburb?q=' + query)
  }
}
