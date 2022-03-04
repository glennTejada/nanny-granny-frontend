<template>
    <v-layout column _login-section>
        <v-flex app-bg-sand pb-5 class="p-relative">
            <v-container fill-height grid-list-xl w--max--800>
                <v-layout column text-xs-center>
                    <v-flex tag="h1"
                            class="mt-5">Login to find a NannyGranny
                    </v-flex>
                    <v-flex tag="h2"
                            class="_login-section--sub-title">Login with
                    </v-flex>
                    <!--SOCIAL-->
                    <v-flex>
                        <auth-social view-login></auth-social>
                    </v-flex>
                    <!--DIVIDER-->
                    <v-flex class="_login-section--divider">
                        <app-svg-icon name="brand/NG_DIVIDER"></app-svg-icon>
                        <span class="font--medium d-inline-block mx-4">or</span>
                        <app-svg-icon name="brand/NG_DIVIDER"></app-svg-icon>
                    </v-flex>
                    <!--EMAIL-->
                    <v-flex tag="h2"
                            class="_login-section--sub-title sub-title_second">Use your email address
                    </v-flex>
                    <v-flex>
                        <auth-login-email></auth-login-email>
                    </v-flex>
                </v-layout>
            </v-container>
            <!--BACKGROUND ELEMENTS-->
            <v-flex v-if="$vuetify.breakpoint.mdAndUp"
                    class="_login-section--bg-elements">
                <app-scroll-patterns svgName="brand/NG_CREATIVE_PLAY" v-if="$vuetify.breakpoint.mdAndUp"
                          svgTop="-320px"
                          svgClass="svg-icon-creative"
                          svgRight="190px"
                          svgWidth="122px"
                          svgHeight="122px"
                          svgColor="var(--yellow)"
                          duration="2"
                          moveX=-1
                          moveY=3>
                </app-scroll-patterns>
                <app-scroll-patterns svgName="patterns/NG_Pattern-16" v-if="$vuetify.breakpoint.mdAndUp"
                          svgTop="-800px"
                          svgClass="svg-icon-pattern"
                          svgLeft="40px"
                          svgWidth="122px"
                          svgHeight="122px"
                          svgColor="none var(--orange)"
                          duration="1"
                          moveX=0
                          moveY=2>
                </app-scroll-patterns>
            </v-flex>
        </v-flex>
        <v-flex class="_login-section--benefits">
            <v-container fill-height grid-list-xl>
                <app-auth-benefits></app-auth-benefits>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppScrollPatterns from '../../../../components/app-scroll-patterns'
  import AuthSocial from '../components/auth-social'
  import AuthLoginEmail from '../components/auth-login-email'
  import AppAuthBenefits from '../components/app-auth-benefits'

  export default {
    components: {AppScrollPatterns, AppAuthBenefits, AuthLoginEmail, AuthSocial}
  }
</script>

<style lang="stylus" scoped>
    ._login-section
        position relative
        &--sub-title
            margin-top 24px
            @media (min-width 600px)
                margin-top 42px
                margin-bottom 42px
            &.sub-title_second
                margin-top 0
                @media (min-width 600px)
                    margin-bottom 62px
        &--divider
            @media (min-width 600px)
                margin-top 42px
                margin-bottom 42px
            .svg-icon
                width 100px
                height 50px
                color var(--yellow)
                @media (min-width 600px)
                    width 139px
        &--benefits
            padding 50px 0 100px
        &--bg-elements
            .svg-icon
                position absolute
                width 122px
                height 122px
                &--creative
                    color var(--yellow)
                    right 90px
                    bottom 350px
                &--pattern
                    left 40px
                    top 180px
</style>
