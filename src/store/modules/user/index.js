import NannyModule from './nanny'
import ConnectModule from './connections/index'

export default {
  namespaced: true,
  modules: {
    nanny: NannyModule,
    connect: ConnectModule
  }
}
