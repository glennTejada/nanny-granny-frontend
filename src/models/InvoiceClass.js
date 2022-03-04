export default class Invoice {
  constructor (rawData = {}) {
    this.id = rawData.id
    this.status = rawData.authMessage
    this.plan_id = rawData.plan_id
    this.promocode = rawData.promocode
    this.name = rawData.transactionProduct
    this.amount = rawData.transactionAmount || 0
    this.currency = rawData.transactionCurrency
    this.created_at = rawData.created_at
    this.link_download = rawData.link
  }

  setAmount (amount) {
    this.amount = amount
  }
}
