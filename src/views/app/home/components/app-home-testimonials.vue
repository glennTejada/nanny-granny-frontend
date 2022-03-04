<template>
    <v-layout _testimonial column>
        <v-flex>
            <h2 class="text-xs-center _testimonial--title">Testimonials</h2>
        </v-flex>
        <v-flex>
            <app-container-review class=w--max--800>
                <app-window-base :items="items" key="test">
                    <template slot="item"
                              slot-scope="{item}">
                        <v-layout>
                            <app-card-review :item="item"
                                             :key="`card-review-${item.id}`">
                            </app-card-review>
                        </v-layout>
                    </template>
                </app-window-base>
            </app-container-review>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppCardReview from '../../../../components/app-card/app-card-review'
  import AppWindowBase from '../../../../components/app-windows/app-window-base'
  import AppContainerReview from '../../../../components/app-container-review'

  export default {
    name: 'app-home-testimonials',

    components: {AppContainerReview, AppWindowBase, AppCardReview},

    computed: {
      items () {
        return this.$store.getters['page/testimonials']
      }
    },

    created () {
      this.$store.dispatch('page/GET_TESTIMONIALS', {path: 'forhome'})
    }
  }
</script>

<style lang="stylus" scoped>
    ._testimonial
        min-height 500px
        margin-bottom 80px
        &--title
            margin-top 80px
            @media (min-width 960px)
                margin-top 150px
    ._review-container
        padding: 10px
</style>
