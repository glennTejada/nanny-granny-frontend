import Parent from '../user/ParentClass'
import Nanny from '../user/NannyClass'
import Room from './RoomClass'
import _ from 'lodash'

export default class BaseMessage {
  constructor (rawData = {}) {
    this.id = rawData.id
    this.parent_id = rawData.parent_id
    this.chat_room_id = rawData.chat_room_id
    this.message = rawData.message
    this.is_read = rawData.is_read > 0
    this.created_at = rawData.created_at
    this.image = rawData.image

    this.setUser(rawData.user)
    this.setClub(rawData.club)
  }

  setUser (rawUser) {
    let _user = new Parent(rawUser)
    if (_user.role === 'nanny') {
      this.user = new Nanny(rawUser)
    } else {
      this.user = _user
    }
  }

  setClub (rawClub) {
    this.room = new Room(rawClub)
  }

  checkType (name) {
    if (!name) return
    let _type = _.isEmpty(this.image) ? 'text' : 'file'
    return name.toString().toLowerCase() === _type
  }
  getAvatarRoom (authId) {
    if (_.isEmpty(this.room)) {
      return this.user.getAvatarUrl()
    } else {
      if (!this.room.isGroup()) {
        let path = ``
        for (let i = 0; i < this.room.users.length; i++) {
          if (this.room.users[i].id !== authId) {
            path = this.room.users[i].getAvatarUrl()
            break
          }
        }
        return path
      } else {
        return `/static/img/logo/NG_LOGO-149x149.png`
      }
    }
  }
}
