const DEF_TIMER = 5000

export default {
  data () {
    return {
      timer: null
    }
  },

  computed: {
    authUser () {
      return this.$auth.user()
    }
  },

  watch: {
    authUser (user) {
      if (this.$auth.check()) {
        const _this = this
        this.$store.dispatch('notifications/FETCH', this.$auth.user().role)
        this.timer = setTimeout(function _msg () {
          _this.$store.dispatch('notifications/FETCH', user.role)
          _this.timer = setTimeout(_msg, DEF_TIMER)
        }, DEF_TIMER)
      } else if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    }
  }
}
