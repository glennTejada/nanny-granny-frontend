import ConnectUserClass from './ConnectUserClass'

export default class GroupUser {
  constructor (rawData = {}, authID) {
    this.id = rawData.id
    this.members = this.convertUsers(rawData.users, authID)
    this.name = rawData.name || this.getName()
    this.created_at = rawData.created_at
  }

  convertUsers (users = [], authID) {
    const _data = []
    for (let i = 0; i < users.length; i++) {
      if (authID === users[i].id) continue
      _data.push(new ConnectUserClass({id: users[i].id, user: users[i]}))
    }
    return _data
  }

  getName () {
    if (this.name) {
      return this.name
    }
    let _name = ''
    this.members.forEach((v, k) => {
      if (k > 0) _name += ', '
      _name += v.user.first_name
    })
    return _name
  }
}
