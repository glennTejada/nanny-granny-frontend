import Message from './MessageClass'
import Nanny from '../user/NannyClass'
import Club from '../ClubClass'

export default class Post extends Message {
  constructor (rawData = {}) {
    super(rawData)

    this.count_reply = rawData.countmess || 0
    this.user = rawData.user instanceof Nanny
      ? rawData.user : new Nanny(rawData.user)
    this.club = new Club(rawData.club)
    this.setReplies(rawData.items)
  }

  setReplies (replies) {
    let _collection = []
    if (Array.isArray(replies)) {
      for (let item of replies) {
        delete item.items
        _collection.push(new Post(item))
      }
    }
    this.replies = _collection
  }
}
