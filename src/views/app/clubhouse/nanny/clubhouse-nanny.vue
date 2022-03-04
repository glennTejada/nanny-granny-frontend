<template>
    <v-layout _clubhouse-nanny
              column>
        <v-flex>
            <clubhouse-forum-header :src="$helpers.getImageUrl((banner.image || {}).path)">
                <template slot="text">
                    <h1 class="mb-5">{{banner.name}}</h1>
                    <p>{{banner.description | text}}</p>
                </template>
            </clubhouse-forum-header>
        </v-flex>
        <v-flex>
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex tag="h2"
                            class="xs12 text-xs-center my-5">
                        NannyGranny Forum
                    </v-flex>
                    <v-flex v-for="post in posts"
                            :key="`post-${post.id}`" class="xs12 sm4">
                        <app-post-list-item :item="post"></app-post-list-item>
                    </v-flex>
                    <v-flex class="xs12 text-xs-center mt-5 mb-4">
                        <v-btn to="/clubhouse/forum"
                               class="primary elevation-0">Explore the NannyGranny forum
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <v-flex text-xs-center my-5>
            <app-svg-icon name="brand/NG_DIVIDER"
                          width="139"
                          height="20"
                          color="var(--orange)"></app-svg-icon>
        </v-flex>
        <v-flex>
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex tag="h2"
                            class="xs12 text-xs-center my-5">
                        Latest articles
                    </v-flex>
                    <v-flex v-for="item in articles"
                            :key="'art__' + item.id"
                            xs12
                            md4>
                        <app-card-article :item="item"></app-card-article>
                    </v-flex>
                    <v-flex class="xs12 text-xs-center my-5">
                        <v-btn to="/clubhouse"
                               class="primary elevation-0">Explore the ClubHouse
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <v-flex>
            <app-card-follow-us></app-card-follow-us>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppCardFollowUs from '../../../../components/app-card/app-card-follow-us'
  import AppCardArticle from '../../../../components/app-card/app-card-article'
  import ClubhouseForumHeader from '../share/clubhouse-forum-header'
  import AppPostListItem from '../share/clubhouse-post-list-item'

  export default {
    name: 'clubhouse-nanny',

    components: {AppPostListItem, ClubhouseForumHeader, AppCardArticle, AppCardFollowUs},

    data () {
      return {
        posts: []
      }
    },

    computed: {
      banner () {
        return this.$store.getters['page/content']('clubhouse')
          .filter(item => item.slug === 'banner')[0] || {}
      },
      articles () {
        return this.$store.getters['articles/collection']
      }
    },

    mounted () {
      this.$store.dispatch('clubhouse/clubs/posts/GET_LATEST', {per_page: 3})
        .then(data => (this.posts = data))
      this.$store.dispatch('articles/ARTICLES_GET', {per_page: 3})
    },

    beforeDestroy () {
      this.$store.commit('clubhouse/clubs/posts/RESET')
    }
  }
</script>

<style scoped>

</style>
