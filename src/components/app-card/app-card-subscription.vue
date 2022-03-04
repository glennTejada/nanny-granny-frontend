<template>
    <v-layout pa-3 justify-center class="app-bg-sand">
            <v-flex subscription-layout>
                <!--BACKGROUND ELEMENTS-->
                <div class="subscription-layout--bg-elements">
                <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp(0.5)">
                    <app-svg-icon name="patterns/NG_Pattern-09"
                                class="_pattern-09"
                                color="none var(--blue)"></app-svg-icon>
                </div>
                <div class="smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp(0.5)">
                    <app-svg-icon name="patterns/NG_Pattern-15"
                                class="_pattern-15"
                                color="none var(--yellow)"></app-svg-icon>
                </div>
                </div>
            </v-flex>
        <div class="_box">
            <v-flex class="">
                <v-layout text-xs-center class="_sub_left_block">
                    <v-flex tag="h2" class="_title">
                        To able to book one of these NannyGrannies, sign up now:
                        <v-btn to="/signup"
                            class="v-btn--default primary elevation-0">
                            Sign up now
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout text-xs-center class="_sub_right_block">
                    <app-btn-toggle-plan hide-description></app-btn-toggle-plan>
                </v-layout>
            </v-flex>
        </div>
    </v-layout>
</template>

<script>
  import AppBtnTogglePlan from '../app-buttons/app-btn-toggle-plan'

  export default {
    name: 'app-card-subscription',
    components: {AppBtnTogglePlan}
  }
</script>

<style lang="stylus" scoped>
    .app-bg-sand 
        margin 0 -16px !important
    .subscription-layout
        position relative
        padding: 0 !important;
        z-index 1
        @media (max-width 959px)
            overflow hidden
        &--bg-elements
            .svg-icon
                position absolute
                &._pattern-09
                    width 170px
                    height 240px
                    @media (min-width 600px)
                        display none
                    @media (min-width 960px)
                        display block
                        left -125px
                        top -225px
                &._pattern-15
                    width 170px
                    height 240px
                    transform rotate(0deg)
                    z-index 1
                    @media (min-width 600px)
                        display none
                    @media (min-width 960px)
                        display block
                        top -105px
                        left 1135px

    ._box
        background-color var(--green) !important
        position relative
        padding 8px 16px !important
        z-index 2
        @media (max-width 959px)
            overflow hidden
            padding 8px 8px !important
    .container
        background-color var(--green)
        padding 0 16px
    ._sub_left_block
        width 22%
        float left
        @media (max-width 959px)
            display block
            width 100%
            margin 0 !important;
    ._sub_right_block
        width 79%
        float left
        @media (max-width 959px)
            width 100%
            margin: 0;
    ._title
        color var(--white);
        margin 20px 15px 0px 0px
        font-size 18px
        text-align left
        @media (max-width 959px)
            font-size 12px
            text-align center
            font-weight: normal;
            margin: 20px 0px 0 0;            
    ._title > a
        @media (max-width 959px)
            font-weight: normal;
            margin-top 20px
    ._actions
        margin 16px 0 100px
    ._creative
        position absolute
        bottom 24px
        left 16px
        width 70px
        height 70px
        color var(--orange)

    @media (min-width: 600px)
        ._title
            margin 20px 15px 0px 0px
            font-size 18px
        ._actions
            margin 16px 0
        ._creative
            bottom: 45px
            left: 45px
        .v-btn--default
            margin-top: 45px;
            margin-left: 0px;
            min-width: 195px
            font-size: 1em;
    @media (min-width: 768px)
        ._creative
            width 98px
            height 98px
            bottom: 45px
            left: 70px
</style>
