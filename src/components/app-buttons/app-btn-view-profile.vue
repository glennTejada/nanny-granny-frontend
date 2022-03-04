<template>
    <v-btn :flat="flat"
           :class="{'_btn-view': flat}"
           @click="profile"
           depressed
           :ripple="false">
        <slot></slot>
    </v-btn>
</template>

<script>
  import NannyClass from '../../models/user/NannyClass'
  import JobClass from '../../models/JobClass'

  export default {
    name: 'app-btn-view-profile',
    props: {
      item: {
        type: [NannyClass, JobClass],
        required: true
      },
      flat: {
        type: Boolean,
        default: true
      },
      hideBottomPanel: Boolean
    },
    data () {
      return {
        type: ''
      }
    },
    mounted () {
      this.type = (this.item instanceof NannyClass) ? 'nanny' : 'job'
    },
    methods: {
      profile () {
        // if (!this.$auth.check() || this.type === 'job' || this.$auth.check()) {
        this.$store.commit('dialog/DIALOG_SHOW', {
          show: true,
          component: `app-dialog-${this.type}-profile`,
          data: {profile: this.item, hideBottomPanel: this.hideBottomPanel},
          options: {
            fullscreen: true
          }
        })
        // } else {
        //   // If not logged in, the subscription message appears in an overlay.
        //   if (this.type === 'nanny') {
        //     this.$store.commit('dialog/DIALOG_SHOW', {
        //       show: true,
        //       component: 'app-dialog-subscription',
        //       options: {
        //         maxWidth: 950
        //       }
        //     })
        //   }
        // }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._btn-view
        height auto !important
        min-width 20px !important
        max-width 100%
        padding 0
        font-size inherit
        color inherit
        margin 0
        &:before
            content none
</style>
