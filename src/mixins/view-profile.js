export default {
  methods: {
    view (type) {
      if (this.$auth.check()) {
        this.$store.commit('dialog/DIALOG_SHOW', {
          show: true,
          component: `app-dialog-${type}-profile`,
          data: {profile: this.item},
          options: {
            fullscreen: true
          }
        })
      } else {
        // If not logged in, the subscription message appears in an overlay.
        this.$store.commit('dialog/DIALOG_SHOW', {
          show: true,
          component: 'app-dialog-subscription',
          options: {
            maxWidth: 950
          }
        })
      }
    }
  }
}
