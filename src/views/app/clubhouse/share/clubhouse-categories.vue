<template>
    <v-layout row wrap>
        <v-flex xs12 text-xs-center mt-5 mb-4>
            <h2>Browse by category</h2>
        </v-flex>
        <v-flex xs12 text-xs-center>
            <v-btn v-for="item in categories"
                   :key="'cat__' + item.id"
                   :to="`/clubhouse/category/${item.id}`"
                   round
                   outline
                   color="primary">#{{item.name}}
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'clubhouse-categories',
    computed: {
      categories () {
        return this.$store.getters['articles/categories']
      }
    },

    mounted () {
      this.$store.dispatch('articles/ARTICLES_CATEGORIES')
    }
  }
</script>

<style scoped>

</style>
