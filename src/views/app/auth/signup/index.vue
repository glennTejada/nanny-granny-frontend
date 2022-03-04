<template>
    <v-layout row wrap>
        <v-flex xs12
                _stepper--box
                class="hidden-sm-and-down">
            <v-stepper :value="step"
                       alt-labels
                       flat
                       class="hidden-xs-only elevation-0 _stepper ma-auto">
                <v-stepper-header>
                    <v-stepper-step :complete="step > 0" complete-icon="" step>
                        <span class="_stepper--label">{{ nameSteps[stepperType][0] }}</span>
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="step > 1" complete-icon="" step>
                        <span class="_stepper--label">{{ nameSteps[stepperType][1] }}</span>
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="step > 2" complete-icon="" step>
                        <span class="_stepper--label">{{ nameSteps[stepperType][2] }}</span>
                    </v-stepper-step>
                </v-stepper-header>
            </v-stepper>
        </v-flex>
        <v-flex xs12>
            <v-slide-y-transition mode="out-in">
                <router-view class="child-view"></router-view>
            </v-slide-y-transition>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        transitionName: 'slide-left',
        nameSteps: {
          parent: ['Register', 'Choose a plan', 'Payment'],
          nanny: ['Register', 'Personal details', 'Qualifications']
        }
      }
    },
    computed: {
      step: function () {
        return this.$route.params.step ? this.$route.params.step.split('-')[1] : 1
      },
      stepperType: function () {
        return this.$store.getters['register/stepperType']
      }
    },
    created () {
      //
    }
  }
</script>

<style lang="stylus">
    @import "../../../../styles/stylus/settings/_variables.styl"
    ._stepper--box
        padding 60px 24px 40px
        border-bottom 2px solid var(--grey_2)
        .v-stepper
            &._stepper
                max-width 750px
                ._stepper--label
                    font-size 18px
                    color var(--charcoal)
                    position: absolute
                    top: -5px
                    text-align: center
                    left: -10px
                    right: -10px
                .v-stepper__step--complete
                    ._stepper--label
                        color var(--blue)
                        font-family $body-font-family-medium
                .v-stepper__header
                    .v-divider
                        margin: 32px -80px 0
                        border-width 1px
                        border-color var(--blue) !important
                    .v-stepper__step
                        .v-stepper__step__step
                            margin 0
                            width 18px
                            height 18px
                            min-height 18px
                            min-width 18px
                    .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error)
                        .v-stepper__step__step
                            background-color #fff !important
                            border 2px solid var(--blue)
</style>
