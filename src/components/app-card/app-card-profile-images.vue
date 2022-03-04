<template>
    <v-layout row align-center class="_card">
        <v-flex class="_preview-img">
            <v-card color="white"
                    flat
                    class="_window-image ma-auto">
                <v-window v-model="select">
                    <v-window-item v-for="file in files"
                                   :key="`file-${file.id}`">
                        <v-layout align-center
                                  justify-center
                                  fill-height
                                  tag="v-card-text"
                                  class="_card-bg"
                                  :style="{backgroundImage: `url(${imageUrl(file)})`}">
                        </v-layout>
                    </v-window-item>
                </v-window>
                <v-card-actions class="_window-image--footer pa-0">
                    <div>
                        <app-svg-icon name="brand/NG_IMAGE_GALLERY" width="23"></app-svg-icon>
                        <span class="px-1 _count-files">{{ countFiles }}</span>
                    </div>

                    <v-spacer></v-spacer>
                    <v-item-group v-model="select"
                                  class="text-xs-right align-center _dot-box">
                        <v-item v-for="file in files"
                                :key="`btn-${file.id}`">
                            <span v-if="countFiles > 1"
                                  slot-scope="{ active, toggle }"
                                  :input-value="active"
                                  @click="toggle" class="app-btn-dot">
                            </span>
                        </v-item>
                    </v-item-group>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex class="_tools">
            <v-layout column>
                <v-flex>
                    <p v-if="countFiles" class="app-text-regular mb-3 text-xs-center text-sm-left">
                        You have uploaded {{ countFiles }} {{ countFiles == 1 ? 'image' : 'images' }} to your profile. To
                        change, use options below:</p>
                    <p v-else class="app-text-regular mb-3">
                        Multiple pictures up to a max number of 5 is possible. Upload them from your computer or from
                        your Facebook page.</p>
                </v-flex>
                <v-flex class="_tools-btn">
                    <vue-clip ref="vc"
                              :on-added-file="addedFile"
                              :on-complete="complete"
                              :on-sending="sending"
                              :options="options">
                        <template slot="clip-uploader-action">
                            <v-btn color="primary"
                                   class="v-btn--default ml-0"
                                   :disabled="countFiles >= 5"
                                   outline
                                   :loading="loading">
                                <div class="dz-message">Upload</div>
                            </v-btn>
                        </template>
                    </vue-clip>
                    <span class="mx-3 _or">or</span>
                    <v-btn color="primary"
                           @click="uploadFB"
                           outline
                           class="v-btn--default">
                        <app-svg-icon name="ui/NG_FACEBOOK" height="20" width="28"></app-svg-icon>
                        Facebook
                    </v-btn>
                </v-flex>
                <v-flex>
                    <a href="#"
                       class="link-small _btn-delete"
                       @click.stop.prevent="removedFiles">
                        Delete images
                    </a>
                </v-flex>
            </v-layout>
        </v-flex>
        <!--Dialog-->
        <v-flex>
            <v-dialog v-model="dialog"
                      :fullscreen="$vuetify.breakpoint.xsOnly"
                      max-width="600px">
                <v-card class="app-bg-sand">
                    <v-card-title><h2>Profile Picture</h2></v-card-title>
                    <v-card-text class="fb-photo-container">
                        <v-btn-toggle v-model="fbSource"
                                      class="btn-toggle-photo elevation-0">
                            <v-container grid-list-xl>
                                <v-layout row wrap>
                                    <v-flex v-for="photo in fbPhotos"
                                            :key="`fb_p${photo.id}`">
                                        <v-btn :value="photo.source"
                                               flat>
                                            <v-img :src="photo.source"></v-img>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-btn-toggle>
                    </v-card-text>
                    <v-card-actions class="justify-center py-4">
                        <v-btn class="primary elevation-0"
                               @click="dialog = false">Cancel
                        </v-btn>
                        <v-btn color="primary"
                               class=""
                               :loading="loading"
                               outline
                               :disabled="!fbPhotos.length > 0"
                               @click="saveFb">Upload
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-flex>
    </v-layout>
</template>

