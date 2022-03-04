<template>
    <v-layout v-if="items.length > 0">
        <v-flex v-for="post in items"
                :key="`post_${inputKey + post.id}`"
                style="min-width: 387px; max-width: 387px">
            <clubhouse-post-list-item :item="post"></clubhouse-post-list-item>
        </v-flex>
    </v-layout>
    <v-layout v-else>
        <h3 class="text--grey_1 text-xs-center ma-auto pa-3">Nothing is here yet</h3>
    </v-layout>
</template>

<script>
  import ClubhousePostListItem from '../../../views/app/clubhouse/share/clubhouse-post-list-item'
  export default {
    name: 'tab-clubhouse-dashboard-posts',
    components: {ClubhousePostListItem},
    props: {
      items: {
        type: Array,
        required: true
      },
      inputKey: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
