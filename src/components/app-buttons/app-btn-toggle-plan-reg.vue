<template>
    <v-layout column>
        <v-flex v-if="hasPlans" xs12>
            <v-btn-toggle v-model="select"
                          mandatory
                          class="app-choose-plan align-center elevation-0">
                <v-btn v-for="item in plans"
                       :key="item.id"
                       :ripple="false"
                       :value="item"
                       flat>
                    <div :class="{'_v-btn-content': true, '_with-description': item.description}">
                        <div v-if="item.description"
                             class="_v-btn-description font--light">
                            <span class="_text">{{item.description}}</span>
                        </div>
                        <div class="_invoice-per">
                            <div class="rounded--brand mb-2">{{item.invoice_period}}</div>
                            <span class="app-text-medium">{{item.invoice_interval }}</span>
                        </div>
                        <div class="_details-price">
                            <div v-if="isSave(item)"
                                  class="font--light">
                                Save {{ item | savePer }}%
                            </div>
                            <div class="" v-if="isSave(item)">
                                <span v-if="isSave(item)" class="_price-all font--light">${{Math.round(item.price)}}</span>
                                <span>${{Math.round(item.price_all)}}</span>
                            </div>
                            <div class="" v-if="!isSave(item)">
                                <span>${{Math.round(item.price)}}</span>
                            </div>
                        </div>
                    </div>
                </v-btn>
            </v-btn-toggle>
        </v-flex>
        <v-flex v-if="!hideDescription"
                class="_description">
            <span class="small">*Single payment only, no on-going subscription</span>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'app-btn-toggle-plan-reg',

    filters: {
      savePer: function (item) {
        return (100 - parseInt(parseFloat(item.price_all) * 100 / parseFloat(item.price)))
      }
    },

    props: {
      value: Number,
      mandatory: {
        type: Number,
        default: 1
      },
      hideDescription: Boolean
    },

    data () {
      return {
        select: null
      }
    },

    computed: {
      hasPlans () {
        return this.$store.getters['subscription/hasPlans']
      },
      plans () {
        return this.$store.getters['subscription/plans']
      }
    },

    watch: {
      select () {
        this.$store.commit('subscription/SET_PLAN', this.select)
        if (this.select) {
          this.$emit('input', this.select.id)
        }
      }
    },

    mounted () {
      if (this.hasPlans) {
        this.select = this.plans[this.mandatory]
      }
    },

    methods: {
      isSave: function (item) {
        return parseInt(item.price) !== parseInt(item.price_all) && !isNaN(item.price_all) && parseInt(item.price_all) > 0
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .app-choose-plan
        display flex
        flex-direction column
        width 100%
        background-color transparent !important
        .v-btn
            width 100%
            height auto
            border 2px solid var(--green) !important
            background-color #ffffff
            opacity 1
            padding 0
            &:before
                content none
            &:first-child
                transform translateY(2px)
            &:last-child
                transform translateY(-2px)
            ._v-btn-description
                position absolute
                top -2px
                left -2px
                right -2px
                height 34px
                line-height 34px
                background var(--blue)
                color #fff
                font-size 1rem
            ._invoice-per
                margin-bottom 12px
            ._v-btn-content
                width 100%
                height 165px
                padding 35px 16px 16px
                transition all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
                &._with-description
                    height 190px
                    padding 65px 16px 16px
                .rounded--brand
                    width 38px
                    height 39px
                    background-color var(--green)
                    color #ffff
                    font-size 24px
                    line-height 42px
                    margin auto
                    & ~ span
                        font-size 18px
                        text-transform capitalize
                ._details-price
                    > div
                        display: inline-block
                ._price-all
                    text-decoration line-through
                    color var(--charcoal)
        .v-btn--active
            width calc(100% + 22px)
            background-color var(--green)
            ._v-btn-content
                h3, span
                    color #fff
                .rounded--brand
                    background-color #fff
                    color var(--blue)
    ._description
        margin 32px 0

    @media (min-width: 600px)
        .app-choose-plan
            min-height 304px
            flex-direction row
            .v-btn
                &:first-child
                    transform translateX(2px)
                &:last-child
                    transform translateX(-2px)
                ._v-btn-content
                    height 200px
                    display flex
                    flex-direction column
                    justify-content space-between
                    padding-bottom 20px
                    &._with-description
                        height 200px
                        padding 35px 16px 20px
                    ._details-price
                        > div
                            display: block
                ._v-btn-description
                    background transparent
                    top -16px
                    ._text
                        display inline-block
                        background var(--blue)
                        padding 0 16px
            .v-btn--active
                width 100%
                ._v-btn-content
                    height 240px
                    padding 40px 16px 30px
                    &._with-description
                        height 240px
                        padding 40px 16px 30px

    @media (min-width: 960px)
        .app-choose-plan
            .v-btn
                width 248px
                height 237px
                ._v-btn-content
                    height 237px
                    .rounded--brand
                        width 62px
                        height 63px
                        font-size 38px
                        line-height 65px
                    &._with-description
                        height 237px
            .v-btn--active
                width 258px
                height 304px
                ._v-btn-content
                    height 304px
                    padding 45px 16px 30px
                    &._with-description
                        height 304px
                        padding 45px 16px 30px
</style>
