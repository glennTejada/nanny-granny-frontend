export default class Article {
  constructor (rawData = {}) {
    this.id = rawData.id
    this.name = rawData.name
    this.address_name = rawData.address_name
    this.category = (rawData.category || {}).name
    this.category_id = rawData.category_id
    this.image = rawData.image || {}
    this.description = rawData.description
    this.is_favorite = rawData.is_favorite
    this.created_at = rawData.created_at
    this.author = rawData.author
  }

  getText () {
    if (!this.description) return ''
    return this.description.replace(/<[^>]+>/g, '')
  }

  imageUrl () {
    return this.image.path
  }
}
