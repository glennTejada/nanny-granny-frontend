// import axios from 'axios'

export default {
  /**
   * Get the list of posts
   * @param params
   * @returns {AxiosPromise<any>}
   */
  get (params) {
    // return axios.get('job/find', data)
    return Promise.resolve([
      {
        id: 1,
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. Mauris elit orci, ultricies id fermentum vel, porta et eros. Vestibulum',
        created_at: '2019-01-14 14:00:00',
        club: {id: 1, name: 'Book Club'},
        is_connection: false,
        user: {first_name: 'Teresa'}
      }, {
        id: 2,
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. Mauris elit orci, ultricies id fermentum vel, porta et eros. Vestibulum',
        club: {id: 2, name: 'Tea Club'},
        created_at: '2019-01-13 20:00:00',
        is_connection: false,
        user: {first_name: 'Laura'}
      }, {
        id: 3,
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. Mauris elit orci, ultricies id fermentum vel, porta et eros. Vestibulum',
        club: {id: 3, name: 'Face Club'},
        created_at: '2019-01-12 08:00:00',
        is_connection: false,
        user: {first_name: 'Sarah'}
      }
    ])
  }
}
