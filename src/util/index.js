import _lodash from 'lodash'
import Nanny from '../models/user/NannyClass'
import BaseUser from '../models/user/BaseUserClass'
import Parent from '../models/user/ParentClass'

/**
 * Set what data is stored from the user from the response data.
 * @param data
 * @returns {object|{}}
 */
export const parseUserData = (data) => {
  if (_lodash.isEmpty(data)) {
    return {}
  }

  let user = _lodash.get(data, 'user', data)
  let role = user.role.name || user.role
  if (user && role === 'nanny') {
    return new Nanny(user)
  } else if (user && role === 'parent') {
    return new Parent(user)
  } else if (user) {
    return new BaseUser(user)
  }
  return {}
}
