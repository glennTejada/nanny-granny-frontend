import _lodash from 'lodash'

export default class BaseUser {
  constructor (rawData = {}) {
    this.id = (rawData ? rawData.id : 0)
    this.role = (rawData ? this.toJson((rawData.role || {}).name) : {})
    this.email = (rawData ? rawData.email : '')
    this.first_name = (rawData ? rawData.first_name : '')
    this.last_name = (rawData ? rawData.last_name : '')
    this.phone = (rawData ? rawData.phone : '')
    this.postcode = (rawData ? rawData.postcode || this.toJson((rawData.settings || {}).postcode) : '')
    this.avatar = rawData.avatar
    this.images = rawData.images || []
    this.is_registred = (rawData ? rawData.is_registred > 0 : false)
    this.created_at = (rawData ? rawData.created_at || '2018-10-01' : '2018-10-01')
  }

  toJson (val) {
    try {
      return JSON.parse(val)
    } catch (e) {
      return val
    }
  }

  getAvatarUrl () {
    let path = this.avatar || (this.images ? this.images[0] : undefined) || undefined
    if (this.role !== 'nanny') {
      path = `/static/img/def/NG-no-photo.png`
    }
    if (path && _lodash.isObject(path)) {
      path = _lodash.get(path, 'path', undefined)
    }

    return path || undefined
  }

  fullName () {
    return `${this.first_name} ${this.last_name}`
  }

  initials () {
    return this.first_name.slice(0, 1) + this.last_name.slice(0, 1)
  }
}
