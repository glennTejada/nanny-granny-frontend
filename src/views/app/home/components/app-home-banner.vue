<template>
    <v-layout row wrap _home-banner>
        <v-flex xs12 hidden-xs-only _home-banner--img>
            <!-- <v-img :src="image" :lazy-src="image" style="max-height: 910px"/> -->
            <v-img :src="image" style="max-height: 910px" transition="fadein-transition"/>
        </v-flex>
        <v-flex _home-banner--text v-parallaxxy="{ x: 0, y: -0.1}">
            <v-container p-relative>
                <v-layout row wrap>
                    <v-flex xs12 sm6>
                        <h1 class="_home-banner--text--title" v-html="banner_text">

                        </h1>
                        <div class="mt-4 hidden-xs-only">
                            <router-link :to="`/how-it-works`" tag="a">How it works</router-link>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
            <!--BACKGROUND ELEMENTS-->
            <!-- <div class="_home-banner--bg-elements smooth-parallax" v-parallax.absY="-0.2"> -->
            <div class="_home-banner--bg-elements" v-parallaxxy="{ x: 0, y: -0.3}">
                <app-svg-icon name="patterns/NG_Pattern-12" color="var(--green)"></app-svg-icon>
            </div>
        </v-flex>
        <!--BACKGROUND ELEMENTS-->
        <!-- <div class="_home-banner--bg-elements smooth-parallax" v-parallax.absY="-0.1"> -->
        <div class="_home-banner--bg-elements" v-parallaxxy="{ x: 0, y: -0.2 }">
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 255.5 264.6"
                 preserveAspectRatio="xMinYMin"
                 class="svg-icon">
                <pattern id="pattern-12"
                         width="255.5"
                         height="264.6"
                         patternUnits="userSpaceOnUse">
                    <path fill="currentColor"
                          d="M202.4 130.8c-.8 5.4-1.6 10.9-2.4 16.3-.1.8-.4 1.6-.8 2.2-1.3 2.1-2.9 4.2-5.6 3.6-2.5-.5-4.9-1.9-5.7-4.5-2.5-7.9-4.9-15.8-4.4-24.3.2-3 1-5.6 2.9-7.9 3.9-4.7 9.3-3.7 12.9 1.2 2.9 4.4 2.3 8.8 3.1 13.4M135.6 116.6c.5-3.9.6-8.7 1.7-13.2 1.8-7 5.6-7.8 11.6-3.6 3.8 2.7 4 6.8 4.2 10.5.4 5.5-.2 11.1-.7 16.7-.4 4.7-5.4 9.5-10.2 10.1-2.9.4-5.1-1.5-5.5-5.2-.6-4.9-.7-9.6-1.1-15.3M255.5 177.4c-.7 5.3-1.1 10.7-2.1 16-.7 3.7-2.7 5.2-5.3 5.3-2.5.1-6.2-2.5-7.6-4.8-3-5.1-4.1-10.7-4.7-16.4-.5-4.8.5-9.5 4.1-13.3 2-2 4-2.3 6.5-1.4 6.6 2.2 9.2 6.6 9.1 14.6M192.5 216.5c.5-3.2.6-6.9 4.2-9.5 3.2-2.3 7.8-2.4 10.5.3 2.6 2.5 3.7 5.4 3.7 8.8 0 4.4 1.7 8.9-1.1 13.2-1 1.6-.5 4.1-.8 6.2-.3 2.5-1.8 4.2-4.1 4.7-2.7.6-5.2-.4-6.6-2.8-2.6-4.7-5.3-9.5-5.3-15.2 0-1.7-.3-3.4-.5-5.7M237 88.9c1-3.8 1.6-7.7 3-11.4s4-4.9 7-4.3c3.1.6 6.1 4.3 6.4 7.4.6 6.7 1.4 13.5 1.7 20.2.1 2.4-.2 5.3-1.5 7.2-2.9 4.3-7.3 3.7-10.7-1.2-3.8-5.2-6.1-11-5.9-17.9M204.4 69c-.3.7-1.1 2.2-1.7 3.8-1 2.5-3.3 4.5-5.6 4.4-2.2-.1-4.2-1.8-4.9-4.5-2.3-8.4-4.3-16.9-3.9-25.8.3-5.6 3.3-8.8 9.2-9.3.4.4.7 1.1 1.2 1.4 4.9 2.9 4.8 7.6 4.7 12.5 0 5.5.6 11.2 1 17.5M54.3 246.1c-.2.5-.8 1.6-1.3 2.8-.7 1.9-2.4 3.3-4 3.2-1.6-.1-3-1.3-3.6-3.3-1.7-6.2-3.1-12.5-2.8-19.1.2-4.2 2.4-6.5 6.7-6.9.3.3.5.8.9 1 3.5 2.2 3.5 5.6 3.5 9.2-.2 4.2.3 8.4.6 13.1M143.3 235.2c-1-8 6.6-12.7 12.3-9.8 4 2 6 6 6.7 10.4.5 3.1.8 6.3.9 9.5.1 3.3-1.4 6.2-3.9 8.2-1.9 1.5-4 .3-5.8-.7-6.7-4.2-10.5-10-10.2-17.6M80.6 170.1c.4-2.3.7-4.5 1.2-6.7 1-4.4 5.2-6.4 9.2-4.4 1.8.9 3.7 1.9 5.2 3.4 1.2 1.1 2.4 2.9 2.5 4.4.4 5.8 1.2 11.7-1.1 17.5-1.7 4-5.7 5.2-9.5 3.1-4.2-2.4-5.7-5.9-6.3-10.3-.4-2.4-.8-4.8-1.2-7M34.9 149.2c-6.2-.9-9.2-3.6-10-9.3-.8-5.8-2.6-11.4-1.4-17.3.6-2.9 2-4.6 4.7-5.3 1.3-.3 2.9-.3 4.1.1 4.4 1.5 7.6 6.5 7.9 11.2.3 5-.5 9.8-1.7 14.5-.4 2.1-2.3 4-3.6 6.1M87.6 213.7c7.3-.2 12.7 6.5 11 13.5-.4 1.8-.4 3.7-.5 5.6-.2 4.4-2.7 7.4-6 9.7-2.4 1.7-7.9-1.5-8.9-5.1-1.8-5.9-2.7-12-2.2-18.2.2-3.6 2.3-5.4 6.6-5.5M143.2 185.4c.3-2.2.3-4.4.9-6.5 1.6-5.6 7.6-7.2 12.4-3.7 9.9 7.2 4.2 20.3-3.2 23.9-3.3 1.6-7.6-.3-8.8-3.7-.4-1.2-.7-2.5-.8-3.7-.2-2.2-.3-4.2-.5-6.3M146.2 39.6c-1.4-1.6-3-2.8-3.7-4.4-2.1-4.8-4.2-9.6-5.6-14.7-1.2-4.5-.1-9.1 2.5-13 1.4-2.1 6.7-1.7 8.6.6 1.1 1.3 2.2 2.9 2.6 4.5 2 7.4 3.6 15 .3 22.4-.7 1.8-2.8 2.9-4.7 4.6M75.1 13.8c2.1.5 3.7.8 5.2 1.2 2.4.7 4.2 2 4.7 4.7 1 5.4 3.6 10.5 3 16.2-.3 3.5-1.2 6.5-4.2 8.5-2.5 1.7-5 1-6.2-1.7-3.2-7.3-5.4-14.9-4.8-23 .1-2 1.5-3.9 2.3-5.9M63.8 116.4c.3-2 .6-3.4.7-4.8.2-1.9-.9-4.5 1.9-5.3 2.9-.9 6.1-1.4 8.5.9 3.9 3.7 6.4 8.2 5.5 13.9-.4 3.1-.3 6.1-3 8.5-4.4 3.9-9.3 3.1-11.2-2.6-1.2-3.5-1.7-7.4-2.4-10.6M230.2 33.7c-3.2-7.6-6.1-14.9-7.6-22.7-.7-3.8 1.3-6.7 2.3-10 .2-.6 2-1.3 2.3-1 2.4 2 6.5 2.3 7 6.2.8 6.3 1.7 12.6 2.2 18.9.5 3.2-2.6 6.9-6.2 8.6M14.8 15.4c7.1-.4 10.3 1.7 11.4 8 .6 3.6.6 7.2 1.1 10.8.5 3.2-1.6 5.4-3 7.8-1.6 2.7-4.4 2.1-5.7-.9-1.6-3.6-3.4-7.2-4.6-11-1.4-4.7-1.4-9.7.8-14.7M102.9 70.4c.4-3.1.5-6.3 1.3-9.4.8-3.3 4-4.5 7.1-3 3.7 1.8 5.8 4.6 5.3 8.7-.5 4.6-1.2 9.1-2 13.6-.4 2.4-2 3.8-4.6 4.1-2.3.3-3.3-1-4.6-2.6-2.7-3.4-1.8-7.5-2.5-11.4M13.2 204.1c.6-3.1.8-5.4 1.6-7.4.5-1.1 1.9-2.2 3.1-2.6 3.4-1.1 7.5 1.5 8.4 5 1.1 4 1.3 8 .8 12.2-.4 2.8-1.8 4.4-4.2 5.2-2.6.8-5.1-.4-6.2-2.5-1.7-3.4-2.6-7.1-3.5-9.9"/>
                </pattern>
                <path fill="url(#pattern-12)" d="M0 0h6000v800H0z"/>
            </svg>
        </div>
    </v-layout>
