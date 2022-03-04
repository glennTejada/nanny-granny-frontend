<template>
    <div class="_avatar p-relative"
         :style="{
            color: colorInput,
            width: width,
            height: height,
            maxWidth: width,
         }">
        <div v-if="initials"
             class="_avatar--initials">
            <h2>{{initials}}</h2>
        </div>
        <v-img v-else
               :src="src" aspect-ratio="1" class="_img">
            <v-layout v-if="src"
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0>
                <v-progress-circular :size="18"
                                     indeterminate
                                     :width="2"
                                     color="primary"></v-progress-circular>
            </v-layout>
        </v-img>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 94 94" class="_avatar--mask">
            <path fill="currentColor"
                  d="M0 0v94h94V0H0zm91.9 56.5c0 .1 0 .2-.1.3v.4c-.2 4.5-2.6 10-4.2 12.6l-.1.1c-.9 1.2-1.9 3.2-3.5 5.4-1.4 1.8-2.2 2.9-3 3.6-2 2.1-3.1 2.8-7.2 6.1s-10.7 5.1-10.7 5.1c-5 1.7-10.2 2.5-15.5 2.5-4.4 0-8.8-.5-13.1-1.7-12.2-3.3-23.1-12.3-29.2-24-.7-1.3-1.3-2.6-1.8-3.9l-.1-.2c-3.2-12.3-1-27.7 6.1-41.2v-.1c.7-1.1 1.3-2 2.1-3.2.8-1.1 1.7-2.2 2.6-3.2.7-.8 1.4-1.6 2.1-2.3 8.6-8.9 21.2-13 34.4-11.4 14.3 1.7 27 9.8 33.9 21.5.6 1.1 1.2 2.2 1.8 3.4 2.8 5.9 5.8 23.6 5.5 30.2z"/>
        </svg>
    </div>
</template>

<script>
  const DEF_PATH_AVATAR = '/static/img/def/NG-no-photo.png'

  export default {
    name: 'app-avatar',

    props: {
      src: {
        type: String,
        default: DEF_PATH_AVATAR
      },
      id: {
        type: [String, Number],
        default: 'image'
      },
      color: {
        type: String,
        default: '#ffffff'
      },
      initials: {
        type: String
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      }
    },

    data () {
      return {
        colorInput: this.color
      }
    },

    mounted () {
      // Safari
      setTimeout(() => {
        let _img = document.getElementsByClassName('_img')[0]
        if (_img) {
          _img.style.minWidth = '100%'
        }
      }, 300)
    },

    created () {
      if (this.src === DEF_PATH_AVATAR && !this.initials) {
        this.colorInput = 'transparent'
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._avatar
        border-radius 20px

        ._img
            border-radius 35%

        &--initials
            background-color var(--blue)
            height 100%
            display flex
            align-items center
            justify-content center

    ._avatar--mask
        position absolute
        z-index 5
        top -1px
        left -1px
        width calc(100% + 2px)
        height calc(100% + 2px)
</style>
