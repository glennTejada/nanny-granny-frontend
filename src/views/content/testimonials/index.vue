<template>
    <testimonials-layout>
    <v-layout row wrap align-center justify-center fill-height>
        <!--Header-->
        <v-flex class="xs12 px-3 text-xs-center w--max--800">
            <v-flex display-my-page xs12>
                <h1 class="display-with-label">Testimonials</h1>
                <div class="mt-5">
                    <app-svg-icon name="brand/NG_DIVIDER"
                                  width="139"
                                  color="var(--green)"></app-svg-icon>
                </div>
            </v-flex>
        </v-flex>
        <!-- Carousel -->
        <v-flex xs12 app-bg-text-book>
            <v-layout justify-center>
                <app-container-review class="w--max--800">
                    <app-window-base :items="items[0]"
                                     key="win_testimonials">
                        <template slot="item" slot-scope="{item}">
                            <v-container>
                                <app-card-review :item="item"></app-card-review>
                            </v-container>
                        </template>
                    </app-window-base>
                </app-container-review>
            </v-layout>
        </v-flex>
        <!--Reviews-->
        <v-flex xs12 style="margin-top: -84px">
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex v-for="(item, index) in items[1]"
                            :key="`rew--${item.id}`"
                            xs12 md4 v-scrollanim="{ bEnt: 'before-fadeinup', enter: 'fadeinup', ind: index }">
                        <app-card-review :item="item" small></app-card-review>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>

        <v-flex xs12 class="_signup">
            <app-card-story :src-image="$helpers.getImageUrl((signupItem.image || {}).path)"
                            color="var(--green)"
                            pattern="03">
                <h1 class="mb-4">{{signupItem.name}}</h1>
                <p>{{signupItem.description | text}}</p>
                <v-btn v-if="!$auth.check()"
                       to="/signup"
                       class="primary v-btn--default mx-0 elevation-0">Register</v-btn>
            </app-card-story>
        </v-flex>
    </v-layout>
    </testimonials-layout>
</template>

<script>
  import AppCardReview from '../../../components/app-card/app-card-review'
  import AppWindowBase from '../../../components/app-windows/app-window-base'
  import AppContainerReview from '../../../components/app-container-review'
  import AppCardStory from '../../../components/app-card/app-card-story'
  import TestimonialsLayout from './testimonials-layout'

  export default {
    name: 'testimonials',

    components: {TestimonialsLayout, AppCardStory, AppContainerReview, AppWindowBase, AppCardReview},

    computed: {
      items () {
        return this.$lodash.chunk(this.$store.getters['page/testimonials'], 3)
      },
      signupItem () {
        return this.$store.getters['page/content']('testimonials')
          .filter(item => item.slug === 'signup_section')[0] || {}
      }
    },

    created () {
      this.$store.dispatch('page/GET_TESTIMONIALS', {path: 'all', query: {per_page: 6}})
    }
  }
</script>

<style lang="stylus" scoped>
    ._signup
        margin-top 50px

    .app-carousel
        height 470px

    .app-bg-text-book
        padding 80px 0 140px

    @media (min-width: 600px)
        ._signup
            margin-top 40px

        .app-carousel
            height 370px

        .display-with-label:after
            width 95px
            height 78px
            right -80px
            /*background-image url("../../../assets/img/brand-icons/LIGHT_HOUSEWORK_MED_BLUE.svg")*/
            transform rotate(-14deg)

</style>
