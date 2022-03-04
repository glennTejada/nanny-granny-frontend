export default class WwcForm {
  constructor (rawData = {}) {
    this.id = rawData.id
    this.name = rawData.name
    this.pivot = rawData.pivot
    this.description = rawData.description || this.getDescription(rawData.orderby)
    this.actionButtonText = this.getButtonText(rawData.orderby)
    this.component = this.geComponentName(rawData.orderby)
    this.isChooseLocation = rawData.orderby === 4
    // todo
    this.redirect_link = rawData.redirect_link || 'http://www.workingwithchildren.vic.gov.au'
  }

  getDescription (orderBy) {
    const data = [
      'NannyGranny must verify this qualification to display it on your profile.',
      'Learn about the [number_name] working with Children Check and how to apply for certificate.',
      'NannyGranny must verify your exemption in order to display it on your profile.',
      'Verify your clearance in another State or Territory.'
    ]
    return data[orderBy - 1]
  }

  getButtonText (orderBy) {
    const data = [
      'Verify now',
      'Find out more',
      'Verify now',
      'Choose location'
    ]
    return data[orderBy - 1]
  }

  geComponentName (orderBy) {
    const data = [
      'WwcFormA',
      null,
      'WwcFormB',
      'WwcFormA'
    ]
    return data[orderBy - 1]
  }
}
