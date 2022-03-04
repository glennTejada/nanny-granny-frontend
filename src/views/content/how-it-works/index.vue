<template>
    <v-layout column _now-it-works>
        <!--How it works-->
        <v-flex class="app-bg-sand">
            <v-container grid-list-xl>
                <v-layout row wrap>
<!--                    
                    <v-flex tag="h1" class="text-xs-center xs12 my-5">How it works</v-flex>
-->                    
                    <v-flex xs12>
                    <app-btn-toggle-role v-model="selectedRole"></app-btn-toggle-role>
                </v-flex>
                    <!--CARDS-->
                    <v-flex class="py-5">
                        <v-layout column>
                            <v-flex v-for="(card, i) in cards"
                                    :key="`c_${card.id}`"
                                    xs12
                                    sm6>
                                <app-card-page-item :item="card"
                                                    :reverse="(i%2 === 0)"
                                                    row
                                                    class="_now-it-works--card-row"
                                                    :class="{'pull-right': (i%2 !== 0)}">
                                    <template slot="icon"
                                              slot-scope="{item}">
                                        <app-svg-icon :name="`brand/${item.svg_name}`"
                                                      :color="`var(--${item.svg_color})`"></app-svg-icon>
                                    </template>
                                    <template slot="text"
                                              slot-scope="{item}">
                                        <h3 class="mb-3">{{item.name}}</h3>
                                        <div v-html="item.description" class="text-small"></div>
                                    </template>
                                </app-card-page-item>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <!--Why NannyGrannies-->
                    <v-flex v-if="selectedRole === 'parent'">
                        <v-container>
                            <v-layout row wrap>
                                <v-flex tag="h2" class="text-xs-center xs12 mt-5">Why NannyGranny</v-flex>
                                <v-flex v-for="(card) in benefits"
                                        :key="`c_${card.id}`"
                                        xs12
                                        sm4>
                                    <app-card-page-item :item="card"
                                                        class="_now-it-works--card-why">
                                        <template slot="text"
                                                  slot-scope="{item}">
                                            <app-svg-icon :name="`brand/${item.svg_name}`"
                                                      :color="`var(--${item.svg_color})`"></app-svg-icon>
                                            <h3 class="mb-3">{{item.name}}</h3>
                                            <div v-html="item.description" class="text-small"></div>
                                        </template>
                                    </app-card-page-item>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-flex>
                    <!--Signup-->
                    <v-flex v-if="selectedRole === 'nanny'" class="mb-5">
                        <v-layout column text-xs-center>
                            <v-flex v-if="!$auth.check()">
                                <v-btn to="/signup?role=nanny"
                                       class="primary v-btn--default elevation-0 mt-5">Register now
                                </v-btn>
                            </v-flex>
                            <v-flex class="text-small">
                                <span class="text--charcoal">Still have questions? Try our</span>
                                <router-link to="/faqs" class="text-small">FAQs</router-link>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <!--Choose a plan-->
        <v-flex v-if="selectedRole === 'parent'"
                class="app-bg-sand--half">
            <v-container grid-list-xl w--max--800>
                <v-layout column text-xs-center>
                    <v-flex tag="h1" class="my-5">Choose a plan</v-flex>
                    <v-flex>
                        <app-btn-toggle-plan-reg hide-description></app-btn-toggle-plan-reg>
                    </v-flex>
                    <v-flex v-if="!$auth.check()">
                        <v-btn to="/signup?role=parent"
                               class="primary v-btn--default elevation-0 mt-5">
                            Register now
                        </v-btn>
                    </v-flex>
                    <v-flex class="text-small">
                        <span class="text--charcoal">Still have questions? Try our</span>
                        <router-link to="/faqs" class="text-small">FAQs</router-link>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <!--Story-->
        <v-flex class="_now-it-works--story-section">
            <app-card-story :src-image="$helpers.getImageUrl(story.image.path)">
                <h1 class="mb-4">{{story.name}}</h1>
                <div v-html="story.description"
                     class="mb-4"></div>
                <v-btn v-if="selectedRole === 'parent'"
                       to="/about-us"
                       class="primary elevation-0 ma-0 v-btn--default">
                    Read more
                </v-btn>
                <v-btn v-if="selectedRole === 'nanny' && !$auth.check()"
                       to="/signup?role=nanny"
                       class="primary elevation-0 ma-0 v-btn--default">
                    Join today
                </v-btn>
            </app-card-story>
        </v-flex>
        <!--ClubHouse-->
        <v-flex class="py-5">
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex tag="h2" class="xs12 text-xs-center my-5">ClubHouse</v-flex>
                    <v-flex v-for="(item, i) in latestArticle"
                            :class="{'hidden-sm-and-down': (i === 2)}"
                            :key="'art_'+item.id"
                            xs12 sm6 md4>
                        <app-card-article :item="item"
                                          :hide-actions="!$auth.check()"></app-card-article>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppBtnToggleRole from '../../../components/app-buttons/app-btn-toggle-role'
  import AppBtnTogglePlanReg from '../../../components/app-buttons/app-btn-toggle-plan-reg'
  import AppCardArticle from '../../../components/app-card/app-card-article'
  import AppCardPageItem from '../../../components/app-card/app-card-page-item'
  import AppCardStory from '../../../components/app-card/app-card-story'
  import {IMAGE_BASE_URL} from '@/config/constants'

  export default {
    name: 'how-it-works',

    components: {AppCardStory, AppCardPageItem, AppCardArticle, AppBtnTogglePlanReg, AppBtnToggleRole},

    data () {
      return {
        selectedRole: this.$auth.user().role || 'parent'
      }
    },

    computed: {
      latestArticle () {
        return this.$store.getters['articles/collection']
      },
      content () {
        return this.$store.getters['page/content']('how-it-works')
      },
      cards () {
        return this.content.filter(item => item.slug === `${this.selectedRole}_card`)
      },
      benefits () {
        return this.content.filter(item => item.slug === `why_nannygrannies_card`)
      },
      story () {
        return this.content.filter(item => item.slug === `${this.selectedRole}_story`)[0] || {}
      }
    },

    created () {
      this.$store.dispatch('articles/ARTICLES_GET', {per_page: 3})
    },

    methods: {
      getUrl (path) {
        return IMAGE_BASE_URL + path
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._now-it-works
        &--card-why    
            @media (min-width 600px)
                .svg-icon
                    width 32px
                    height 32px
                    margin-bottom 15px
                    @media (min-width 600px)
                        width 42px
                        height 42px
                        margin-bottom 15px

        &--card-row
            @media (min-width 600px)
                max-width 50% !important
                &.pull-right
                    margin-left auto !important
                .svg-icon
                    width 64px
                    height 64px
                    @media (min-width 600px)
                        width 110px
                        height 85px
        .app-bg-sand--half
            position relative
            &:before
                content ''
                top 0
                left 0
                height 50%
                width 100%
                display block
                position absolute
                background-color var(--sand)
                z-index 1
            .container
                position relative
                z-index 5
        &--story-section
            margin 80px 0
</style>
