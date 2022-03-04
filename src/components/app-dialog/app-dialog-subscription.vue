<template>
    <v-layout pa-3 justify-center class="app-bg-sand _box">
        <v-flex class="w--max--800">
            <v-layout text-xs-center  column>
                <v-flex tag="h2" class="_title">
                    To able to book one of the NannyGrannies, register now:
                </v-flex>
                <v-flex >
                    <app-btn-toggle-plan-reg></app-btn-toggle-plan-reg>
                </v-flex>
                <v-flex class="_actions">
                    <v-btn to="/signup"
                           class="v-btn--default primary elevation-0">
                        Register now
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
        <!--BACKGROUND-->
        <app-svg-icon name="brand/NG_CREATIVE_PLAY"
                      class="_creative"></app-svg-icon>
    </v-layout>
</template>

<script>
  import AppBtnTogglePlan from '../app-buttons/app-btn-toggle-plan-reg'

  export default {
    name: 'app-dialog-subscription',
    components: {AppBtnTogglePlan}
  }
</script>

<style lang="stylus" scoped>
    ._box
        position relative
        overflow hidden
    .container
        background-color #fff
    ._title
        margin 30px 0
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
            margin 50px 0
        ._actions
            margin 16px 0
        ._creative
            bottom: 45px
            left: 45px
        .v-btn--default
            min-width: 195px
    @media (min-width: 768px)
        ._creative
            width 98px
            height 98px
            bottom: 45px
            left: 70px
</style>
