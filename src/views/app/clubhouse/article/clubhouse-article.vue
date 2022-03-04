<template>
    <v-layout _clubhouse-article
              column
              v-scroll="onScroll">
        <v-flex class="_clubhouse-article--banner-section">
            <div class="_clubhouse-article--banner">
                <v-img :src="article.imageUrl()" height="100%" transition="fadeinup-transition" class="hidden-sm-and-up"></v-img>
                <transition name="fadeinup-delay-transition" appear>
                  <div style="height: 100%" class="hidden-xs-only">
                    <div class="img-parallax" :style="{ backgroundImage: `url(${article.imageUrl()})` }"></div>
                  </div>
                </transition>
                <v-btn v-if="$auth.check()"
                       @click="favourites"
                       class="_card-btn-action"
                       :ripple="false" icon>
                    <span :class="`icon-NG_FAVOURITES${article.is_favorite ? '_FILL':''}`"></span>
                </v-btn>
            </div>
        </v-flex>
        <v-flex>
            <v-container grid-list-xl
                         ref="container-sticky">
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp"
                class="_faqs--bg-elements">
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="brand/NG_COOKING_BAKING"
                            color="var(--orange)"
                            class="svg-icon--ngcookbaking"></app-svg-icon>
            </div>
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
              <app-svg-icon name="patterns/NG_Pattern-03"
                            color="none var(--green) none"
                            class="svg-icon--pattern-04"></app-svg-icon>
            </div>
<!--
            <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
              <app-svg-icon name="brand/NG_CREATIVE_PLAY"
                            color="var(--yellow)"
                            class="svg-icon--ngcreativeplay"></app-svg-icon>
            </div>
-->

        </div>
                <v-layout row wrap>
                    <!--Info-bar-->
                    <v-flex xs12 md3
                            class="p-relative"
                            :class="{'pr-5': $vuetify.breakpoint.mdAndUp}">
                        <div ref="sticky"
                             class="_clubhouse-article--sticky">
                            <div class="my-2">
                                <h3>{{article.created_at | formatDate('DD MMMM YYYY')}}</h3>
                                <p class="my-3 text--charcoal text-small--article">{{article.description | readTime}}
                                    min read</p>
                            </div>
                            <div v-if="$vuetify.breakpoint.mdAndUp"
                                 class="mt-5 text--charcoal">
                                <p class="mb-2 text-small font--medium">Share</p>
                                <clubhouse-article-share :item="article"></clubhouse-article-share>
                            </div>
                            <div v-if="$vuetify.breakpoint.mdAndUp"
                                 class="mt-5 text--charcoal">
                                <p class="mb-3 text-small font--medium">Author</p>
<!--                                
                                <p class="mb-3" style="width: 52px">
                                    <app-avatar :src="article.user.getAvatarUrl()"></app-avatar>
                                </p>
-->                                
                                <p class="mb-0 text-small--article">{{article.author}}</p>
                                <v-divider class="my-2"></v-divider>
                                <p class="mb-0 text-small--article">{{article.address_name || lorem}}</p>
                            </div>
                            <div v-if="$vuetify.breakpoint.mdAndUp"
                                 class="mt-5">
                                <p class="mb-0 text-small font--medium">Category</p>
                                <v-btn :to="`/clubhouse/category/${article.category_id}`"
                                       round
                                       outline
                                       color="primary"
                                       class="mx-0 btn-chip">#{{article.category}}
                                </v-btn>
                            </div>
                        </div>
                    </v-flex>
                    <!--Description-->
                    <v-flex xs12 md8 lg7>
                        <h1 class="mb-5">{{article.name}}</h1>
                        <div id="description" v-html="article.description"></div>
                    </v-flex>
                    <!--Info-bar-->
                    <v-flex v-if="$vuetify.breakpoint.smAndDown" xs12>
                        <div class="mt-5 border--top border--grey_3 py-3">
                            <div class="d-inline-flex align-center">
                                <p class="mt-2 mb-0 text-small font--medium min-width-90">Share</p>
                                <clubhouse-article-share :item="article"></clubhouse-article-share>
                            </div>
                        </div>
                        <div class="py-3 border--top border--bottom border--grey_3">
                            <div class="text--charcoal d-inline-flex align-baseline">
                                <div class="pr-4 min-width-90">
                                    <p class="mb-2 text-small font--medium">Author</p>
<!--                                    
                                    <p class="mb-0" style="width: 52px">
                                        <app-avatar :src="article.user.getAvatarUrl()"></app-avatar>
                                    </p>
