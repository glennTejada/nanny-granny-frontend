<template>
    <v-card flat
            :class="[row ? '_card-row' : '_card-column', {'_card-large': large}, {'_card-small': small}, {'_card-reverse': reverse}]">
        <v-layout>
            <v-flex class="_flex-header">
                <div class="_card-header pa-0">
                    <v-btn v-if="!hideActions"
                           @click="favourites"
                           class="_card-btn-action"
                           :ripple="false" icon>
                        <span :class="`icon-NG_FAVOURITES${item.is_favorite ? '_FILL':''}`"></span>
                    </v-btn>
                    <router-link :to="`/clubhouse/article/${item.id}`" tag="div">
                    <v-img :src="item.imageUrl()"
                           :lazy-src="item.imageUrl()" height="100%">
                        <v-layout v-if="item.image.path"
                                  slot="placeholder"
                                  fill-height
                                  align-center
                                  justify-center
                                  ma-0>
                            <v-progress-circular indeterminate color="primary"></v-progress-circular>
                        </v-layout>
                    </v-img>
                    </router-link>
                </div>
            </v-flex>
            <v-flex class="_card-body">
                <router-link :to="`/clubhouse/article/${item.id}`" tag="div">
                    <h3 v-line-clamp:20="2" class="_card-body--title">{{item.name}}</h3>
                </router-link>
                <div v-line-clamp:20="3" class="_card-body--description font--light">{{item.getText()}}</div>
                <v-btn :to="`/clubhouse/category/${item.category_id}`"
                       round
                       outline
                       color="primary"
                       class="mx-0">#{{item.category}}</v-btn>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  import Article from '@/models/ArticleClass'

  export default {
    name: 'app-card-article',

    props: {
      row: Boolean,
      reverse: Boolean,
      large: Boolean,
      small: Boolean,
      hideActions: Boolean,
      item: Article
    },

    methods: {
      favourites () {
        if (this.$auth.check()) {
          let _action = !this.item.is_favorite ? 'ADD' : 'DELETE'
          this.item.is_favorite = !this.item.is_favorite
          this.$store.dispatch(`favourites/FAVOURITES_${_action}`, {type: 'ARTICLE', id: this.item.id})
              .then(data => {
                if (this.item.is_favorite) {
                  this.$store.commit(`favourites/articles/FAVOURITES_PUSH_ITEM`, new Article(data.object))
                } else {
                  this.$store.commit(`favourites/articles/FAVOURITES_DELETE`, this.item.id)
                }
              }).catch(() => (this.item.is_favorite = !this.item.is_favorite))
        } else {
          this.$router.push('signup')
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .v-card
        background-color transparent !important
        max-width 324px
        margin auto

        &._card-row
            > .layout
                flex-direction column

            &._card-reverse
                > .layout
                    @media (min-width 768px)
                        flex-direction row-reverse

        &._card-column
            > .layout
                flex-direction column

            ._flex-header
                padding-bottom 0 !important
            ._card-header
                background-color transparent 
                overflow: hidden;

        ._card-header
            background-color transparent
            min-height 200px
            cursor pointer
            text-align right
            padding 12px
            position relative
            ._card-btn-action
                position absolute
                background #fff
                color var(--blue)
                width 30px
                height 30px
                line-height 0
                font-size 14px
                text-align center
                top 12px
                right 12px
                z-index 5

                &:hover
                    &:before
                        background-color transparent

        ._card-header
            min-height 220px
            transition .3s
            &:hover
                opacity .9

        ._card-body
            &--title
                margin-top 30px
                cursor pointer
                &:hover
                    opacity .9
                    text-decoration underline

            &--description
                max-height 90px
                overflow hidden
                margin-top 16px
                margin-bottom 6px
            .v-btn
                font-size 14px
                height 28px
                &:before
                    opacity 0
                &:hover:before
                    opacity 1

    @media (min-width: 768px)
        .v-card
            max-width 360px

            &._card-row
                max-width 100%

                > .layout
                    flex-direction row

                ._card-body
                    &--title
                        margin-top 0

            &._card-small
                ._card-header
                    min-width 324px
                    height 223px

                ._card-body
                    padding 16px 60px

            &._card-large
                > .layout
                    align-items center
                ._card-header
                    min-width 400px
                    height 318px

                ._card-body
                    padding 16px 60px

            ._card-header
                min-width 100%
                height 248px

            ._card-body
                &--description
                    margin-top 24px
                    margin-bottom 24px
                .v-btn
                    height 32px
            &._card-large
                ._card-header
                    height 318px
    @media (min-width: 1264px)
        .v-card
            &._card-large
                ._card-header
                    min-width 460px
                    height 318px
</style>
