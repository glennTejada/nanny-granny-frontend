import ClubModule from './clubs'
import MeetUpModule from './meet-up'

export default {
  namespaced: true,
  modules: {
    clubs: ClubModule,
    meetUp: MeetUpModule
  }
}