-->                                    
                                </div>
                                <div>
                                    <p class="mb-2 text-small--article">{{article.author}}</p>
                                    <p class="mb-0 text-small--article">{{article.address_name || lorem}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="py-3 border--bottom border--grey_3">
                            <div class="d-inline-flex align-center">
                                <p class="mb-0 text-small font--medium min-width-90">Category</p>
                                <v-btn :to="`/clubhouse/category/${article.category_id}`"
                                       round
                                       outline
                                       color="primary"
                                       class="mx-0 btn-chip">#{{article.category}}
                                </v-btn>
                            </div>
                        </div>
                    </v-flex>
                </v-layout>

            </v-container>
        </v-flex>
        <v-flex my-5>
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex  tag="h2" class="xs12 text-xs-center mb-4">Recommended reading</v-flex>
                    <v-flex v-for="(item, index) in articles"
                            :key="'art__' + item.id"
                            xs12
                            md4
                            v-scrollanim="{ bEnt: 'before-fadeinup', enter: 'fadeinup', offsetBottom: 400, ind: index }">
                        <app-card-article :item="item"
                                          :hide-actions="!$auth.check()"></app-card-article>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <v-flex>
            <clubhouse-categories></clubhouse-categories>
        </v-flex>
        <v-flex my-5>
            <clubhouse-subscribe class="ma-auto"></clubhouse-subscribe>
        </v-flex>
        <v-flex mt-5>
            <clubhouse-navigation></clubhouse-navigation>
        </v-flex>
    </v-layout>
</template>

<script>
  import ClubhouseNavigation from '../share/clubhouse-navigation'
  import ClubhouseSubscribe from '../share/clubhouse-subscribe'
  import ClubhouseCategories from '../share/clubhouse-categories'
  import AppCardArticle from '../../../../components/app-card/app-card-article'
  import AppAvatar from '../../../../components/app-avatar'
  import ClubhouseArticleShare from './clubhouse-article-share'

  export default {
    name: 'clubhouse-article',
    components: {ClubhouseArticleShare, AppAvatar, AppCardArticle, ClubhouseCategories, ClubhouseSubscribe, ClubhouseNavigation},
    props: ['articleId'],

    data () {
      return {
        stickyTop: 0,
        lorem: 'Mauris elit orci, ultricies id fermentum vel, porta et eros. Vestibulum condimentum lectus in convallis feugiat.'
      }
    },

    computed: {
      article () {
        return this.$store.getters['articles/selected']
      },
      articles () {
        return this.$store.getters['articles/collection']
      }
    },

    mounted () {
      this.$store.dispatch('articles/ARTICLES_SHOW', this.articleId)
      this.$store.dispatch('articles/ARTICLES_GET', {per_page: 3})
      // to do - p. 34, 35
      // this.$nextTick(function () {
      //   // Code that will run only after the
      //   // entire view has been rendered
      //   const imgs = document.querySelectorAll('#description p')
      // //  console.log(imgs)
      // })
    },

    beforeRouteUpdate (to, from, next) {
      this.$refs['sticky'].style.position = 'static'
      this.$store.dispatch('articles/ARTICLES_SHOW', to.params.articleId)
      next()
    },

    beforeDestroy () {
      this.$refs['sticky'].style.position = 'static'
      this.$store.commit('articles/ARTICLES_RESET')
    },

    methods: {
      onScroll (e) {
        let _sticky = this.$refs['sticky'].getBoundingClientRect()
        let _conatiner = this.$refs['container-sticky'].getBoundingClientRect()
        if (((_sticky.height * 2 > _conatiner.height)) || _conatiner.top > 100 || this.$vuetify.breakpoint.smAndDown) {
          this.$refs['sticky'].style.position = 'static'
          return
        }

        let _maxScroll = ((_sticky.height + 200) + Math.abs(_conatiner.top)) > (_conatiner.height)
        if (_conatiner.top < 100 && !_maxScroll) {
          this.$refs['sticky'].style.width = _sticky.width + 'px'
          this.$refs['sticky'].style.left = _sticky.left + 'px'
          this.$refs['sticky'].style.top = '100px'
          this.$refs['sticky'].style.bottom = 'auto'
          this.$refs['sticky'].style.position = 'fixed'
        } else if (_maxScroll) {
          this.$refs['sticky'].style.position = 'absolute'
          this.$refs['sticky'].style.left = '16px'
          this.$refs['sticky'].style.top = 'auto'
          this.$refs['sticky'].style.bottom = '84px'
        }
      },
      favourites () {
        if (this.$auth.check()) {
          let _action = !this.article.is_favorite ? 'ADD' : 'DELETE'
          this.article.is_favorite = !this.article.is_favorite
          this.$store.dispatch(`favourites/FAVOURITES_${_action}`, {type: 'ARTICLE', id: this.article.id})
            .then(() => {
              this.$lodash.forEach(this.articles, (item) => {
                if (item.id === this.article.id) {
                  item.is_favorite = this.article.is_favorite
                }
              })
            })
            .catch(() => (this.article.is_favorite = !this.article.is_favorite))
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._clubhouse-article
        &--banner-section
            @media (min-width 600px)
                padding 0 24px

        &--banner
            margin-bottom 50px
            @media (min-width 600px)
                height 528px
                margin-bottom 100px
            .img-parallax
                z-index -1
                // position absolute
                // top 0
                // left 0
                width 100%
                height 100%
                background-repeat no-repeat
                background-size cover
                background-position center center
                background-attachment fixed

            .v-btn
                position absolute
                background #fff
                color var(--blue)
                width 30px
                height 30px
                line-height 0
                font-size 14px
                text-align center
                top 16px
                right 24px
                z-index 5
                @media (min-width 600px)
                    right 36px
                    width 52px
                    height 52px
                    font-size 24px

                &:hover
                    &:before
                        background-color transparent

        .text-small--article
            font-size 12px

        .btn-chip
            font-size 14px
            height 28px

            &:before
                opacity 0

            &:hover:before
                opacity 1
        .min-width-90
            min-width 90px
    ._faqs--bg-elements
        .svg-icon
            position absolute
            &--ngcookbaking
                width 90px
                height 140px
                top 300px
                right calc(50% - 50%);
                transform rotate(20deg)
                @media (max-width 1440px) {
                  right: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  right: calc(50% - 50%);
                }
            &--pattern-04
                width 120px
                height 120px
                // top 125px
                top 2000px
                right -1.5em
                transform rotate(30deg)
            &--ngcreativeplay
                width 105px
                height 105px
                top 1850px
                left calc(50% - 50%);
                transform rotate(0deg)
                @media (max-width 1440px) {
                  left: calc(50% - 50%);
                }
                @media (max-width 1024px) {
                  left: calc(50% - 50%);
                }
  
</style>
