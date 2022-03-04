<template>
    <v-layout column>
        <v-flex class="d-flex">
            <span class="app-text-light d-inline-block mb-2">
                <slot name="title">WWC (or equivalent to each State) details*</slot>
            </span>
        </v-flex>
        <v-flex v-if="$auth.user().is_wwcverify === 1"
                class="border border--grey_2 d-flex _wwc-block align-center pa-3">
            <div class="d-flex align-center">
                <span>
                    Thank you! Your details have been sent and are awaiting approval.
                </span>
            </div>
            <v-btn class="v-btn--default primary elevation-0">
                Verification pending
            </v-btn>
        </v-flex>
        <v-flex v-else-if="$auth.user().is_wwcverify === 2"
             class="border border--grey_2 d-flex _wwc-block align-center pa-3">
            <div class="d-flex align-center">
                <div class="_wwc-block-icon mr-3">
                    <app-brandshape color="var(--white)"
                                    height="60px"
                                    width="60px">
                        <div class="app-bg-blue fill-height d-flex align-center">
                            <app-svg-icon name="brand/NG_WORKING_W_CHILDREN"
                                          height="21"
                                          width="41"></app-svg-icon>
                        </div>
                    </app-brandshape>
                </div>
                <span class="font--medium">{{$auth.user().postcode.state}} Working With Children check</span>
            </div>
            <v-btn class="v-btn--default primary elevation-0">
                <app-svg-icon name="ui/NG_TICK"
                              class="mr-2"
                              width="18"
                              height="18"></app-svg-icon>
                Verified
            </v-btn>
        </v-flex>
        <v-flex v-else>
            <app-profile-wwc-form></app-profile-wwc-form>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppProfileWwcForm from './wwc-form'
  import AppBrandshape from '../../../../components/app-brandshape'

  export default {
    name: 'app-profile-wwc',
    components: {AppBrandshape, AppProfileWwcForm}
  }
</script>

<style lang="stylus" scoped>
    ._wwc-block
        flex-wrap wrap
        @media (min-width 600px)
            height 123px
            flex-wrap nowrap

        ._wwc-block-icon
            background var(--blue)
            color #fff
            display flex
            align-items center
            justify-content center
            max-width 30px
            min-width 31px
            height 31px
            @media (min-width 600px)
                max-width 60px
                min-width 60px
                height 60px

            .svg-icon
                width 22px
                height 22px
                @media (min-width 600px)
                    width 41px
                    height 32px

        .v-btn--default
            margin-top 20px
            @media (min-width: 600px)
                margin-top 0
                max-width 197px
                min-width 197px
</style>

