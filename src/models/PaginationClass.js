export default class Pagination {
  constructor (rawData = {}) {
    this.total = rawData.total || 0
    this.per_page = rawData.per_page || 5
    this.current_page = rawData.current_page || 1
    this.last_page = rawData.last_page || 1
  }
}
