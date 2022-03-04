import Nanny from './user/NannyClass'
import Parent from './user/ParentClass'

export default class Review {
  constructor (rawData = {}) {
    this.id = rawData.id
    this.review_text = rawData.review_text
    this.rating = rawData.rating || 0
    this.review_user = new Nanny(rawData.review_user)
    this.user = new Parent(rawData.user)
  }
}
