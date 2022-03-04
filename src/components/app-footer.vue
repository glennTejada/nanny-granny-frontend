<template>
    <v-footer height="auto" class="app-footer">
        <v-layout row>
            <v-flex xs12>
                <v-card flat
                        tile
                        class="primary px-4">
                    <v-card-title class="app-footer-nav">
                        <v-btn v-for="item in items"
                               :key="item.title"
                               :to="item.path"
                               :ripple="false"
                               flat>
                            {{item.title}}
                        </v-btn>
                        <v-spacer></v-spacer>
                        <span class="white--text change-font-size">
                            <!--Change font size-->
                            <!--<span class="white&#45;&#45;text" style="font-size: 14px">A</span>-->
                            <!--<span class="white&#45;&#45;text">A</span>-->
                        </span>
                    </v-card-title>
                    <v-divider class="hidden-xs-only white"></v-divider>
                    <v-card-actions class="app-footer-actions white--text">
                        <span class="white--text">Copyright 2020 NannyGranny</span>
                        <v-spacer></v-spacer>
                        <div class="app-footer-social">
                            <a :href="facebook.param | text"
                               target="_blank">
                                <span class="app-social facebook d-inline-block rounded--brand mr-3"></span>
                            </a>
                            <a :href="instagram.param | text"
                               target="_blank">
                                <span class="app-social instagram d-inline-block rounded--brand"></span>
                            </a>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-footer>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {title: 'About us', path: '/about-us'},
          {title: 'Contact us', path: '/contact-us'},
          {title: 'FAQ', path: '/faqs'},
          {title: 'Testimonials', path: '/testimonials'},
          // {title: 'Online Safety', path: '/safety'},
          {title: 'Child Care Subsidy', path: '/child-care-rebate'},
          {title: 'Legal', path: '/legal'},
          {title: 'Privacy Policy', path: '/privacy-policy'}
        ]
      }
    },

    computed: {
      links () {
        return this.$store.getters['page/content']('social_links')
      },
      facebook () {
        return this.links.filter(item => item.slug === 'facebook')[0] || {}
      },
      instagram () {
        return this.links.filter(item => item.slug === 'instagram')[0] || {}
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .app-footer
        letter-spacing: 0.3px;
        .app-footer-nav
            flex-direction column
            padding 40px 0 20px
            .v-btn
                color #fff
                text-transform none
                margin 0
                height 20px
                font-size 1rem
                padding 16px
                min-width 0
                &:hover
                    opacity 0.8
            .change-font-size
                font-size 18px
                margin-top 40px
                &:hover
                    opacity .8
                    cursor pointer

        .app-footer-actions
            flex-direction column-reverse
            padding 16px 0 40px
            .app-footer-social
                margin-bottom 54px
        hr
            opacity .3
        .ng-icon-social
            &:hover
                cursor pointer
                opacity: .8
        .v-btn--active:before, .v-btn:hover:before, .v-btn:focus:before
            background-color transparent

    @media (min-width: 600px)
        .app-footer
            .app-footer-nav
                flex-direction row
                padding 98px 0 40px
                .v-btn
                    font-size 1.1428571428571428rem
                    padding 0
                    &:after
                        content ''
                        display inline-block
                        width 1px
                        height 16px
                        margin 0 13px
                        background-color #fff
                    &:nth-child(8):after
                        width 0
                .change-font-size
                    font-size 16px
                    margin-top 0
            .app-footer-actions
                flex-direction row
                padding 32px 0 70px
                .app-footer-social
                    margin-bottom 0
</style>
