<template>
    <v-card class="text-xs-center app-bg-sand _card pa-5">
        <!--CONTENT-->
        <v-card-title class="layout justify-center column px-5 pb-0">
            <app-svg-icon class="_card--icon"
                          :name="`brand/${rawData.namespaced === 'jobs'? 'NG_JOIN_NETWORK':'NG_AGES_0-1'}`"
                          width="60"
                          height="60"
                          color="var(--green)"></app-svg-icon>
            <slot name="title">
                <h2 class="mt-3 mb-5 card--title">I want to recommend {{rawData.namespaced === 'jobs' ? 'a job':'NannyGranny'}}</h2>
            </slot>
        </v-card-title>
        <v-card-text class="pt-0">
            <slot name="text">
                <div class="mx-auto"
                     style="max-width: 380px">
                    <v-text-field label="Email*"
                                  v-model="form.email"
                                  outline
                                  v-validate="'required|email'"
                                  :error-messages="errors.first('email')"
                                  data-vv-name="email"
                                  type="email"
                                  class="app-text-field mt-2 pa-2"></v-text-field>
                    <v-textarea label="Message"
                                outline
                                auto-grow
                                class="pa-2"
                                v-model="form.notes"></v-textarea>
                </div>
            </slot>
        </v-card-text>
        <v-card-actions class="justify-center px-5">
            <v-btn color="primary"
                   :loading="loading"
                   :ripple="false"
                   :block="$vuetify.breakpoint.xsOnly"
                   class="elevation-0 ma-2"
                   @click="send">
                Send
            </v-btn>
        </v-card-actions>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp"
                class="_card--bg-elements">
            <app-svg-icon name="patterns/NG_Pattern-12"
                          color="none var(--blue)"
                          class="svg-icon--pattern-12"></app-svg-icon>
            <app-svg-icon name="brand/NG_CRAFTY"
                          color="var(--orange)"
                          class="svg-icon--crafty"></app-svg-icon>
            <app-svg-icon name="brand/NG_FAVOURITES_FILL"
                          color="var(--green)"
                          class="svg-icon--favourites"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-11"
                          color="none var(--yellow)"
                          class="svg-icon--pattern-11"></app-svg-icon>
        </div>
    </v-card>
</template>

<script>
  export default {
    name: 'app-dialog-recommend',
    props: ['rawData'],

    data () {
      return {
        form: {
          email: null,
          notes: null,
          id: this.rawData.id
        }
      }
    },

    computed: {
      loading () {
        return this.$store.getters[`${this.rawData.namespaced}/loading`]
      }
    },

    methods: {
      send () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$store.dispatch(`${this.rawData.namespaced}/RECOMMEND`, this.form)
              .then(() => {
                this.form.email = ''
                this.form.notes = ''
                this.showSnackBar('Email sent successfully!', 'success')
                this.$store.commit('dialog/DIALOG_SHOW', {show: false})
              })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._card
        position relative
        width 100%
        overflow hidden
        @media (min-width 960px)
            padding-top 120px !important
            padding-bottom 160px !important
        &--bg-elements
            .svg-icon
                position absolute
                &--crafty
                    width 100px
                    height 80px
                    top 170px
                    right 10%
                &--pattern-12
                    width 190px
                    height 200px
                    top -46px
                    left 14%
                    transform rotate(-40deg)
                &--pattern-11
                    width 190px
                    height 200px
                    bottom  -57px
                    right  83px
                    transform rotate(35deg)
                &--favourites
                    width 60px
                    height 60px
                    bottom 185px
                    left 13%
                    transform rotate(13deg)
</style>
