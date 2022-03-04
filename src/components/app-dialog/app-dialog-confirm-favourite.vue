<template>
    <v-layout>
        <v-flex>
            <v-card class="text-xs-center app-bg-sand _card">
                <!--CONTENT-->
                <v-card-title class="layout justify-center column pb-0">
                    <app-svg-icon name="brand/NG_ENGAGED"></app-svg-icon>
                    <slot name="title">
                        <h2 class="my-3">Leave club</h2>
                    </slot>
                </v-card-title>
                <v-card-text class="pt-0">
                    <slot name="text">
                        <p class="_card--question text-small">Deselecting the heard icon will remove you as a member of
                            this club</p>
                    </slot>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="primary"
                           class="elevation-0 v-btn--default"
                           @click="close">
                        <slot name="cancelButtonText">
                            No, stay a member
                        </slot>
                    </v-btn>
                    <v-btn class="white--text v-btn--default"
                           color="primary"
                           outline
                           :loading="loading"
                           @click="leave">
                        <slot name="confirmButtonText">
                            Yes, leave this club
                        </slot>
                    </v-btn>
                </v-card-actions>
                <!--BACKGROUND-->
                <app-svg-icon name="patterns/NG_Pattern-03"
                              :original="true"
                              class="_card--bg_element hidden-xs-only"></app-svg-icon>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import ClubClass from '../../models/ClubClass'

  export default {
    name: 'app-dialog-confirm-favourite',

    props: {
      rawData: ClubClass
    },

    computed: {
      loading () {
        return this.$store.getters['favourites/loading']
      }
    },

    methods: {
      leave () {
        this.$store.dispatch(`favourites/FAVOURITES_DELETE`, {type: 'club', id: this.rawData.id})
          .then(() => {
            this.rawData.is_favorite = !this.rawData.is_favorite
            this.close()
          })
          .catch(() => (this.rawData.is_favorite = !this.rawData.is_favorite))
      },
      close () {
        this.$store.commit('dialog/DIALOG_SHOW', {show: false})
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._close-btn
        width 18px
        height 18px
        color var(--blue)
        position absolute
        z-index 15
        right 16px
        top 16px

    ._card
        position relative
        padding 40px 16px 60px
        min-height 100%
        overflow hidden
        @media (min-width: 600px)
            min-height 410px
            padding 40px 16px 60px

        &--question
            max-width 400px
            margin 16px auto

        &--bg_element
            position absolute
            color var(--green)
            bottom 0
            right -40px
            transform rotate(120deg)
            width 90px
            height 90px

    .v-card__title
        margin-top 100px
        @media (min-width: 600px)
            margin-top 0

        .svg-icon
            color var(--yellow)
            width 80px
            height 40px

    .v-card__actions
        flex-direction column
        padding 0 16px
        @media (min-width: 600px)
            flex-direction row

        .v-btn
            margin 12px
            min-width 230px
</style>
