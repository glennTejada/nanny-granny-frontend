import Store from '../store'

export default class Job {
  constructor (rawData = {}) {
    this.id = rawData.id
    this.user_id = (rawData.user || {}).id
    this.name = rawData.name
    this.date_start = rawData.date_start
    this.date_close = rawData.date_close
    this.postcode = rawData.postcode || this.toJson((rawData.user || rawData.settings || {}).postcode) || {}
    this.price_max = rawData.price_max
    this.price_min = rawData.price_min
    this.is_visible = rawData.is_visible
    this.is_wwcverify = rawData.is_wwcverify
    this.is_favorite = rawData.is_favorite
    this.description = rawData.description || this.toJson((rawData.settings || {}).description)
    this.type_work_list = rawData.type_work_list || this.toJson((rawData.settings || {}).type_work_list)
    this.availability_list = rawData.availability_list || this.toJson((rawData.settings || {}).availability_list)
    this.child_age_list = rawData.child_age_list || this.toJson((rawData.settings || {}).child_age_list)
    this.personal_questions_list = rawData.personal_questions_list || this.toJson((rawData.settings || {}).personal_questions_list)
    this.work_preferences_list = rawData.work_preferences_list || this.toJson((rawData.settings || {}).work_preferences_list)
    this.theme_body = rawData.theme_body || this.toJson((rawData.settings || {}).theme_body)
    this.child_count = rawData.child_count || this.toJson((rawData.settings || {}).child_count)
  }

  toJson (val) {
    try {
      return JSON.parse(val)
    } catch (e) {
      return val
    }
  }

  typeWorkList () {
    let _work = this.type_work_list || []
    if (Array.isArray(_work)) {
      return Store.getters['catalogs/workTypes'].filter((item) => _work.includes(item.id))
    } else {
      _work = [_work]
    }
    return _work
  }
}
