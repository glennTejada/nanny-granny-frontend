<template>
    <v-layout row wrap>
        <v-flex xs12 class="_box-listing-tools">
            <v-layout row wrap>
                <v-flex xs12 md6 px-2>
                    <h2 class="font--light _text-results text-xs-center text-md-left">
                        <span class="hidden-md-and-down">We have found </span>
                        <span class="font--medium">
                            {{pagination.total || 0 }} {{type === 'job' ? 'jobs' : 'NannyGrannies'}}</span>
                        <span>
                            in {{dataResult.postcode}} (+{{dataResult.distance || '20'}}km)</span>
                    </h2>
                </v-flex>
                <v-flex xs12 md6 px-2 d-flex align-center>
                    <v-layout row __tools>
                        <v-flex d-flex align-center justify-end>
                            <div class="_view-by text-md-right ">
                                <v-btn-toggle v-model="selectViewBy"
                                              @change="$emit('view-grid', selectViewBy)"
                                              class="_btn-toggle-view-by pa-0 ma-0 text-no-wrap"
                                              mandatory>
                                    <v-btn flat
                                           :ripple="false"
                                           :value="false">
                                        <app-svg-icon name="ui/NG_TOGGLE_LARGE"></app-svg-icon>
                                    </v-btn>
                                    <v-btn flat
                                           :ripple="false"
                                           :value="true">
                                        <app-svg-icon name="ui/NG_TOGGLE_SMALL"></app-svg-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </div>
                        </v-flex>
                        <v-flex class="_select-box">
                            <v-select v-model="selectSortBy"
                                      :items="computedSortBy"
                                      @change="$emit('change-sort-by', selectSortBy)"
                                      hide-details
                                      hide-no-data
                                      height="24px"
                                      attach="._btn-overflow-sort-by"
                                      :menu-props="{offsetY: true, maxWidth: 300, left: false}"
                                      class="_btn-overflow-sort-by pa-0 ma-0"
                                      item-text="name"
                                      item-value="slug">
                                <template slot="selection"
                                          slot-scope="{item, select}">
                                    <span class="font--medium text-no-wrap"
                                          style="line-height: 21px">{{item.name}}</span>
                                </template>
                            </v-select>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 class="_container-cards">
            <transition-group :name="transitionName"
                              mode="out-in"
                              leave-active-class=""
                              tag="div"
                              class="layout row wrap">
                <slot></slot>
            </transition-group>
        </v-flex>
        <v-flex v-if="pagination.last_page > 1" xs12 text-xs-center mt-5>
            <v-pagination v-model="currentPage"
                          class="app-pagination"
                          :length="pagination.last_page"
                          :total-visible="5"></v-pagination>
        </v-flex>
    </v-layout>
</template>

<script>
  import Pagination from '@/models/PaginationClass'

  const DEFAULT_TRANSITION_NAME = 'scroll-y-transition'

  export default {
    name: 'app-layout-listing',

    props: {
      type: String, // <- job/nanny
      grid: Boolean,
      dataResult: Object,
      pagination: {
        type: [Pagination, Object],
        default: () => new Pagination({})
      }
    },

    data () {
      return {
        transitionName: DEFAULT_TRANSITION_NAME,
        currentPage: 1,
        selectViewBy: false,
        selectSortBy: {name: 'Distance (closest)', slug: 'distance'},
        sortBy: [
          {name: 'Distance (closest)', slug: 'distance', type: ['job', 'nanny']},
          {name: 'Job closing soon', slug: 'closing_soon', type: ['job']},
          {name: 'Recently created', slug: 'newest', type: ['job']},
          {name: 'Newest members', slug: 'newest', type: ['nanny']},
          {name: 'Live members', slug: 'live', type: ['nanny']},
          {name: 'Last updated', slug: 'updated', type: ['job', 'nanny']},
          {name: 'Top rated', slug: 'rated', type: ['nanny']}
        ]
      }
    },

    computed: {
      computedSortBy () {
        let type = this.type
        return this.sortBy.filter((item) => item.type.indexOf(type) > -1)
      }
    },

    watch: {
      currentPage () {
        this.$emit('change-current-page', this.currentPage)
      }
    }
  }
</script>

<style lang="stylus">
    ._container-cards
        min-height 450px
    ._text-results
        margin 30px 0 10px
        font-size 1.167em

    .v-btn-toggle._btn-toggle-view-by
        background transparent !important
        box-shadow none
        &:before
            content 'View by'
            margin-right 8px
        &:first-child .v-btn
            margin-right -1px
        button.v-btn
            height 18px
            padding 0 !important
            &:before
                content none !important
            .svg-icon
                height 18px
                width 18px
            &.v-btn--active
                color var(--blue)

    ._select-box
        max-width 190px !important
        ._btn-overflow-sort-by
            font-size 1rem
            &:before
                content 'Sort by'
                margin-right 8px
                white-space nowrap
                line-height 24px
            .v-input__slot
                cursor pointer
                padding 0 !important
                border none !important
                &:before,
                &:after
                    content: none !important
                input[hide-no-data]
                    display none
            .v-select__slot
                .v-text-field__prefix
                    width 50px
                    padding-right 8px
                .v-input__append-inner
                    margin 0 !important
                    .a-icon
                        height 8px
            &.v-select--is-menu-active
                .v-input__slot
                    border none !important
            .v-menu__content
                right 0
                top 40px !important
                border-top: 1px solid var(--grey_1) !important
                contain none
                overflow visible
                &:before
                    content: ''
                    display block
                    width 12px
                    height 12px
                    transform rotate(-45deg)
                    background-color #ffffff
                    border 1px solid
                    border-color var(--grey_1) var(--grey_1) transparent transparent
                    position absolute
                    z-index 1
                    top -6px
                    left calc(50% - 6px)
                &.menuable__content__active
                    .v-select-list.v-card .v-list
                        padding 20px 12px !important
        .v-text-field.v-input--is-focused .v-input__slot
            border none !important

    @media (max-width: 599px)
        .__tools
            padding 0 16px

        ._container-cards
            .app-card-listing
                padding 8px 0 !important

    @media (min-width: 599px)
        ._text-results
            font-size 1.714285714285714em

        .v-btn-toggle._btn-toggle-view-by
            button.v-btn
                height 24px
                .svg-icon
                    height 24px
                    width 24px

        ._select-box
            max-width 220px
            ._btn-overflow-sort-by
                font-size 1rem
                .v-select__slot
                    .v-text-field__prefix
                        width 60px
                    .v-input__append-inner
                        .a-icon
                            height 10px

        ._container-cards
            > .layout > div
                margin-bottom 28px

    @media (min-width: 960px)
        ._box-listing-tools
            margin 75px 0

        ._text-results
            margin 0
</style>
