<template>
    <v-layout _clubhouse-public column>
        <!--BANNER-->
        <v-flex v-if="articles.banner" class="_clubhouse-public--banner">
            <v-img :src="articles.banner.imageUrl()"
                   :lazy-src="articles.banner.imageUrl()"
                   gradient="to top, rgba(0,0,0,.37), rgba(0,0,0,.37)"
                   height="100%" class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()"></v-img>
            <div class="_clubhouse-public--banner_text">
                <h1 v-line-clamp:20="3" class="_card-body--title">{{articles.banner.name}}</h1>
                <v-btn color="white"
                       :to="`/clubhouse/article/${articles.banner.id}`"
                       class="v-btn--default mt-5"
                       outline>Read more</v-btn>
            </div>
            <!--BACKGROUND ELEMENTS-->
            <v-flex class="_clubhouse-public--banner--bg-elements" v-parallaxxy="{ x: 0, y: -0.5 }">
                <app-svg-icon preserveAspectRatio="xMinYMin meet"
                              name="themes/profile/NG_BG-01"
                              color="var(--yellow) url(#svgicon_themes_profile_NG_BG-01_a)"
                              :original="true"></app-svg-icon>
            </v-flex>
        </v-flex>
        <!--ARTICLE-->
        <transition name="fadein-transition" appear>
        <!-- <v-flex class="_clubhouse-public--articles" v-scrollanim="{ bEnt: 'before-fadein', enter: 'fadein' }"> -->
        <v-flex class="_clubhouse-public--articles">
          <div v-parallax="$helpers.getSpeedAnimationUp()" class="smooth-parallax">
            <app-svg-icon name="patterns/NG_Pattern-16"
                          color="none var(--blue)"
                          class="svg-icon--pattern-16"></app-svg-icon>
          </div>
          <div v-parallax="$helpers.getSpeedAnimationDown()" class="smooth-parallax">
            <app-svg-icon name="brand/NG_HOMEWORK_SUPPORT"
                          color="var(--orange) none"
                          class="svg-icon--homeworksupport"></app-svg-icon>
          </div>
          <div v-parallax="$helpers.getSpeedAnimationDown()" class="smooth-parallax">
            <app-svg-icon name="brand/NG_LIGHT_HOUSEWORK"
                          color="var(--green) none"
                          class="svg-icon--lighthousework"></app-svg-icon>
          </div>

            <v-container grid-list-xl>
                <v-flex tag="h2"
                        class="text-xs-center my-5 p-relative">Latest Articles</v-flex>
                <v-layout row wrap _clubhouse-public--articles__large-sections>
                    <v-flex v-for="(item, i) in articles.latest[0]"
                            :key="'art_' + item.id"
                            xs12>
                        <app-card-article :item="item"
                                          :reverse="(i%2 !== 0)"
                                          row
                                          large></app-card-article>
                    </v-flex>

                </v-layout>
                <v-layout row wrap>
                    <v-flex v-for="(item, index) in articles.latest[1]"
                            v-scrollanim="{ bEnt: 'before-fadeinup', enter: 'fadeinup', offsetBottom: 400, ind: index }"
                            :key="'art__' + item.id"
                            xs12
                            md4>
                        <app-card-article :item="item"></app-card-article>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        </transition>
        <v-flex>
            <v-container grid-list-xl>
                <clubhouse-categories></clubhouse-categories>
                <clubhouse-subscribe class="ma-auto"></clubhouse-subscribe>
            </v-container>
        </v-flex>
        <!--Signup section-->
        <v-flex v-if="!$auth.check() && signupCards"
                v-for="story in signupCards"
                :key="`car_${story.id}`"
                xs12
                class="_about-us--signup-section">
            <component v-bind:is="AppCardStory"
                       :src-image="$helpers.getImageUrl(story.image.path)"
                       :color="story._param.color"
                       :reverse="story._param.role === 'nanny'"
                       :pattern="story._param.pattern">
                <p class="primary--text text-small font--medium">
                    <app-svg-icon :name="`brand/NG_${story._param.role === 'parent' ? 'CREATIVE_PLAY' : 'AGES_0-1'}`"
                                  class="mr-2"
                                  width="28"
                                  height="28"></app-svg-icon>
                    Are you a {{story._param.role === 'parent' ? 'parent' : 'NannyGranny'}}?
                </p>
                <h1 class="mb-4">{{story.name}}</h1>
                <p>{{story.description | text}}</p>
                <v-btn v-if="!$auth.check()"
                       :to="`/signup?role=${story._param.role}`"
                       class="primary v-btn--default mx-0 elevation-0">Join today</v-btn>

            </component>
        </v-flex>
        <v-flex class="mt-1">
            <clubhouse-navigation v-if="$auth.check('nanny')"></clubhouse-navigation>
            <app-card-follow-us v-else></app-card-follow-us>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppCardArticle from '../../../../components/app-card/app-card-article'
  import ClubhouseCategories from '../share/clubhouse-categories'
  import ClubhouseSubscribe from '../share/clubhouse-subscribe'
  // Lazy load
  const AppCardFollowUs = () => import('@/components/app-card/app-card-follow-us')
  const ClubhouseNavigation = () => import('../share/clubhouse-navigation')
  const AppCardStory = () => import('@/components/app-card/app-card-story')

  export default {
    name: 'clubhouse-public',

    components: {
      AppCardStory,
      ClubhouseNavigation,
      AppCardFollowUs,
      ClubhouseSubscribe,
      ClubhouseCategories,
      AppCardArticle
    },

    data () {
      return {}
    },

    computed: {
      articles () {
        let newCollection = {
          banner: {},
          latest: [[], []]
        }
        let collection = this.$store.getters['articles/collection']
        newCollection.banner = this.$lodash.head(collection, 0)
        newCollection.latest = this.$lodash.chunk(this.$lodash.drop(collection), 3)
        return newCollection
      },
      signupCards () {
        const _cards = this.$store.getters['page/content']('clubhouse')
          .filter(item => item.slug === 'signup_card')
        for (let item of _cards) {
          item._param = JSON.parse(item.param)
        }
        return _cards
      }
    },

    mounted () {
      this.$store.dispatch('articles/ARTICLES_GET', {per_page: 7})
    },

    beforeDestroy () {
      this.$store.commit('articles/ARTICLES_RESET')
    }
  }
