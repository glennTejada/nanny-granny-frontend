<template>
    <v-layout v-if="items.length > 0" row wrap>
        <v-flex v-for="item in items"
                :key="item.id"
                py-4
                xs12>
            <app-card-article :item="item"
                              row
                              small></app-card-article>
        </v-flex>
    </v-layout>
    <v-layout v-else>
        <h3 class="text--grey_1 text-xs-center ma-auto">Nothing is here yet</h3>
    </v-layout>
</template>

<script>
  import AppCardArticle from '../../../../components/app-card/app-card-article'

  export default {
    name: 'favourites-articles',
    components: {AppCardArticle},
    data () {
      return {
        //
      }
    },
    computed: {
      items () {
        return this.$store.getters['favourites/articles/collection']
      }
    },

    created () {
      this.$store.dispatch('favourites/articles/FAVOURITES_GET', 'ARTICLE')
    }
  }
</script>

<style scoped>

</style>
