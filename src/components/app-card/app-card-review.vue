<template>
    <v-card class="_card-review transparent"
            color="transparent"
            :class="{'_card-review--small': small}"
            flat>
        <v-card-title class="_card-review--text justify-center">
            <div v-if="rating" class="mb-4">
                <v-rating :value="item.rating"
                          :size="$vuetify.breakpoint.xsOnly ? 18 : 28"
                          class="d-inline-block app-rating"
                          dense
                          readonly
                          background-color="success"
                          color="success"></v-rating>
            </div>
            <!-- <div v-line-clamp:20="5"
                 :class="{'app-text-mono text-xs-center': !small}">{{(item.review_text || item.text) | text}}</div> -->
            <div v-line-clamp:20="5"
                 :class="{'app-text-mono text-xs-center': !small}" v-html="deleteTags(item.review_text || item.text)"></div>
        </v-card-title>
        <v-card-actions class="my-3"
                        :class="{'justify-center': !small}">
            <div v-if="small" class="_card-review--avatar">
                <app-avatar :src="`https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 30)}.jpg`"></app-avatar>
            </div>
            <div class="_card-review--user"
                 :class="{'app-text-mono text-xs-center': !small}">
                <div class="font--medium">
                    {{item.user.first_name | capitalize}}
                </div>
                <div class="text-truncate">
                    <span class="font--light" style="color: #545454">{{(item.user.postcode || {}).location | capitalize}}</span>
                    <span class="font--light" style="color: #545454">| {{item.count_child || 0}} children</span>
                </div>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script>
  import Review from '@/models/ReviewClass'
  import Testimonial from '@/models/TestimonialClass'
  import AppAvatar from '../app-avatar'

  export default {
    name: 'app-card-review',
    components: {AppAvatar},
    props: {
      item: {
        type: [Review, Testimonial]
      },
      small: Boolean,
      rating: Boolean
    },
    methods: {
      deleteTags (html) {
        if (!html) return ''
        return html.toString().replace(/<[^>]+>/g, '').trim()
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._card-review
        position relative
        background transparent
        &:not(._card-review--small)
            min-height 340px
            min-width 100%
        ._card-review--text
            min-height 160px
            flex-direction column
            .app-text
                &-mono
                    color #545454
                    font-size: 1.385714285714286em;
        &._card-review--small
            ._card-review--text
                position relative
                border 1px solid var(--grey_2)
                background-color #ffffff
                min-height 160px
                &:after
                    content ''
                    position absolute
                    left 25px
                    bottom -8px
                    background #fff
                    width 15px
                    height 15px
                    border-bottom 1px solid var(--grey_2)
                    border-left 1px solid var(--grey_2)
                    transform rotateZ(-45deg)
            ._card-review--user
                padding-left 16px

        &--avatar
            width 51px
            height 51px
</style>
