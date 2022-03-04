<template>
    <v-layout v-if="items.length > 0"
              column
              _recently-section>
        <v-flex text-xs-center>
            <h2 class="_recently-section--title">Recently viewed</h2>
        </v-flex>
        <v-flex>
            <app-horizontal-scrolling>
                <component v-for="item in items"
                           :is="componentName"
                           :key="`rec_${item.id}`"
                           :item="item"></component>
            </app-horizontal-scrolling>
        </v-flex>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$auth.check(['nanny'])"
             class="_recently-section--bg-elements">
            <app-svg-icon name="patterns/NG_Pattern-11"
                          class="pattern-11"
                          color="none var(--yellow)"></app-svg-icon>
            <app-svg-icon name="patterns/NG_Pattern-12"
                          class="pattern-12"
                          color="none var(--green)"></app-svg-icon>
        </div>
    </v-layout>
</template>

<script>
  import AppCardRecentlyNanny from '@/components/app-card/app-card-recently-nanny'
  import AppCardRecentlyJob from '@/components/app-card/app-card-recently-job'
  import AppHorizontalScrolling from '@/components/app-horizontal-scrolling'

  export default {
    name: 'app-home-recently-viewed',
    components: {AppHorizontalScrolling, AppCardRecentlyJob, AppCardRecentlyNanny},
    computed: {
      componentName () {
        return this.$auth.check(['parent']) ? 'AppCardRecentlyNanny' : 'AppCardRecentlyJob'
      },
      items () {
      //  console.log(this.$store.getters['recentlyView/collection'])
        return this.$store.getters['recentlyView/collection']
      }
    },
    created () {
      this.$store.dispatch('recentlyView/RECENTLY_GET', this.$auth.user())
    },
    beforeDestroy () {
      this.$store.commit('recentlyView/SUCCESS', [])
    }
  }
</script>

<style lang="stylus" scoped>
    ._recently-section
        position relative
        overflow hidden
        &--title
            margin 40px 0 30px
            @media (min-width 600px)
                margin 140px 0 30px
        &--bg-elements
            height 100px
            .svg-icon
                position absolute
                z-index 1
                &.pattern-11
                    top: 50px
                    right: -80px
                    width: 150px
                    height: 150px
                    transform rotate(180deg)
                    @media (min-width 600px)
                        top 116px
                        right -22px
                        width 200px
                        height 200px
                &.pattern-12
                    bottom 50px
                    left -70px
                    width 150px
                    height 150px
                    @media (min-width 600px)
                        bottom 20px
                        right -22px
                        width 200px
                        height 200px
</style>
