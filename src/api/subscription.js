import axios from 'axios'

export default {
  /**
   * Get all plans of system
   * @returns {AxiosPromise<any>}
   */
  getPlans () {
    return axios.get('/payment/plans')
  },

  /**
   * Check promocode
   * @param data
   * @returns {AxiosPromise<any>}
   */
  checkPromocode (data) {
    return axios.post('payment/promocode/check', data)
  },

  /**
   * Get all invoice user
   * @returns {AxiosPromise<any>}
   */
  getAllInvoices (params) {
    return axios.get('payment/invoice/all', {params})
  },

  /**
   * Make Payment Credit Card
   * @param data
   * @returns {AxiosPromise<any>}
   */
  paymentCreditCard (data) {
    return axios.post('payment/make/creditcard', data)
  }
}