</template>

<script>
  export default {
    name: 'app-home-banner',
    props: {
      image: String
    },
    computed: {
      content () {
        return this.$store.getters['page/content']('homepage')
      },
      banner_text () {
        let bannerImg = this.content.filter(item => item.slug === 'banner')[0]
        if (bannerImg !== undefined) {
          return bannerImg.description.replace(/<\/?[^>]+(>|$)/g, '')
        } else {
          return ''
        }
        // return this.content.filter(item => item.slug === 'banner')[0].description.replace(/<\/?[^>]+(>|$)/g, '') || {}
      }
    }

  }
</script>

<style lang="stylus" scoped>
    ._home-banner
        position relative
        &--bg-elements
            .svg-icon
                position absolute
                // top -90px
                // top -170px
                top -55px
                stroke none
                // left 0
                right 0
                // width 100%
                width 100vw
                z-index 15
                height 150px
                color var(--pink)
                @media (min-width: 600px)
                    // top 50px
                    top -410px
                    left auto
                    right -6px
                    width 180px
                    height 295px
                    color var(--green)
                @media (min-width: 960px)
                    // top 76px
                    top -892px
                    width 230px
                    height 380px
                @media (min-width: 1200px)
                    height 470px
        &--img
            @media (min-width: 600px)
                padding 0 16px
            @media (min-width: 960px)
                padding 0 24px
        &--text
            padding 80px 0 25px
            position relative
            text-align center
            z-index 5
            .container
                z-index 10
            @media (max-width: 599px)
                ._home-banner--bg-elements .svg-icon
                    display none
            @media (min-width: 600px)
                font-size 8px
                padding 32px 0
                top -100px
                text-align left
                &:before
                    content ''
                    position absolute
                    top 0
                    height 100%
                    width 50%
                    background-color var(--green)
                    z-index 1
                &--title
                    padding-right 24px
                @media (min-width: 960px)
                    font-size 12px
                    padding 48px 0
                    top -130px
                    margin-top -60px
                @media (min-width: 1200px)
                    padding 80px 0
                    margin-top -120px
                    &--title
                        padding-right 130px
                ._home-banner--bg-elements .svg-icon
                    top auto
                    left 44%
                    bottom -45px
                    width 180px
                    height 180px
                    z-index 5
                    @media (min-width: 960px)
                        width 230px
                        height 230px
                        // bottom -50px
                        bottom -65px

            h1, a
                color #fff
            a
                font-size 16px
                
</style>
