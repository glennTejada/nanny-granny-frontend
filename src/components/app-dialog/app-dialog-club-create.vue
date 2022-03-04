<template>
    <v-layout>
        <v-flex>
            <v-card class="_card-dialog text-xs-center app-bg-sand _card overflow-hidden">
                <!--CONTENT-->
                <v-card-title class="layout justify-center column pb-0">
                    <app-svg-icon name="brand/NG_CREATIVE_PLAY"
                                  :color="$vuetify.theme.warning"
                                  width="90"
                                  height="90"></app-svg-icon>
                    <slot name="title">
                        <h2 class="my-4">{{!updating ? 'Create a club' : `Edit ${inputClub.name}`}}</h2>
                    </slot>
                </v-card-title>
                <v-card-text class="pt-0 mx-auto" style="max-width: 420px">
                    <v-text-field label="Club name"
                                  v-model="form.name"
                                  v-validate="'required'"
                                  data-vv-name="name"
                                  :error-messages="errors.first('name')"
                                  class="py-2"
                                  outline></v-text-field>
                    <v-select label="Club category"
                              placeholder="Please choose"
                              v-model="form.category_id"
                              :items="categories"
                              item-value="id"
                              item-text="name"
                              v-validate="'required'"
                              data-vv-name="category"
                              :error-messages="errors.first('category')"
                              :menu-props="{offsetY: true}"
                              class="py-2 select-category"
                              attach=".select-category"
                              outline>
                        <template slot="selection"
                                  slot-scope="{item, index}">
                            <span class="text--black">{{ item.name | capitalize }}</span>
                        </template>
                    </v-select>
                    <div class="py-2">
                        <app-input-postcode label="Location"
                                            v-model="postcode"
                                            v-validate="'required'"
                                            data-vv-name="location"
                                            :error-messages="errors.first('location')"
                                            :hideDetails="false"
                                            outline></app-input-postcode>
                    </div>
                    <v-checkbox label="Notify other NannyGannies in this area of this club"
                                v-model="form.is_notify"
                                value="1"
                                :ripple="false"></v-checkbox>
                    <div class="text-xs-left">
                        <p>Choose an icon</p>
                        <div style="overflow: auto">
                            <app-btn-toggle-icon v-model="form.svg_name"
                                                 :items="icons"></app-btn-toggle-icon>
                        </div>
                    </div>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn class="white--text mt-4 v-btn--default primary elevation-0"
                           :loading="loading"
                           @click="submit">
                        <slot name="confirmButtonText">
                            {{updating ? 'Update' : 'Create a club'}}
                        </slot>
                    </v-btn>
                </v-card-actions>
                <!--BACKGROUND-->
                <app-svg-icon name="patterns/NG_Pattern-03"
                              :color="`none ${$vuetify.theme.success}`"
                              class="_card-dialog--bg_element hidden-xs-only"></app-svg-icon>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppBtnToggleIcon from '../app-buttons/app-btn-toggle-icon'
  import ClubClass from '../../models/ClubClass'

  export default {
    name: 'app-dialog-club-create',
    components: {AppBtnToggleIcon},
    props: {
      rawData: {
        type: Object,
        default: () => new ClubClass()
      }
    },
    data () {
      return {
        loading: false,
        postcode: null,
        inputClub: this.rawData.club || this.rawData,
        form: {
          category_id: null,
          name: (this.rawData.club || {}).name,
          svg_name: (this.rawData.club || {}).svg_name,
          postcode_id: null,
          is_notify: (this.rawData.club || {}).is_notify
        },
        icons: [
          {name: 'NG_ACTIVITIES'},
          {name: 'NG_WINE_CLUB'},
          {name: 'NG_ACTIVE'},
          {name: 'NG_COFFEE_CLUB'}
        ]
      }
    },
    computed: {
      updating () {
        return this.inputClub && this.inputClub.id > 0
      },
      categories () {
        return this.$store.getters['clubhouse/clubs/categories']
      }
    },
    watch: {
      postcode (val) {
        if (val) {
          this.form.postcode_id = val.id
        }
      }
    },
    mounted () {
      if (this.inputClub) {
        this.postcode = this.inputClub.postcode
      }
      this.$store.dispatch('clubhouse/clubs/CATEGORIES')
        .then(() => {
          if (this.inputClub) {
            this.form.category_id = (this.inputClub.category || {}).id
          }
        })
    },
    methods: {
      submit () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.loading = true
            const action = this.inputClub.id ? 'user/UPDATE' : 'STORE'
            if (this.inputClub) {
              this.form.id = this.inputClub.id
            }
            this.$store.dispatch(`clubhouse/clubs/${action}`, this.form)
              .then(() => {
                this.$store.commit('dialog/DIALOG_SHOW', {show: false})
                this.showSnackBar(`Club has ${action === 'STORE' ? 'created' : 'updated'} successfully`, 'success')
              })
              .finally(() => (this.loading = false))
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
            right -38px
            width 90px
            height 90px
            transform rotate(110deg)
</style>