<script>
  import '../app-icons/brand'
  import {UPLOAD_AVATAR_URL, FB_CLIENT_ID} from '../../config/constants'
  import {profile as actions} from '../../store/types/action-types'

  export default {
    name: 'app-card-profile-images',

    props: {
      value: Array,
      options: {
        type: Object,
        default: function () {
          return {
            maxFiles: {
              limit: 5,
              message: 'You can only upload a max of 5 files'
            },
            maxFilesize: {
              limit: 2,
              message: 'Your file is too big! Please select an image under 2MB'
            },
            url: UPLOAD_AVATAR_URL,
            paramName: 'file',
            acceptedFiles: {
              extensions: ['image/*'],
              message: 'You are uploading an invalid file'
            }
          }
        }
      }
    },

    data () {
      return {
        dialog: false,
        fbSource: null,
        loading: false,
        select: 0,
        error: null,
        files: this.value || []
      }
    },

    computed: {
      loadingFb () {
        return this.$store.getters['fbSdk/loading']
      },
      countFiles () {
        return this.files.length
      },
      fbPhotos () {
        return this.$store.getters['fbSdk/collection']
      },
      token () {
        return this.$auth.token()
      }
    },

    watch: {
      files () {
        this.$auth.user().images = this.files
      },
      loadingFb () {
        this.dialog = !this.loadingFb
      }
    },

    created () {
      // FB SDK
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: FB_CLIENT_ID,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v3.2'
        })
      };
      (function (d, s, id) {
        let js
        let fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {
          return
        }
        js = d.createElement(s)
        js.id = id
        js.src = '//connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))
    },

    methods: {
      uploadFB () {
        this.$store.dispatch('fbSdk/GET_PHOTOS')
      },
      saveFb () {
        this.$store.dispatch('fbSdk/TO_DATA_URL', this.fbSource)
          .then((dataUrl) => {
            this.loading = true
            this.$store.dispatch('fbSdk/UPLOAD_IMAGE', {file: dataUrl})
              .then((res) => {
                this.files = res.data
                this.select = (this.files.length - 1)
                this.dialog = false
                this.fbSource = null
              }).finally(() => (this.loading = false))
          })
      },
      imageUrl (file) {
        return file.path
      },
      addedFile (file) {
        this.loading = true
      },
      complete (file, status, xhr) {
        if (status === 'success') {
          this.files = []
          this.files = JSON.parse(xhr.response)
          this.select = (this.files.length - 1)
        } else if (status === 'error') {
          this.showSnackBar(xhr.statusText || file.errorMessage, 'error')
          this.error = file.errorMessage || status
        } else if (file.errorMessage) {
          this.showSnackBar(file.errorMessage, 'error')
        }
        this.loading = false
      },
      sending (file, xhr, formData) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.token)
      },
      removedFiles () {
        this.$store.dispatch('profile/' + actions.DELETE_IMAGES)
          .then(() => {
            this.select = 0
            this.files = []
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._card
        flex-wrap wrap
        @media (min-width 600px)
            border 1px solid var(--grey_2)
            flex-wrap nowrap
            margin-bottom 30px

    ._or
        display block
        margin 12px 0
        text-align center
        @media (min-width 600px)
            margin 0

    ._preview-img
        min-width 100%
        @media (min-width 600px)
            min-width 197px

    ._tools
        min-width 100%
        @media (min-width 600px)
            min-width unset
            padding 0 24px

        ._tools-btn
            @media (min-width 600px)
                display flex
                flex-wrap nowrap
                align-items center

        .v-btn
            @media (min-width 600px)
                max-width unset
                min-width 130px
            @media (min-width 768px)
                min-width 197px

    ._btn-delete
        display block
        text-align center
        margin 24px 0
        @media (min-width 600px)
            margin 24px 0 0
            text-align left

    ._window-image
        max-width 100%
        height 290px
        background-color var(--sand) !important
        margin-bottom 80px !important
        @media (min-width 600px)
            max-width 200px
            height 205px
            margin-bottom 0 !important

        .v-card
            border-radius 0

        ._card-bg
            height 290px
            background-position center
            background-size cover
            @media (min-width 600px)
                height 205px

        &--footer
            height 25px
            position absolute
            left 0
            right 0
            bottom -35px
            color var(--blue)

            ._count-files
                position relative
                top 4px

            ._dot-box
                height 20px

            .app-btn-dot
                &.v-item--active
                    background-color var(--blue)

    .v-btn
        .dz-message
            width 100%
            height 100%

    .btn-toggle-photo
        width 100%
        height 100%
        .v-btn
            padding 4px
            min-width 100px
            height 100px
            opacity 0.7

    .fb-photo-container
        overflow auto
        height 300px
</style>
