export default class Alerts {
  constructor (rawData = []) {
    this.day_of_send = []
    this.type_work_list = []
    this.availability_list = []
    this.child_age_list = []
    this.personal_questions_list = []
    this.work_preferences_list = []
    this.gender_list = []
    this.postcode_id = null
    this.postcode = null
    this.pay_per_hour = 0
    this.years_exp = 0
    this.work_distance = 0
    this.child_count = 0
    // sync
    rawData.forEach((item) => {
      if (this[item.meta_key] !== undefined) {
        try {
          let _val = JSON.parse(item.meta_value)
          this[item.meta_key] = (Array.isArray(this[item.meta_key]) && !_val)
            ? []
            : _val
        } catch (e) { }
      }
    })
  }
}
