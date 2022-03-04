import Club from './ClubClass'

export default class MeetUp {
  constructor (rawData = {}) {
    this.id = rawData.id
    this.club = new Club(rawData.parent)
    this.date_event = rawData.date_event
    this.count_members = rawData.count_members
    this.is_favorite = rawData.is_favorite
    this.place = {
      address_name: rawData.address_name,
      latitude: rawData.lat,
      longitude: rawData.lng
    }
  }
}
