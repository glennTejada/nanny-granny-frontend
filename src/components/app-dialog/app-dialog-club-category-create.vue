<template>
    <v-layout>
        <v-flex>
            <v-card class="_card-dialog text-xs-center app-bg-sand _card overflow-hidden">
                <!--CONTENT-->
                <v-card-title class="layout justify-center column pb-0 mt-3">
                    <app-svg-icon name="brand/NG_JOIN_NETWORK"
                                  :color="$vuetify.theme.warning"
                                  width="90"
                                  height="90"></app-svg-icon>
                    <slot name="title">
                        <h2 class="my-4">Create a new club category</h2>
                    </slot>
                </v-card-title>
                <v-card-text class="pt-0 mx-auto mt-4" style="max-width: 420px">
                    <v-text-field label="Club category name"
                                  v-model="form.name"
                                  v-validate="'required'"
                                  data-vv-name="name"
                                  :error-messages="errors.first('name')"
                                  class="py-2"
                                  outline></v-text-field>
                    <v-checkbox label="Notify other NannyGannies in this area of this new club category"
                                v-model="form.is_notify"
                                value="1"
                                :ripple="false"></v-checkbox>
                    <div class="text-xs-left">
                        <p>Choose an icon</p>
                        <div style="overflow: auto">
                            <app-btn-toggle-icon v-model="form.svg_name"
                                                 outline
                                                 :items="icons"></app-btn-toggle-icon>
                        </div>
                    </div>
                </v-card-text>
                <v-card-actions class="justify-center mb-3">
                    <v-btn class="white--text mt-4 v-btn--default primary elevation-0"
                           :loading="loading"
                           @click="submit">
                        <slot name="confirmButtonText">
                            Create a new club category
                        </slot>
                    </v-btn>
                </v-card-actions>
                <!--BACKGROUND-->
                <app-svg-icon name="patterns/NG_Pattern-18"
                              :color="`${$vuetify.theme.error} none`"
                              class="_card-dialog--bg_element hidden-xs-only"></app-svg-icon>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppBtnToggleIcon from '../app-buttons/app-btn-toggle-icon'
  export default {
    name: 'app-dialog-club-category-create',
    components: {AppBtnToggleIcon},
    data () {
      return {
        form: {
          name: null,
          svg_name: null,
          is_notify: null
        },
        icons: [
          {name: 'NG_ACTIVITIES'},
          {name: 'NG_CRAFTY'},
          {name: 'NG_MEAL_PREP'},
          {name: 'NG_IMAGE_GALLERY'}
        ]
      }
    },
    computed: {
      loading () {
        return this.$store.getters['clubhouse/clubs/loading']
      }
    },
    methods: {
      submit () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$store.dispatch('clubhouse/clubs/STORE_CATEGORY', this.form)
                .then(() => {
                  this.$store.commit('dialog/DIALOG_SHOW', {show: false})
                  this.showSnackBar('Club category has created successfully', 'success')
                })
          }
        })
      },
      close () {
        this.$store.commit('dialog/DIALOG_SHOW', {show: false})
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._card-dialog
        padding 40px 0
        position relative
        &--bg_element
            position absolute
            top 40%
            right -75px
            width 190px
            height 120px
            transform rotate(90deg)
</style>
