import Parent from './user/ParentClass'

export default class Testimonial {
  constructor (rawData = {}) {
    this.id = rawData.id
    this.text = rawData.name
    this.rating = rawData.rating || 0
    this.user = new Parent(rawData.user)
    this.count_child = rawData.count_child
  }
}
