<template>
    <v-layout _card-post-hurry
              column>
        <v-flex class="d-flex align-center">
            <v-container grid-list-xl>
                <v-layout row wrap text-xs-center>
                    <v-flex xs12>
                        <v-card flat
                                color="transparent">
                            <v-card-text class="pa-0 mb-4 justify-center">
                                <h2>Can't decide in a hurry?</h2>
                            </v-card-text>
                            <v-card-actions class="justify-center">
                                <v-btn to="/job-post"
                                       color="primary"
                                       depressed>Post a Job</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <!--BACKGROUND ELEMENTS-->
        <v-flex v-if="$vuetify.breakpoint.smAndUp"
                class="_card-post-hurry--bg-elements">
          <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
            <app-svg-icon name="brand/NG_FAVOURITES_FILL"
                          color="var(--orange)"
                          class="svg-icon--heart">
            </app-svg-icon>
          </div>
          <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
            <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                          name="brand/NG_ENGAGED"
                          color="var(--blue)"
                          class="svg-icon--engaged"></app-svg-icon>
          </div>
          <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
            <app-svg-icon name="brand/NG_LIGHT_HOUSEWORK"
                          color="var(--green)"
                          class="svg-icon--light_homework"></app-svg-icon>
          </div>
          <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
            <app-svg-icon name="brand/NG_ACTIVE"
                          class="svg-icon--active_green"
                          color="var(--green)"></app-svg-icon>
          </div>
          <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
            <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                          name="patterns/NG_Pattern-11"
                          color="none var(--yellow) none"
                          class="svg-icon--pattern-11"></app-svg-icon>
          </div>
          <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationDown()">
            <app-svg-icon name="brand/NG_ACTIVE"
                          class="svg-icon--active_yellow"
                          color="var(--yellow)"></app-svg-icon>
          </div>
          <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
            <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                          name="patterns/NG_Pattern-15"
                          color="none var(--blue) none"
                          class="svg-icon--pattern-15"></app-svg-icon>
          </div>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'app-card-post-job-hurry'
  }
</script>

<style lang="stylus" scoped>
    ._card-post-hurry
        overflow hidden
        position relative
        background-color #fff
        @media (min-width 600px)
            height 525px
        .container
            max-width 960px
        .v-btn
            min-width 160px
        &--bg-elements
            max-height 1px
            .svg-icon
                position absolute
                height 70px
                &--heart
                    width 46px
                    height 58px
                    left 10%
                    // top 50px
                    top -480px
                    transform rotate(15deg)
                    @media (min-width 960px)
                        left 29%
                &--light_homework
                    width 95px
                    height 80px
                    right 15%
                    bottom 190px
                    @media (min-width 960px)
                        right 21%
                &--active_green
                    width 88px
                    height 74px
                    left 18%
                    // bottom 150px
                    bottom 50px
                    @media (min-width 960px)
                        left 24%
                &--active_yellow
                    width 88px
                    height 74px
                    right 15%
                    // top -6px
                    top -500px
                    transform rotate(85deg)
                &--engaged
                    left 5%
                    bottom 10px
                    width 110px
                &--pattern-11
                    width 200px
                    height 200px
                    left -48px
                    // top -48px
                    top -548px
                    transform rotate(30deg)
                &--pattern-15
                    width 200px
                    height 240px
                    right -88px
                    bottom 90px
                    transform rotate(-30deg)
</style>

