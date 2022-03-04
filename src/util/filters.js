import Moment from 'moment'

export function capitalize (value) {
  if (!value) return ''
  return value.toString().charAt(0).toUpperCase() + value.toString().toLowerCase().slice(1)
}

export function upperCase (value) {
  if (!value) return ''
  return value.toString().toUpperCase()
}

export function lowerCase (value) {
  if (!value) return ''
  return value.toString().toLowerCase()
}

export function formatDate (date, format) {
  return Moment(date).format(format || 'DD/MM/YYYY')
}

export function age (birthday) {
  return Moment().diff(birthday, 'years')
}

export function text (html) {
  if (!html) return ''
  return html.toString().replace(/<[^>]+>/g, '').trim()
}

export function timeAgo (date) {
  return Moment(date).calendar(null, {
    sameDay: '[Today,] LT',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd Do MMM',
    lastDay: '[Yesterday,] LT',
    lastWeek: 'dddd Do MMM',
    sameElse: 'dddd Do MMM'
  })
}

export function readTime (string) {
  if (!string) return ''
  let words = string.toString().replace(/<[^>]+>/g, '').split(/\s+/).length
  return Math.floor(words / 200) + 1 // <- 200 words per minute is a generally accepted reading speed.
}
