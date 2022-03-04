<template>
    <v-layout v-if="content.length > 0"
              class="_about-us row wrap align-center justify-center">
        <!--Header-->
        <v-flex xs12>
            <v-layout column p-relative overflow-hidden pb-5>
                <!--Banner-->
                <v-flex class="xs12 d-flex justify-end _about-us--banner-container"
                        v-resize="onResize">
                    <div class="_about-us--banner"
                         :style="{maxWidth: widthBanner}">
                        <v-img :src="banner"></v-img>
                    </div>
                </v-flex>
                <!--Title-->
                <!-- <v-flex class="xs12 d-flex justify-center _about-us--title smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()"> -->
                <v-flex class="xs12 d-flex justify-center _about-us--title">
                    <v-container w--max--800
                                 ref="container">
                        <v-layout column>
                            <v-flex>
                                <h1>About Us</h1>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <!--Mask-->
                    <div class="_about-us--title__mask" :style="{maxWidth: widthBanner}"></div>
                </v-flex>
                <div class="_about-us--banner_bg-elements _about-us--banner_bg-elements--left smooth-parallax"
                     :style="{right: `calc(${widthBanner} - 24px)`}" v-parallax="$helpers.getSpeedAnimationDown()">
                    <app-svg-icon :name="`themes/profile/NG_BG-05`"
                                  :color="`var(--orange) url(#svgicon_themes_profile_NG_BG-05_a)`"></app-svg-icon>
                </div>
                <div class="_about-us--banner_bg-elements _about-us--banner_bg-elements--right smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
                    <app-svg-icon :name="`themes/profile/NG_BG-05`"
                                  :color="`var(--orange) url(#svgicon_themes_profile_NG_BG-05_a)`"></app-svg-icon>
                </div>
            </v-layout>
        </v-flex>
        <!--Mission-->
        <v-flex xs12 my-5>
            <v-container w--max--800>
                <v-layout>
                    <v-flex>
                        <h2 class="mt-2 mb-4">{{mission.name}}</h2>
                        <div v-html="mission.description"></div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <!--Why NannyGrannies-->
        <v-flex xs12 class="bg-animate d-flex justify-center py-5 p-relative overflow-hidden"
          v-scrollanim="{ bEnt: 'app-bg-white', enter: 'app-bg-sand' }">
            <v-container grid-list-xl w--max--800>
                <v-layout row wrap>
                    <v-flex xs12>
                        <h2 class="text-xs-center text-sm-left">Why NannyGranny</h2>
                    </v-flex>
                    <v-flex v-for="(item, i) in whyItems"
                            :key="'why'+item.id"
                            class="_why-list my-3 xs12">
                        <v-layout row wrap text-xs-center text-sm-left :class="{reverse: (i%2 > 0)}">
                            <v-flex xs12 sm3 :class="{'text-sm-right': (i%2 > 0)}">
                                <app-svg-icon :name="`brand/${item.svg_name}`"
                                              :color="`var(--${item.svg_color})`"
                                              width="98"
                                              height="100%"></app-svg-icon>
                            </v-flex>
                            <v-flex xs12 sm9 d-flex align-center>
                                <v-layout column>
                                    <v-flex class="xs12">
                                        <h3 class="mb-2">{{item.name}}</h3>
                                        <div class="app-text-regular small">{{item.description | text}}</div>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <!--BG elements-->
        <div class="_about-us--banner_bg-elements _bg-elements--pattern-15 hidden-sm-and-down smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
            <app-svg-icon :name="`patterns/NG_Pattern-15`"
                          color="none var(--blue)"></app-svg-icon>
        </div>
        <div class="_about-us--banner_bg-elements _bg-elements--pattern-13 hidden-sm-and-down smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
            <app-svg-icon :name="`patterns/NG_Pattern-13`"
                          color="none var(--orange)"></app-svg-icon>
        </div>
        <!--Our Story-->
        <v-flex xs12 my-5>
            <v-container w--max--800>
                <v-layout>
                    <v-flex>
                        <h2 class="mb-4">{{ story.name || 'Our Story'}}</h2>
                        <div v-html="story.description"></div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <v-flex xs12>
            <v-container>
                <v-layout>
                    <v-flex class="app-text-mono text-xs-center success--text"
                            v-html="textItem[0].description"></v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <v-flex xs12 text-xs-center>
            <app-svg-icon name="brand/NG_DIVIDER"
                          width="139"
                          color="var(--green)"></app-svg-icon>
        </v-flex>
        <v-flex xs12 my-5>
            <v-container w--max--800>
                <v-layout>
                    <v-flex v-html="textItem[1].description"></v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <!--Signup section-->
        <v-flex xs12 class="_about-us--signup-section" v-if="!$auth.check()">
            <app-card-story :src-image="$helpers.getImageUrl(signupItem.image.path)"
                            color="var(--green)"
                            pattern="03">
                <h1 class="mb-4">{{signupItem.name}}</h1>
                <p>{{signupItem.description | text}}</p>
                <v-btn v-if="!$auth.check()"
                       to="/signup"
                       class="primary v-btn--default mx-0 elevation-0">Register</v-btn>
            </app-card-story>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppCardStory from '../../../components/app-card/app-card-story'

  export default {
    components: {AppCardStory},
    data () {
      return {
        widthBanner: '100%'
      }
    },

    computed: {
      content () {
        return this.$store.getters['page/content']('about-us')
      },
      banner () {
        const banner = this.content.filter(item => item.slug === 'banner')[0] || {}
        return this.$helpers.getImageUrl((banner.image || {}).path)
      },
      mission () {
        return this.content.filter(item => item.slug === 'mission_section')[0] || {}
      },
      whyItems () {
        return this.content.filter(item => item.slug === 'why_nannygrannies')
      },
      story () {
        return this.content.filter(item => item.slug === 'story_section')[0] || {}
      },
      textItem () {
        return this.content.filter(item => item.slug === 'text_section')
      },
      signupItem () {
        return this.content.filter(item => item.slug === 'signup_section')[0] || {}
      }
    },

    methods: {
      onResize () {
        if (this.$vuetify.breakpoint.mdAndUp) {
          const coords = this.$refs['container'].getBoundingClientRect()
          this.widthBanner = `calc(100% - ${coords.left}px)`
        } else {
          this.widthBanner = '100%'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._about-us
        &--banner-container
            position relative
            z-index 15
        &--banner
            position relative
            @media (min-width 960px)
                padding 0 24px
        &--title
            position relative
            z-index 10
            text-align center
            @media (min-width 960px)
                text-align left
            &__mask
                position absolute
                height 100%
                width 100%
                left 0
                top 0
                z-index 5
                background var(--pink)
                @media (min-width 960px)
                    height 416px
                    top -188px
            .container
                position relative
                z-index 10
                margin-top 30px
                margin-bottom 30px
                @media (min-width 960px)
                    margin-top 70px
                    margin-bottom 70px
        &--banner_bg-elements
            position absolute
            overflow hidden
            .svg-icon
                width 90px
                height 90px
                overflow visible
                @media (min-width 600px)
                    width 120px
                    height 120px
                @media (min-width 960px)
                    width 160px
                    height 160px
            &--left
                width 90px
                height 118px
                bottom 100px
                left 0
                right auto
                z-index 20
                @media (min-width 600px)
                    width 122px
                    height 190px
                @media (min-width 960px)
                    left auto
                    width 150px
                    height 400px
                    // bottom 300px
                    top 370px
                    z-index 3
            &--right
                width 90px
                height 90px
                right 0
                // top 0
                top 120px
                z-index 20
                @media (min-width 600px)
                    width 130px
                    height 120px
                @media (min-width 960px)
                    right 0
                    // top auto
                    top 0
                    // bottom 0
                    width 150px
                    height 634px
            &._bg-elements--pattern-15
                @media (min-width 960px)
                    left -70px
                    // bottom 150px
                    transform rotate(45deg)
                    .svg-icon
                        width 200px
                        height 200px
            &._bg-elements--pattern-13
                @media (min-width 960px)
                    right -80px
                    // bottom -80px
                    transform rotate(-235deg)
                    .svg-icon
                        width 230px
                        height 230px

        &--signup-section
            margin-bottom 150px
            @media (min-width 600px)
                margin-bottom 80px
            @media (min-width 960px)
                margin-bottom 0
</style>
