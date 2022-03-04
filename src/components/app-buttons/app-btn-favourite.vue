<template>
    <v-btn class="_btn-favourite"
           :class="{'border border--blue': border}"
           :style="{
                fontSize: size,
                width: width,
                height: height
           }"
           @click="favourites"
           :ripple="false"
           :disabled="$auth.user().id === item.user_from_id"
           icon>
        <span v-if="$auth.user().id === item.user_from_id"
              class="icon-NG_ACCOUNT primary--text"></span>
        <span v-else
              class="primary--text"
              :class="`icon-NG_FAVOURITES${item.is_favorite ? '_FILL':''}`"></span>
    </v-btn>
</template>

<script>
  import Club from '../../models/ClubClass'
  import Article from '../../models/ArticleClass'

  export default {
    name: 'app-btn-favourite',
    props: {
      disabled: Boolean,
      name: {
        type: String,
        required: true,
        validator: type => ['club', 'article'].includes(type)
      },
      item: {
        type: [Club, Article],
        required: true
      },
      size: {
        type: String,
        default: '14px'
      },
      width: {
        type: String,
        default: '24px'
      },
      height: {
        type: String,
        default: '24px'
      },
      border: Boolean
    },
    methods: {
      favourites () {
        if (this.$auth.check() && !this.disabled) {
          if (this.item.is_favorite) {
            this.$store.commit('dialog/DIALOG_SHOW', {
              show: true,
              component: 'app-dialog-confirm-favourite',
              data: this.item,
              options: {
                maxWidth: 650
              }
            })
          } else {
            this.item.is_favorite = !this.item.is_favorite
            this.$store.dispatch(`favourites/FAVOURITES_ADD`, {type: this.name, id: this.item.id})
              .then(data => {
                if (!this.item.is_favorite) {
                  this.$store.commit(`favourites/clubs/FAVOURITES_DELETE`, this.item.id)
                }
              }).catch(() => (this.item.is_favorite = !this.item.is_favorite))
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._btn-favourite
        background #fff
        color var(--blue)
        line-height 0
        text-align center
        z-index 5
        margin 0
        &:hover
            &:before
                background-color transparent
        .icon-NG_ACCOUNT
            font-size 16px
</style>
