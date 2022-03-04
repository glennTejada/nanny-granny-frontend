import Nanny from './user/NannyClass'

export default class Club {
  constructor (rawData = {}) {
    this.id = rawData.id
    this.name = rawData.name
    this.category = rawData.category
    this.svg_name = rawData.svg_name
    this.count_posts = rawData.count_posts || 0
    this.count_members = rawData.count_members || 0
    this.is_favorite = rawData.is_favorite
    this.user = new Nanny(rawData.user_from)
    this.user_from_id = rawData.user_from_id
    this.created_at = rawData.created_at
    this.postcode = rawData.postcode
    this.last_message = (rawData.last_message || {}).created_at
  }
}
