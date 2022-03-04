import {snackbar as mutations} from '../store/types/mutation-types'

export default {
  data () {
    return {
      online: navigator.onLine
    }
  },

  mounted () {
    const vm = this
    window.addEventListener('load', function () {
      vm.updateOnline()
      window.addEventListener('online', vm.updateOnline)
      window.addEventListener('offline', vm.updateOnline)
    })
  },

  beforeDestroy () {
    window.removeEventListener('online', this.updateOnline)
    window.removeEventListener('offline', this.updateOnline)
  },

  methods: {
    updateOnline () {
      this.online = navigator.onLine || false
      if (!this.online) {
        this.$store.commit(mutations.SET_SNACKBAR_TEXT, 'INTERNET DISCONNECTED')
        this.$store.commit(mutations.SET_SNACKBAR_SHOW, true)
      } else {
        this.$store.commit(mutations.SET_SNACKBAR_SHOW, false)
      }
    }
  }
}
