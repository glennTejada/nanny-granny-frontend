<template>
    <v-layout
              _benefits row wrap v-scrollanim="{ bEnt: 'app-bg-white', enter: 'bg-animate app-bg-sand', offsetBottom: 200 }">
        <v-flex xs12
                tag="h2"
                class="text-xs-center _benefits--title">Why NannyGranny?
        </v-flex>
        <v-flex xs12>
            <v-container
                    grid-list-lg
                    fill-height
                    _benefits-container>
                <v-layout v-if="$vuetify.breakpoint.smAndDown"
                          row
                          wrap
                          _items-box>
                    <app-window-base :items="items">
                        <template slot="item" slot-scope="{item, ind}">
                            <app-card-benefits :item="item" :ind="ind" class="ma-auto"></app-card-benefits>
                        </template>
                    </app-window-base>
                </v-layout>
                <v-layout v-else
                          row
                          wrap
                          _items-box>
                    <v-flex v-for="(item, i) in items"
                            :key="i"
                            xs12
                            md3>
                        <app-card-benefits :item="item"></app-card-benefits>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <!--BACKGROUND ELEMENTS-->
        <div class="_benefits-bg-elements">
          <!-- <div v-parallax="$helpers.getSpeedAnimationDown()" class="smooth-parallax"> -->
          <div v-parallaxxy="{ x: -0.1, y: -0.1 }" class="smooth-parallax a1">
            <app-svg-icon name="brand/NG_ACTIVE"
                          class="active_1"></app-svg-icon>
          </div>
          <div v-parallax="$helpers.getSpeedAnimationUp()" class="smooth-parallax">
            <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                          name="patterns/NG_Pattern-15"
                          class="pattern-15"
                          color="none var(--blue)"></app-svg-icon>
          </div>
          <div v-parallax="$helpers.getSpeedAnimationUp()" class="smooth-parallax">
            <app-svg-icon name="patterns/NG_Pattern-10"
                          class="pattern-10"
                          color="none var(--green)"></app-svg-icon>
          </div>
          <div v-parallax="$helpers.getSpeedAnimationUp()" class="smooth-parallax">
            <app-svg-icon name="brand/NG_ACTIVE"
                          class="active_3"
                          color="var(--green)"></app-svg-icon>
          </div>
          <app-scroll-patterns svgName="patterns/NG_Pattern-13" v-if="$vuetify.breakpoint.mdAndUp"
                          svgTop="-30px"
                          svgClass="pattern-13-new"
                          svgRight="-70px"
                          svgWidth="160px"
                          svgHeight="270px"
                          svgTransform="rotate(122deg)"
                          svgColor="none var(--orange)"
                          duration="0.2"
                          moveX=0
                          moveY=2>
          </app-scroll-patterns>
        </div>
    </v-layout>
</template>

<script>
  import AppScrollPatterns from '../../../../components/app-scroll-patterns'
  import AppWindowBase from '../../../../components/app-windows/app-window-base'
  import AppCardBenefits from '../../../../components/app-card/app-card-benefits'

  export default {
    name: 'app-home-benefits',
    components: {AppScrollPatterns, AppCardBenefits, AppWindowBase},
    computed: {
      items () {
        const _items = this.$store.getters['page/content']('homepage')
          .filter(item => item.slug === 'benefits')
        _items.forEach((item) => {
          if (this.$lodash.isString(item.param)) {
            try {
              item.param = JSON.parse(item.param)
            } catch (e) {
              console.error('NG error: Benefits - Unexpected token u in JSON')
            }
          }
        })
        return _items
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._benefits
        position relative
        overflow hidden
        &-container
            height 410px
        &--title
            margin 45px 0 24px
        @media (min-width: 960px)
            padding-top 50px
            padding-bottom 200px
            &-container
                height 600px
            &--title
                margin 45px 0 45px

    .app-dashboard
        width 99px
        height 99px

    ._items-box
        .flex
            &:nth-child(1)
                //align-self center

            &:nth-child(2n)
                align-self flex-end

            .v-card
                background transparent

    ._benefits-bg-elements
        width 100%
        .svg-icon
            position absolute

            &.active_1
                // top 70px
                top -452px
                right -10px
                width 60px
                height 60px
                color var(--yellow)
                @media (min-width: 960px)
                    // top 184px
                    top -520px
                    left 35%
                    width 83px
                    height 71px

            &.active_3
                top -24px
                right -10px
                width 60px
                height 60px
                transform rotate(75deg)
                color var(--green)
                @media (min-width: 960px)
                    // top 184px
                    top -24px
                    left 51%
                    width 83px
                    height 71px

            &.active_2
                // bottom 130px
                bottom 0px
                left 56%
                width 88px
                height 76px
                transform rotate(75deg)
                color var(--green)

            &.pattern-15
                right -50px
                // top 125px
                top -610px
                width 160px
                height 270px

            &.pattern-10
                left -70px
                bottom -60px
                // bottom 0px
                width 140px
                height 160px
                @media (min-width: 960px)
                    left -60px
                    // bottom 110px
                    bottom 0px
                    width 160px
                    height 270px

            &.pattern-13
                right -70px
                // bottom -16px
                top -30px
                width 160px
                height 270px
                transform rotate(122deg)

</style>