</script>

<style lang="stylus" scoped>
    ._clubhouse-public
        &--banner
            position relative
            height 400px
            @media (min-width 960px)
                padding 0 24px
                height 528px
                margin-bottom 80px
                &:before
                    content ''
                    width 100%
                    left 0
                    bottom -80px
                    height 200px
                    position absolute
                    background-color var(--pink)
                    display block
            &_text
                text-align center
                color var(--white)
                position absolute
                max-width 720px
                max-height 220px
                top 0
                bottom 0
                left 24px
                right 24px
                margin auto
            &--bg-elements
                position absolute
                width 100%
                left 0
                // top 0
                top 90px
                height 50px
                overflow hidden
                @media (min-width 960px)
                    top auto
                    width 216px
                    height calc(100% + 10px)
                    // bottom -80px
                    bottom -192px
                .svg-icon
                    overflow visible
                    width 160px
                    height 95px
                    @media (min-width 960px)
                        width 160px
                        height 200px
        &--articles
            position relative
            @media (max-width 960px)
                background-color var(--pink)
            @media (min-width 960px)
                > h2
                    z-index 10
                &:before
                    content ''
                    display block
                    position absolute
                    top 0
                    left 0
                    width 100%
                    height 80%
                    background-color var(--pink)
            .svg-icon--pattern-16
                position absolute
                width 120px
                height 100px
                top 180px
                right -1em;
                z-index: 5;
                transform rotate(0deg)
            .svg-icon--homeworksupport
                position absolute
                width 70px
                height 70px
                top 470px
                left calc(50% - 40%)
                transform rotate(15deg)
                @media (max-width 1440px) {
                  left: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  left: calc(50% - 50%);
                }
            .svg-icon--lighthousework
                position absolute
                width 100px
                height 100px
                // bottom 570px
                bottom -1800px
                right calc(50% - 23%);
                z-index 5
                transform rotate(10deg)
                @media (max-width 1440px) {
                  right: calc(50% - 40%);
                }
                @media (max-width 1024px) {
                  right: calc(50% - 50%);
                }
            &__large-sections
                @media (min-width 1264px)
                    padding 0 100px
                &.layout > .flex
                    @media (min-width 768px)
                        margin-bottom 90px
</style>
