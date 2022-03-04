<template>
    <v-layout _card-follow column v-scrollanim="{ bEnt: 'app-bg-white', enter: 'bg-animate app-bg-sand' }">
        <v-flex class="d-flex align-center">
            <v-container grid-list-xl>
                <v-layout row wrap text-xs-center>
                    <v-flex xs12 sm5>
                        <v-card flat
                                color="transparent">
                            <v-card-text class="pa-0 justify-center">
                                <div class="_card-follow--brandshape mx-auto mb-3">
                                    <app-brandshape color="var(--sand)"
                                                    :width="$vuetify.breakpoint.xsOnly ? '60px' : '78px'"
                                                    :height="$vuetify.breakpoint.xsOnly ? '60px' : '78px'">
                                        <div class="brandshape--icon icon_facebook">
                                            <app-svg-icon name="ui/NG_FACEBOOK"
                                                          :height="$vuetify.breakpoint.xsOnly ? '30px' : '40px'"
                                                          color="var(--white)"></app-svg-icon>
                                        </div>
                                    </app-brandshape>
                                </div>
                                <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit cras dapibus vulputate diam eu pretium.</p>-->
                            </v-card-text>
                            <v-card-actions class="amc_follow_width justify-center">
                                <v-btn color="primary"
                                       :href="facebook.param | text"
                                       target="_blank"
                                       outline>Follow us on Facebook</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm2 class="d-flex align-center _card-follow--bg">
                      <div v-parallax="$helpers.getSpeedAnimationDown()" class="smooth-parallax">
                        <app-svg-icon name="brand/NG_ACTIVE"
                                      width="83"
                                      :height="$vuetify.breakpoint.xsOnly? '50px' : '71px'"
                                      color="var(--green)"
                                      class="svg-icon--active"></app-svg-icon>
                      </div>
                    </v-flex>
                    <v-flex xs12 sm5>
                        <v-card flat
                                color="transparent">
                            <v-card-text class="pa-0 justify-center">
                                <div class="_card-follow--brandshape mx-auto mb-3">
                                    <app-brandshape color="var(--sand)"
                                                    :width="$vuetify.breakpoint.xsOnly ? '60px' : '78px'"
                                                    :height="$vuetify.breakpoint.xsOnly ? '60px' : '78px'"
                                                    class="mb-3">
                                        <div class="brandshape--icon icon_instagram">
                                            <app-svg-icon name="ui/NG_INSTAGRAM"
                                                          :height="$vuetify.breakpoint.xsOnly ? '30px' : '40px'"
                                                          color="var(--white)"></app-svg-icon>
                                        </div>
                                    </app-brandshape>
                                </div>
                                <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit cras dapibus vulputate diam eu pretium.</p>-->
                            </v-card-text>
                            <v-card-actions class="amc_follow_width justify-center">
                                <v-btn :href="instagram.param | text"
                                       target="_blank"
                                       color="primary" outline>Follow us on Instagram</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <!--BACKGROUND ELEMENTS-->
        <v-flex v-if="$vuetify.breakpoint.mdAndUp"
                class="_card-follow--bg-elements">
          <div v-parallax="$helpers.getSpeedAnimationDown()" class="smooth-parallax">
            <app-svg-icon name="brand/NG_PETS"
                          color="var(--green)"
                          class="svg-icon--pets"></app-svg-icon>
          </div>
          <div v-parallax="$helpers.getSpeedAnimationDown()" class="smooth-parallax">
            <app-svg-icon name="brand/NG_ENGAGED"
                          color="var(--blue)"
                          class="svg-icon--engaged"></app-svg-icon>
          </div>
          <div v-parallax="$helpers.getSpeedAnimationUp()" class="smooth-parallax">
            <app-svg-icon name="patterns/NG_Pattern-04"
                          color="none var(--orange) none"
                          class="svg-icon--pattern-04"></app-svg-icon>
          </div>
          <div v-parallax="$helpers.getSpeedAnimationUp()" class="smooth-parallax">
            <app-svg-icon name="patterns/NG_Pattern-14"
                          color="none var(--yellow) none"
                          class="svg-icon--pattern-14"></app-svg-icon>
          </div>

        </v-flex>
    </v-layout>
</template>

<script>
  import AppBrandshape from '../app-brandshape'
  export default {
    name: 'app-card-follow-us',
    components: {AppBrandshape},
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
    ._card-follow
        overflow hidden
        position relative
        background-color var(--sand)
        @media (min-width 600px)
            height 525px
        .container
            max-width 960px
        .v-btn
            min-width 263px
        &--bg
            .svg-icon
                position absolute
                width 74px
                height 70px
                &--active
                    top 500px
                    right 20px
                    transform rotate(25deg)
                    @media (max-width 760px) {
                      display none
                    }                  
        &--brandshape
            max-width 60px
            height 60px
            @media (min-width 600px)
                max-width 78px
                height 78px
            .brandshape--icon
                height 100%
                display flex
                align-items center
                justify-content center
                &.icon_facebook
                    background-color var(--yellow)
                &.icon_instagram
                    background-color var(--orange)
        &--bg-elements
            max-height 1px
            .svg-icon
                position absolute
                width 74px
                height 70px
                &--pets
                    width 60px
                    // top 90px
                    top -295px
                    transform rotate(25deg)
                    right calc(50% - 35%);
                    @media (max-width 1440px) {
                      right: calc(50% - 40%);
                    }
                    @media (max-width 1024px) {
                      display: none;
                      right: calc(50% - 50%);
                    }
                &--engaged
                    // bottom 50px
                    bottom 100px
                    left calc(50% - 35%);
                    @media (max-width 1440px) {
                      left: calc(50% - 40%);
                    }
                    @media (max-width 1024px) {
                      display: none;
                      left: calc(50% - 50%);
                    }
                &--pattern-04
                    width 155px
                    height 150px
                    left -45px
                    // top 80px
                    top -250px
                    transform rotate(-125deg)
                &--pattern-14
                    width 220px
                    height 150px
                    right -65px
                    bottom 0
</style>
