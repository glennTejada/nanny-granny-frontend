<template>
    <v-layout _forum-header
              wrap
              :class="[backgroundClass]"
              v-scrollanim="{ bEnt: 'before-bg', enter: 'move-bg' }">
        <v-flex _forum-header--image xs12 md6>
            <!-- <v-img :src="src" :lazy-src="src" height="100%" transition="scale-transition"></v-img> -->
            <v-img :src="src" height="100%" transition="fadeinup-transition"></v-img>
        </v-flex>
        <v-flex xs12 md6 py-5>
            <div class="_forum-header--text">
                <slot name="text">
                    <h1 class="mb-5">Welcome to the ClubHouse</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis culpa debitis itaque
                        laborum necessitatibus nulla quaerat quia soluta ut vel. Accusamus autem culpa eius nam
                        obcaecati praesentium quas, quisquam voluptatem?</p>
                </slot>
            </div>
        </v-flex>
        <!--BACKGROUND ELEMENTS-->
        <v-flex class="_forum-header--bg-elements xs12">
            <div class="elements-icon svg--pattern-left"
              v-scrollanim="{ bEnt: 'no', enter: $vuetify.breakpoint.xs ? 'moveup-xs' : $vuetify.breakpoint.sm ? 'moveup-sm' : 'moveup' }">
                <slot name="pattern">
                    <app-svg-icon :name="`themes/profile/${pattern.name}`"
                                  preserveAspectRatio="xMinYMin meet"
                                  :color="`${pattern.color} url(#svgicon_themes_profile_${pattern.name}_a)`"></app-svg-icon>
                </slot>
            </div>
            <div class="elements-icon svg--pattern-right" v-scrollanim="{ bEnt: 'no', enter: 'movedown' }">
                <slot name="pattern">
                    <app-svg-icon :name="`themes/profile/${pattern.name}`"
                                  preserveAspectRatio="xMinYMin meet"
                                  :color="`${pattern.color} url(#svgicon_themes_profile_${pattern.name}_a)`"></app-svg-icon>
                </slot>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'clubhouse-forum-header',
    props: {
      src: {
        type: String,
        required: true
      },
      backgroundClass: {
        type: String,
        default: 'app-bg-light_blue'
      },
      pattern: {
        type: Object,
        default: () => {
          return {
            name: 'NG_BG-05',
            color: 'var(--yellow)'
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._forum-header
        position relative
        flex-direction row
        @media (min-width 960px)
            flex-direction row-reverse
            margin-bottom 90px
            height 580px

        &--image
            height 220px
            @media (min-width 600px)
                height 320px
            @media (min-width 960px)
                height 500px

            .v-image
                @media (min-width 960px)
                    top 160px

        &--text
            text-align center
            position relative
            z-index 10
            @media (min-width 960px)
                max-width 510px
                text-align left
                margin-top 100px
                margin-left auto
                padding 0 100px 0 24px

        &--bg-elements
            .elements-icon
                position absolute
                overflow hidden

                &.svg--pattern-right
                    top 0
                    right 0
                    width 90px
                    height 100px
                    @media (min-width 960px)
                        width 270px
                        height 315px

                    &.movedown
                        top 50px
                        transition top 2s ease-out

                &.svg--pattern-left
                    top 120px
                    left 0
                    width 68px
                    height 160px
                    transform rotate(180deg)
                    @media (min-width 600px)
                        top 200px
                    @media (min-width 960px)
                        top 415px
                        width 150px
                        height 250px

                    &.moveup-xs
                        top 70px
                        transition top 3s ease-out
                    &.moveup-sm
                        top 150px
                        transition top 3s ease-out
                    &.moveup
                        top 365px
                        transition top 3s ease-out

                .svg-icon
                    overflow visible
                    width 100px
                    height 100px
                    @media (min-width 960px)
                        width 200px
                        height 200px
    .before-bg
        background-position 0 0

    .move-bg
        background-position 50px -50px
        transition background-position 2s linear
</style>
