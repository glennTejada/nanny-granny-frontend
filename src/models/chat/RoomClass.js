import BaseUserClass from '../user/BaseUserClass'
import Parent from '../user/ParentClass'
import Nanny from '../user/NannyClass'

export default class Room {
  constructor (rawData = {}) {
    this.id = rawData.id
    this.name = rawData.name
    this.is_group = rawData.is_group
    this.user_from_id = rawData.user_from_id
    this.user_to_id = rawData.user_to_id
    this.users = this.convertUsers(rawData.users)
    this.setUserFrom(rawData.user_from)
    this.setUserTo(rawData.user_to)
  }

  setUserFrom (rawUser) {
    let _user = new Parent(rawUser)
    if (_user.role === 'nanny') {
      this.user_from = new Nanny(rawUser)
    } else {
      this.user_from = _user
    }
  }

  setUserTo (rawUser) {
    if (rawUser == null) {
      this.user_to = null
      return
    }
    let _user = new Parent(rawUser)
    if (_user.role === 'nanny') {
      this.user_to = new Nanny(rawUser)
    } else {
      this.user_to = _user
    }
  }

  isGroup () {
    if (this.is_group === 0) {
      return false
    } else {
      return true
    }
  }

  convertUsers (users) {
    const _users = []
    if (Array.isArray(users)) {
      users.forEach((item) => {
        _users.push(new BaseUserClass(item))
      })
    }
    return _users
  }

  getInterlocutor (authUserId) {
    const _users = []
    this.users.forEach((item) => {
      if (item.id !== authUserId) {
        _users.push(item)
      }
    })
    return _users
  }

  getInterLocutorName (authUserId) {
    let userNames = ''
    if (this.name) {
      return this.name
    }
    this.getInterlocutor(authUserId).forEach((item, i) => {
      if (i > 0) userNames += ', '
      userNames += item.first_name
    })
    return userNames
  }
}
