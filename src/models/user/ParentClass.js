import BaseUser from './BaseUserClass'
import Store from '@/store/index'
import _ from 'lodash'

export default class Parent extends BaseUser {
  constructor (rawData = {}) {
    super(rawData)
    this.subscription = !_.isEmpty(rawData.subscription) ? rawData.subscription : null
  }

  plan () {
    if (this.subscription) {
      return Store.getters['subscription/getPlan'](this.subscription.plan_id)
    }
    return null
  }
}
