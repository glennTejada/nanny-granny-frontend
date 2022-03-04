import Nanny from './user/NannyClass'

export default class ConnectUser {
  constructor (rawData = {}) {
    this.id = rawData.id
    this.name = rawData.created_at
    this.created_at = rawData.created_at

    this.user = new Nanny(rawData.user)
  }
}
