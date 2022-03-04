import BaseUser from './BaseUserClass'
import Store from '../../store/index'
import _lodash from 'lodash'
// import { IMAGE_BASE_URL } from '../../config/constants'

export default class Nanny extends BaseUser {
  constructor (rawData = {}) {
    super(rawData)
    if (rawData) {
      this.is_forumprofilevisible = rawData.is_forumprofilevisible || 1
      this.is_jobprofilevisible = rawData.is_jobprofilevisible || 0
      this.is_livestatusvisible = rawData.is_livestatusvisible || 1
      this.is_wwcverify = rawData.is_wwcverify || 0
      this.is_favorite = rawData.is_favorite
      this.rating = rawData.rating || 0
      this.price_min = rawData.price_min || 0
      this.price_max = rawData.price_max || 0
      // Settings
      this.availability_list = rawData.availability_list || this.toJson((rawData.settings || {}).availability_list) || []
      this.child_age_list = rawData.child_age_list || this.toJson((rawData.settings || {}).child_age_list) || []
      this.child_count = rawData.child_count || this.toJson((rawData.settings || {}).child_count) || 0
      this.type_work_list = rawData.type_work_list || this.toJson((rawData.settings || {}).type_work_list) || []
      this.personal_questions_list = rawData.personal_questions_list || this.toJson((rawData.settings || {}).personal_questions_list) || []
      this.work_preferences_list = rawData.work_preferences_list || this.toJson((rawData.settings || {}).work_preferences_list) || []
      this.residence_status_list = rawData.residence_status_list || this.toJson((rawData.settings || {}).residence_status_list) || []
      this.theme_body = rawData.theme_body || this.toJson((rawData.settings || {}).theme_body)
      this.date_birthday = rawData.date_birthday || this.toJson((rawData.settings || {}).date_birthday)
      this.description = rawData.description || this.toJson((rawData.settings || {}).description)
      this.gender = rawData.gender || this.toJson((rawData.settings || {}).gender)
      this.languages = rawData.languages || this.toJson((rawData.settings || {}).languages)
      this.music_instruments = rawData.music_instruments || this.toJson((rawData.settings || {}).music_instruments)
      this.recent_police_check = rawData.recent_police_check || Number((rawData.settings || {}).recent_police_check)
      this.school_subject = rawData.school_subject || this.toJson((rawData.settings || {}).school_subject)
      this.sports = rawData.sports || this.toJson((rawData.settings || {}).sports)
      this.work_distance = rawData.work_distance || Number((rawData.settings || {}).work_distance) || 0
      this.years_exp = rawData.years_exp || Number((rawData.settings || {}).years_exp) || 0
    }
  }

  genderName () {
    return Store.getters['catalogs/gender'].filter((item) => item.id === this.gender)[0].name
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

  residenceList () {
    let _list = this.residence_status_list || []
    if (Array.isArray(_list)) {
      return Store.getters['catalogs/residenceStatuses'].filter((item) => _list.includes(item.id))
    } else {
      _list = [_list]
    }

    return _list
  }

  skills () {
    let _data = _lodash.compact([this.music_instruments, this.sports, this.school_subject])
    return _data.join(', ')
  }
}
