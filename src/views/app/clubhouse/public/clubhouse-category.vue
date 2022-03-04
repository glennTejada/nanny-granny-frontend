<template>
    <v-layout _clubhouse-category
              column>
        <!--HEADER-->
        <v-flex _clubhouse-category--header
                :style="{backgroundColor: 'var(--pink)'}">
            <v-container>
                <v-layout>
                    <v-flex text-xs-center>
                        <h1 class="my-4">#{{category.name}}</h1>
                        <h4>{{pagination.total}} articles</h4>
                    </v-flex>
                </v-layout>
            </v-container>
            <!--BACKGROUND ELEMENTS-->
            <v-flex class="_clubhouse-category--bg-elements">
                <app-svg-icon name="brand/NG_ACTIVE"
                              color="var(--green)"
                              class="svg-icon--active"></app-svg-icon>
                <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                              name="brand/NG_LIGHT_HOUSEWORK"
                              color="var(--yellow)"
                              class="svg-icon--light_homework"></app-svg-icon>
                <app-svg-icon name="patterns/NG_Pattern-13"
                              color="none var(--green)"
                              class="svg-icon--pattern-13"></app-svg-icon>
                <app-svg-icon name="patterns/NG_Pattern-18"
                              color="var(--orange) none"
                              class="svg-icon--pattern-18"></app-svg-icon>
                <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                              name="brand/NG_HOMEWORK_SUPPORT"
                              color="var(--blue)"
                              class="svg-icon--homework"></app-svg-icon>
            </v-flex>
        </v-flex>
        <!--ARTICLES-->
        <v-flex class="_clubhouse-category--articles-section">
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex v-for="item in articles"
                            :key="'art__' + item.id"
                            xs12
                            md4>
                        <app-card-article :item="item"
                                          :hide-actions="!$auth.check()"></app-card-article>
                    </v-flex>
                    <v-flex v-if="pagination.last_page > 1" xs12 text-xs-center my-5>
                        <v-pagination v-model="currentPage"
                                      class="app-pagination"
                                      :length="pagination.last_page"
                                      :total-visible="5"></v-pagination>
                    </v-flex>
                    <v-flex xs12 mt-5>
                        <clubhouse-categories></clubhouse-categories>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <v-flex>
            <clubhouse-subscribe class="ma-auto"></clubhouse-subscribe>
        </v-flex>
        <v-flex mt-5>
            <clubhouse-navigation></clubhouse-navigation>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppCardArticle from '../../../../components/app-card/app-card-article'
  import ClubhouseCategories from '../share/clubhouse-categories'
  import ClubhouseNavigation from '../share/clubhouse-navigation'
  import ClubhouseSubscribe from '../share/clubhouse-subscribe'
  export default {
    name: 'clubhouse-category',
    components: {ClubhouseSubscribe, ClubhouseNavigation, ClubhouseCategories, AppCardArticle},
    props: ['categoryId'],
    data () {
      return {
        currentPage: 1
      }
    },
    computed: {
      articles () {
        return this.$store.getters['articles/collection']
      },
      category () {
        return this.$store.getters['articles/category'](+this.categoryId)
      },
      pagination () {
        return this.$store.getters['articles/pagination']
      }
    },
    mounted () {
      this.$store.dispatch('articles/ARTICLES_GET_BY_CATEGORY', {id: this.categoryId, params: {per_page: 9}})
    },
    beforeRouteUpdate (to, from, next) {
      this.$store.dispatch('articles/ARTICLES_GET_BY_CATEGORY', {id: to.params.categoryId, params: {per_page: 9}})
      next()
    },
    beforeDestroy () {
      this.$store.commit('articles/ARTICLES_RESET')
    }
  }
</script>

<style lang="stylus" scoped>
    ._clubhouse-category
        &--header
            position relative
            overflow hidden
            @media (min-width 600px)
                height 528px
            .container
                margin-top 50px
                margin-bottom 50px
                @media (min-width 600px)
                    margin-top 120px
        &--articles-section
            @media (min-width 600px)
                margin-top -150px
        &--bg-elements
            .svg-icon
                position absolute
                &--active
                    width 60px
                    height 60px
                    top -20px
                    left 41%
                    @media (min-width 600px)
                        width 90px
                        height 90px
                &--light_homework
                    width 90px
                    height 90px
                    top 160px
                    left 18%
                    transform rotate(-15deg)
                &--homework
                    width 50px
                    height 50px
                    top 250px
                    right 19%
                    transform rotate(-10deg)
                &--pattern-13
                    width 180px
                    height 220px
                    top 200px
                    right -95px
                    transform rotate(-40deg)
                &--pattern-18
                    width 100px
                    height 60px
                    bottom 0
                    left 0
                    @media (min-width 600px)
                        width 200px
                        height 120px
</style>
